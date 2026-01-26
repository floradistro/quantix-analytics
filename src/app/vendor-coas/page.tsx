'use client'

import { useState, useEffect } from 'react'
import { supabaseVendor } from '@/lib/supabaseClient'
import { Store, StoreCOA } from '@/types'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import LoadingSpinner from '@/components/LoadingSpinner'

interface StorageFile {
  name: string
  id?: string
  updated_at?: string
  created_at?: string
  last_accessed_at?: string
  metadata?: {
    size?: number
    mimetype?: string
  } | null
}

export default function StoreCOAsPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [storeCOAs, setStoreCOAs] = useState<StorageFile[]>([])
  const [selectedStore, setSelectedStore] = useState<string>('')
  const [selectedStoreData, setSelectedStoreData] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [deletingFile, setDeletingFile] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadStores()
  }, [])

  useEffect(() => {
    if (selectedStore) {
      const store = stores.find(s => s.id === selectedStore)
      setSelectedStoreData(store || null)
      loadStoreCOAs(selectedStore)
    } else {
      setStoreCOAs([])
      setSelectedStoreData(null)
    }
  }, [selectedStore, stores])

  const loadStores = async () => {
    try {
      const { data, error } = await supabaseVendor
        .from('stores')
        .select('*')
        .order('store_name')

      if (error) throw error
      setStores(data || [])
    } catch (err) {
      console.error('Error loading stores:', err)
      setError('Failed to load stores')
    } finally {
      setLoading(false)
    }
  }

  const loadStoreCOAs = async (storeId: string) => {
    try {
      setLoading(true)

      // List files from storage bucket
      const { data: files, error } = await supabaseVendor.storage
        .from('vendor-coas')
        .list(storeId, {
          limit: 500,
          sortBy: { column: 'created_at', order: 'desc' }
        })

      if (error) throw error

      // Filter out folders and only show PDF files
      const pdfFiles = (files || []).filter(f =>
        f.name.endsWith('.pdf')
      ) as StorageFile[]

      setStoreCOAs(pdfFiles)
    } catch (err) {
      console.error('Error loading COAs:', err)
      setError('Failed to load COAs')
    } finally {
      setLoading(false)
    }
  }

  const getFileUrl = (fileName: string) => {
    const { data } = supabaseVendor.storage
      .from('vendor-coas')
      .getPublicUrl(`${selectedStore}/${fileName}`)
    return data.publicUrl
  }

  const handleDeleteCOA = async (fileName: string) => {
    if (!confirm(`Delete ${fileName}?`)) return

    try {
      setDeletingFile(fileName)

      const { error } = await supabaseVendor.storage
        .from('vendor-coas')
        .remove([`${selectedStore}/${fileName}`])

      if (error) throw error

      setSuccess('COA deleted')
      loadStoreCOAs(selectedStore)
    } catch (err) {
      console.error('Error deleting COA:', err)
      setError('Delete failed')
    } finally {
      setDeletingFile(null)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return dateStr
    }
  }

  const filteredCOAs = storeCOAs.filter(coa => {
    if (!searchQuery) return true
    return coa.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Lobster, cursive' }}>
              Store COAs
            </h1>
            <p className="text-neutral-500">
              View and manage lab results by store
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 backdrop-blur-xl rounded-xl border border-red-700/50">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-300 flex-1 text-sm">{error}</p>
                <button onClick={() => setError('')} className="text-red-400 hover:text-red-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/20 backdrop-blur-xl rounded-xl border border-green-700/50">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-green-300 flex-1 text-sm">{success}</p>
                <button onClick={() => setSuccess('')} className="text-green-400 hover:text-green-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {!selectedStore ? (
            /* Store Selection */
            <div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search stores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md px-4 py-3 bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-all shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]"
                />
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <LoadingSpinner />
                </div>
              ) : stores.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p className="text-neutral-500">No stores found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stores.filter(s =>
                    !searchQuery ||
                    s.store_name.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((store) => (
                    <button
                      key={store.id}
                      onClick={() => setSelectedStore(store.id)}
                      className="group bg-neutral-800/50 backdrop-blur-xl rounded-2xl p-6 border border-neutral-700/50 hover:border-neutral-600 hover:bg-neutral-800/70 transition-all text-left shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]"
                    >
                      <div className="flex items-start gap-4 mb-3">
                        {store.logo_url ? (
                          <img
                            src={store.logo_url}
                            alt={store.store_name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-neutral-700 flex items-center justify-center">
                            <span className="text-xl font-bold text-neutral-400">
                              {store.store_name.charAt(0)}
                            </span>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white mb-1 truncate">
                            {store.store_name}
                          </h3>
                          {store.license_number && (
                            <p className="text-xs text-neutral-500 truncate">
                              License: {store.license_number}
                            </p>
                          )}
                        </div>
                      </div>

                      {store.city && store.state && (
                        <div className="text-xs text-neutral-600">
                          {store.city}, {store.state}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Selected Store View */
            <div className="space-y-6">
              {/* Header Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedStore('')}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 backdrop-blur-xl hover:bg-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-all border border-neutral-700/50 shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm">Back</span>
                </button>

                <div className="text-sm text-neutral-500">
                  {storeCOAs.length} COA{storeCOAs.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Store Info */}
              {selectedStoreData && (
                <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl p-6 border border-neutral-700/50 shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]">
                  <div className="flex items-center gap-4">
                    {selectedStoreData.logo_url ? (
                      <img
                        src={selectedStoreData.logo_url}
                        alt={selectedStoreData.store_name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-neutral-700 flex items-center justify-center">
                        <span className="text-2xl font-bold text-neutral-400">
                          {selectedStoreData.store_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selectedStoreData.store_name}</h2>
                      {selectedStoreData.license_number && (
                        <p className="text-sm text-neutral-500">License: {selectedStoreData.license_number}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search COAs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-800/50 backdrop-blur-xl border border-neutral-700/50 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-all shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* COA List */}
              <div className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl border border-neutral-700/50 overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.3)]">
                {loading ? (
                  <div className="p-12 flex justify-center">
                    <LoadingSpinner />
                  </div>
                ) : filteredCOAs.length === 0 ? (
                  <div className="p-12 text-center">
                    <svg className="w-16 h-16 text-neutral-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-neutral-500">No COAs found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-neutral-700/50">
                    {filteredCOAs.map((coa) => (
                      <div
                        key={coa.name}
                        className="p-4 hover:bg-neutral-800/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate mb-1">
                              {coa.name.replace('.pdf', '')}
                            </h4>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
                              <span>{formatFileSize(coa.metadata?.size || 0)}</span>
                              <span>•</span>
                              <span>{formatDate(coa.created_at || '')}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={getFileUrl(coa.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-neutral-700/50 hover:bg-neutral-700 text-neutral-300 hover:text-white text-sm font-medium rounded-lg transition-all"
                            >
                              View
                            </a>
                            <button
                              onClick={() => handleDeleteCOA(coa.name)}
                              disabled={deletingFile === coa.name}
                              className="px-4 py-2 bg-neutral-700/50 hover:bg-red-900/50 text-neutral-400 hover:text-red-300 text-sm font-medium rounded-lg transition-all disabled:opacity-50"
                            >
                              {deletingFile === coa.name ? (
                                <span className="flex items-center gap-2">
                                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </span>
                              ) : (
                                'Delete'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
