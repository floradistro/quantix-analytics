'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Target, Award, Lightbulb, ChevronDown, Mail, Phone, MapPin, Menu, X, Microscope, Shield, TrendingUp } from 'lucide-react';

const values = [
  {
    title: 'Scientific Integrity',
    description: 'Every result we report is backed by validated methods, rigorous QC protocols, and complete documentation. We never compromise on accuracy.',
    icon: Microscope
  },
  {
    title: 'Regulatory Excellence',
    description: 'We exceed minimum compliance requirements, maintaining DEA registration, ISO accreditation, and licenses across 38 states.',
    icon: Shield
  },
  {
    title: 'Innovation',
    description: 'Continuous investment in advanced instrumentation, automation, and data science to deliver faster, more accurate results.',
    icon: Lightbulb
  },
  {
    title: 'Client Partnership',
    description: 'We work alongside cultivators, manufacturers, and dispensaries to help them succeed in a complex regulatory environment.',
    icon: Users
  }
];

const leadership = [
  {
    name: 'Dr. Sarah Chen, Ph.D.',
    role: 'Chief Executive Officer',
    bio: 'Former FDA scientist with 18 years in analytical chemistry. Led method development at two Fortune 500 pharmaceutical companies before founding Quantix in 2018. Ph.D. in Analytical Chemistry from MIT.',
    image: null
  },
  {
    name: 'Marcus Williams',
    role: 'Chief Operating Officer',
    bio: '15 years scaling laboratory operations. Previously VP of Operations at LabCorp, where he oversaw 200+ testing facilities. MBA from Wharton, BS in Chemical Engineering from Georgia Tech.',
    image: null
  },
  {
    name: 'Dr. James Park, Ph.D.',
    role: 'Chief Scientific Officer',
    bio: 'Pioneered cannabis potency testing methods now used industry-wide. Published 40+ peer-reviewed papers on cannabinoid analysis. Former professor at UC Davis, Ph.D. from Stanford.',
    image: null
  },
  {
    name: 'Elena Rodriguez, J.D.',
    role: 'Chief Compliance Officer',
    bio: 'Former DEA Diversion Investigator with 12 years federal experience. Expert in controlled substance regulations and state cannabis licensing. J.D. from Georgetown Law.',
    image: null
  }
];

const timeline = [
  { year: '2018', title: 'Founded in Denver', description: 'Dr. Sarah Chen establishes Quantix Analytics with a mission to bring pharmaceutical-grade testing to the cannabis industry.' },
  { year: '2019', title: 'DEA Registration', description: 'Received DEA Schedule I Researcher registration, enabling controlled substance R&D and reference standard production.' },
  { year: '2020', title: 'ISO 17025 Accreditation', description: 'Achieved ISO/IEC 17025 accreditation from A2LA, validating our quality management system and technical competence.' },
  { year: '2021', title: 'National Expansion', description: 'Opened satellite laboratories in California, Michigan, and Florida. Reached 15 state licenses.' },
  { year: '2022', title: 'ISO 17034 Certified', description: 'Became one of only 5 labs in North America certified to produce cannabis certified reference materials.' },
  { year: '2023', title: '100,000 Tests Milestone', description: 'Processed our 100,000th sample while maintaining 99.7% on-time delivery and zero compliance violations.' },
  { year: '2024', title: '38 State Licenses', description: 'Expanded to 38 state markets with 4 regional laboratories, serving over 500 licensed cannabis operators.' }
];

const stats = [
  { value: '500+', label: 'Licensed Clients' },
  { value: '38', label: 'State Licenses' },
  { value: '6', label: 'Years Operating' },
  { value: '0', label: 'Compliance Violations' }
];

export default function About() {
  const [expandedLeader, setExpandedLeader] = useState<string | null>(null);
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
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Certifications</Link>
            <Link href="/about" className="text-white font-medium">About</Link>
            <a href="#contact" className="px-4 py-2 bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
              Contact Us
            </a>
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
            <Link href="/" className="block text-zinc-400">Certifications</Link>
            <Link href="/about" className="block text-white font-medium">About</Link>
            <a href="#contact" className="block px-4 py-2 bg-white text-black font-medium text-center">
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="inline-block px-3 py-1 border border-zinc-700 text-zinc-400 text-xs md:text-sm mb-6">
            ABOUT QUANTIX ANALYTICS
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            The Science of<br />
            <span className="text-zinc-500">Cannabis Compliance</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl">
            Founded in 2018, Quantix Analytics was built on a simple premise: the cannabis industry 
            deserves the same rigorous analytical standards as pharmaceuticals. Today, we're the 
            trusted testing partner for over 500 licensed operators across 38 states.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-zinc-800">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Our Mission</h2>
              </div>
              <p className="text-zinc-400">
                To provide cannabis operators with accurate, reliable, and timely analytical data 
                that ensures product safety, regulatory compliance, and consumer confidence. We 
                believe rigorous testing is the foundation of a legitimate industry.
              </p>
            </div>
            <div className="p-6 border border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-zinc-800">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">Our Vision</h2>
              </div>
              <p className="text-zinc-400">
                A future where cannabis products are held to the same analytical standards as 
                pharmaceuticals—where every consumer can trust what's on the label, and every 
                operator has the data they need to produce safe, consistent products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Core Values</h2>
          <p className="text-zinc-500 mb-8">The principles that guide everything we do</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="p-6 border border-zinc-800 bg-zinc-950">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-zinc-800">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Leadership Team</h2>
          <p className="text-zinc-500 mb-8">Decades of combined experience in science, operations, and compliance</p>
          
          <div className="grid gap-4">
            {leadership.map((leader) => {
              const isExpanded = expandedLeader === leader.name;
              
              return (
                <div key={leader.name} className="border border-zinc-800 bg-zinc-950">
                  <button
                    onClick={() => setExpandedLeader(isExpanded ? null : leader.name)}
                    className="w-full p-4 md:p-6 flex items-center gap-4 text-left hover:bg-zinc-900 transition-colors"
                  >
                    <div className="w-12 h-12 bg-zinc-800 flex items-center justify-center shrink-0">
                      <span className="text-lg font-bold text-white">
                        {leader.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white">{leader.name}</h3>
                      <p className="text-zinc-500 text-sm">{leader.role}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-zinc-800">
                      <p className="text-zinc-400 text-sm mt-4">{leader.bio}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Journey</h2>
          <p className="text-zinc-500 mb-8">Key milestones in building the industry's most trusted lab</p>
          
          <div className="space-y-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 border border-zinc-800 bg-zinc-950">
                <div className="shrink-0">
                  <div className="w-14 h-10 flex items-center justify-center bg-white text-black font-bold text-sm">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-zinc-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact Us</h2>
          <p className="text-zinc-500 mb-8">Get in touch with our team</p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            <a 
              href="mailto:compliance@quantixanalytics.com"
              className="p-6 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors"
            >
              <Mail className="w-6 h-6 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">Email</h3>
              <p className="text-zinc-400 text-sm break-all">compliance@quantixanalytics.com</p>
            </a>
            <a 
              href="tel:+18005551234"
              className="p-6 border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 transition-colors"
            >
              <Phone className="w-6 h-6 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">Phone</h3>
              <p className="text-zinc-400 text-sm">1-800-555-1234</p>
            </a>
            <div className="p-6 border border-zinc-800 bg-zinc-950">
              <MapPin className="w-6 h-6 text-white mb-3" />
              <h3 className="font-semibold text-white mb-1">Headquarters</h3>
              <p className="text-zinc-400 text-sm">1847 Market Street<br />Denver, CO 80202</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Work with Us?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Learn about our certifications and see how Quantix Analytics can support your compliance needs.
          </p>
          <Link 
            href="/"
            className="inline-block w-full sm:w-auto px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
          >
            View Our Certifications
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
    </main>
  );
}
