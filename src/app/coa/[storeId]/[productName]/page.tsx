'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabaseVendor } from '@/lib/supabaseClient'

export default function COAViewerPage() {
  const params = useParams()
  const storeId = params.storeId as string
  const productName = params.productName as string

  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showFullscreen, setShowFullscreen] = useState(false)

  useEffect(() => {
    if (storeId && productName) {
      loadCOA()
    }
  }, [storeId, productName])

  const loadCOA = async () => {
    try {
      setLoading(true)
      setError(null)

      // Try to find the PDF with the product name
      const decodedProductName = decodeURIComponent(productName)

      // Try multiple file name patterns
      const patterns = [
        `${decodedProductName}.pdf`,
        `${decodedProductName.replace(/_/g, ' ')}.pdf`,
        decodedProductName,
      ]

      let foundUrl = null

      // First try direct file lookup
      for (const pattern of patterns) {
        const { data } = supabaseVendor.storage
          .from('vendor-coas')
          .getPublicUrl(`${storeId}/${pattern}`)

        // Check if file exists by trying to fetch headers
        try {
          const response = await fetch(data.publicUrl, { method: 'HEAD' })
          if (response.ok) {
            foundUrl = data.publicUrl
            break
          }
        } catch {
          // Continue to next pattern
        }
      }

      // If not found, try listing the folder and finding a match
      if (!foundUrl) {
        const { data: files, error: listError } = await supabaseVendor.storage
          .from('vendor-coas')
          .list(storeId, { limit: 100 })

        if (!listError && files) {
          // Find file that contains the product name
          const searchTerms = decodedProductName.toLowerCase().split('_')
          const matchingFile = files.find(f => {
            const fileName = f.name.toLowerCase()
            return searchTerms.every(term => fileName.includes(term)) ||
                   fileName.includes(decodedProductName.toLowerCase())
          })

          if (matchingFile) {
            const { data } = supabaseVendor.storage
              .from('vendor-coas')
              .getPublicUrl(`${storeId}/${matchingFile.name}`)
            foundUrl = data.publicUrl
          }
        }
      }

      if (foundUrl) {
        setPdfUrl(foundUrl)
        // Estimate pages based on file - actual page count would require PDF parsing
        // For now, assume 4 pages for full panel COAs
        setTotalPages(4)
      } else {
        setError('COA not found')
      }
    } catch (err) {
      console.error('Error loading COA:', err)
      setError('Failed to load COA')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-400">Loading Certificate of Analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">COA Not Found</h1>
          <p className="text-neutral-400 mb-6">
            The Certificate of Analysis for &quot;{productName.replace(/_/g, ' ')}&quot; could not be found.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Header */}
      <header className="bg-neutral-800/50 backdrop-blur-xl border-b border-neutral-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">Quantix Analytics</h1>
                  <p className="text-xs text-neutral-500">Certificate of Analysis</p>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {/* Page Navigation */}
              <div className="hidden sm:flex items-center gap-2 bg-neutral-800 rounded-lg px-3 py-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-sm text-neutral-300 min-w-[80px] text-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Fullscreen Toggle */}
              <button
                onClick={() => setShowFullscreen(!showFullscreen)}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                title="Toggle fullscreen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Info Bar */}
      <div className="bg-neutral-800/30 border-b border-neutral-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {productName.replace(/_/g, ' ')}
              </h2>
              <p className="text-sm text-neutral-500">
                Full Panel Certificate of Analysis - {totalPages} Pages
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <main className={`${showFullscreen ? 'fixed inset-0 z-50 bg-neutral-900' : ''}`}>
        {showFullscreen && (
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className={`${showFullscreen ? 'h-full' : 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
          <div className={`bg-white rounded-xl shadow-2xl overflow-hidden ${showFullscreen ? 'h-full' : ''}`}>
            {pdfUrl && (
              <iframe
                src={`${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0`}
                className={`w-full ${showFullscreen ? 'h-full' : 'h-[80vh]'}`}
                title="Certificate of Analysis"
              />
            )}
          </div>
        </div>
      </main>

      {/* Page Thumbnails (Desktop) */}
      {!showFullscreen && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h3 className="text-sm font-medium text-neutral-400 mb-3">Pages</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex-shrink-0 w-24 h-32 rounded-lg border-2 transition-all ${
                  currentPage === page
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center">
                  <span className={`text-2xl font-bold ${currentPage === page ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    {page}
                  </span>
                  <span className="text-xs text-neutral-600 mt-1">
                    {page === 1 && 'Cannabinoids'}
                    {page === 2 && 'Safety'}
                    {page === 3 && 'Pesticides I'}
                    {page === 4 && 'Pesticides II'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {!showFullscreen && (
        <footer className="bg-neutral-800/30 border-t border-neutral-700/30 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Quantix Analytics</p>
                  <p className="text-xs text-neutral-500">ISO 17025 Accredited Laboratory</p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 text-center sm:text-right">
                This certificate is for the sample tested only. Results may not be reproduced without written consent.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}
