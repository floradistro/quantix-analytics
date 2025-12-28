'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, CheckCircle, FileText, Clock, ChevronDown, Lock, FlaskConical, Scale, Building2, Menu, X } from 'lucide-react';

const certifications = [
  {
    id: 'dea',
    title: 'DEA Registration',
    subtitle: 'Schedule I-V Research & Analytics',
    icon: Shield,
    description: 'Federal Drug Enforcement Administration registration authorizing the handling, analysis, and research of controlled substances including cannabis and cannabinoid compounds.',
    requirements: [
      'DEA Form 225 Application & Approval',
      'Schedule I-V Researcher License',
      'Controlled Substance Security Plan',
      'Annual Quota Allocation Compliance',
      'DEA Inspection Readiness Protocol'
    ]
  },
  {
    id: 'iso17025',
    title: 'ISO/IEC 17025:2017',
    subtitle: 'Laboratory Testing Accreditation',
    icon: FlaskConical,
    description: 'International standard for testing and calibration laboratories ensuring technical competence, impartiality, and consistent operation for accurate analytical results.',
    requirements: [
      'Quality Management System Implementation',
      'Method Validation & Verification',
      'Measurement Uncertainty Quantification',
      'Proficiency Testing Participation',
      'Technical Personnel Competency'
    ]
  },
  {
    id: 'iso17034',
    title: 'ISO 17034:2016',
    subtitle: 'Reference Material Producer',
    icon: Scale,
    description: 'Accreditation for producing certified reference materials (CRMs) used in cannabis potency testing, ensuring traceability and measurement accuracy across laboratories.',
    requirements: [
      'Reference Material Production Protocols',
      'Homogeneity & Stability Studies',
      'Characterization & Value Assignment',
      'Traceability to SI Units',
      'Certificate of Analysis Standards'
    ]
  },
  {
    id: 'state',
    title: 'State Cannabis Licenses',
    subtitle: 'Multi-Jurisdictional Compliance',
    icon: Building2,
    description: 'Active testing laboratory licenses across 38 legal cannabis markets, maintaining compliance with varying state regulations and reporting requirements.',
    requirements: [
      'State-Specific License Applications',
      'Local Regulatory Compliance',
      'Seed-to-Sale Integration',
      'State Reporting Requirements',
      'Interstate Commerce Protocols'
    ]
  }
];

const complianceFramework = [
  {
    title: 'Physical Security',
    description: 'DEA-compliant vault storage, 24/7 surveillance, biometric access control, and intrusion detection systems.',
    icon: Lock
  },
  {
    title: 'Chain of Custody',
    description: 'Complete sample tracking from receipt to disposal with tamper-evident seals and digital verification.',
    icon: FileText
  },
  {
    title: 'Documentation',
    description: 'Electronic laboratory notebooks, audit trails, version control, and 21 CFR Part 11 compliance.',
    icon: CheckCircle
  },
  {
    title: 'Validated Methods',
    description: 'EPA, FDA, and AOAC validated testing methods with ongoing proficiency testing and inter-lab comparisons.',
    icon: FlaskConical
  }
];

export default function Home() {
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [expandedCompliance, setExpandedCompliance] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/CD2E1122-D511-4EDB-BE5D-98EF274B4BAF/no-bg/E9DA3959-08AF-4881-9CD3-456C8FBA0BF7.png"
              alt="Quantix Analytics"
              width={180}
              height={180}
              className="h-16 w-auto md:h-20"
            />
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white font-medium">Certifications</Link>
            <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
            <Link href="/about#contact" className="px-4 py-2 bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 px-4 py-4 space-y-4">
            <Link href="/" className="block text-white font-medium">Certifications</Link>
            <Link href="/about" className="block text-zinc-400">About</Link>
            <Link href="/about#contact" className="block px-4 py-2 bg-white text-black font-medium text-center">
              Contact Us
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="inline-block px-3 py-1 border border-zinc-700 text-zinc-400 text-xs md:text-sm mb-6">
            DEA REGISTERED • ISO ACCREDITED • 38 STATE LICENSES
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Cannabis Laboratory<br />
            <span className="text-zinc-500">Compliance & Certification</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mb-8">
            Quantix Analytics maintains the highest level of federal and state regulatory compliance, 
            with DEA registration, ISO accreditation, and licenses across all major cannabis markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#certifications" className="px-6 py-3 bg-white text-black font-medium hover:bg-zinc-200 transition-colors text-center">
              View Certifications
            </a>
            <Link href="/about" className="px-6 py-3 border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition-colors text-center">
              About Quantix
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-xs md:text-sm text-zinc-500">DEA Compliance</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">ISO</div>
              <div className="text-xs md:text-sm text-zinc-500">17025 Accredited</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-xs md:text-sm text-zinc-500">Secure Facility</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">38</div>
              <div className="text-xs md:text-sm text-zinc-500">State Licenses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Certifications & Registrations</h2>
          <p className="text-zinc-500 mb-8">Tap to expand certification details</p>
          
          <div className="grid gap-4">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              const isExpanded = expandedCert === cert.id;
              
              return (
                <div 
                  key={cert.id}
                  className="border border-zinc-800 bg-zinc-950 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCert(isExpanded ? null : cert.id)}
                    className="w-full p-4 md:p-6 flex items-center gap-4 text-left hover:bg-zinc-900 transition-colors"
                  >
                    <div className="p-3 bg-zinc-800 shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-semibold text-white">{cert.title}</h3>
                      <p className="text-zinc-500 text-sm">{cert.subtitle}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-zinc-800">
                      <p className="text-zinc-400 text-sm md:text-base mt-4 mb-4">{cert.description}</p>
                      <h4 className="text-white font-medium mb-3">Key Requirements:</h4>
                      <ul className="space-y-2">
                        {cert.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
                            <CheckCircle className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Compliance Framework</h2>
          <p className="text-zinc-500 mb-8">Core pillars of our regulatory compliance program</p>
          
          <div className="grid gap-4">
            {complianceFramework.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedCompliance === item.title;
              
              return (
                <div 
                  key={item.title}
                  className="border border-zinc-800 bg-zinc-950"
                >
                  <button
                    onClick={() => setExpandedCompliance(isExpanded ? null : item.title)}
                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-zinc-900 transition-colors"
                  >
                    <div className="p-2 bg-zinc-800 shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-white flex-1">{item.title}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-zinc-800">
                      <p className="text-zinc-400 text-sm mt-4">{item.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Certification Timeline</h2>
          <p className="text-zinc-500 mb-8">Typical 12-18 month process for full compliance</p>
          
          <div className="space-y-4">
            {[
              { phase: 'Phase 1', title: 'Gap Analysis & Planning', duration: '2-3 months', description: 'Initial assessment, documentation review, and compliance roadmap development.' },
              { phase: 'Phase 2', title: 'System Implementation', duration: '4-6 months', description: 'Quality management system deployment, SOP development, and staff training.' },
              { phase: 'Phase 3', title: 'Internal Audits', duration: '2-3 months', description: 'Pre-assessment audits, corrective actions, and management review.' },
              { phase: 'Phase 4', title: 'Certification Audits', duration: '3-4 months', description: 'Accreditation body audits, DEA inspections, and final certification.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-zinc-800 bg-zinc-950">
                <div className="text-center shrink-0">
                  <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold text-sm">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className="text-zinc-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.duration}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Partner with Quantix?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Contact our compliance team to discuss your laboratory testing needs and certification requirements.
          </p>
          <Link 
            href="/about#contact"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Image 
              src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/CD2E1122-D511-4EDB-BE5D-98EF274B4BAF/no-bg/E9DA3959-08AF-4881-9CD3-456C8FBA0BF7.png"
              alt="Quantix Analytics"
              width={120}
              height={120}
              className="h-10 w-auto"
            />
            <p className="text-zinc-600 text-sm text-center">
              © 2025 Quantix Analytics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Federal Notice */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <p className="text-zinc-500 text-xs text-center">
            <strong className="text-zinc-400">Federal Compliance Notice:</strong> Quantix Analytics operates under DEA Registration and maintains strict compliance with 21 CFR Parts 1301-1321. All controlled substance activities are conducted in accordance with federal regulations.
          </p>
        </div>
      </div>
    </main>
  );
}
