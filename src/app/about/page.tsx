'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Users, Target, Lightbulb, ChevronDown, Mail, Phone, MapPin, Menu, X, Microscope, Shield, TrendingUp } from 'lucide-react';

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
    name: 'Marcus Thompson',
    role: 'Chief Operations Officer',
    bio: 'Previously VP of Operations at LabCorp. Expert in scaling laboratory operations while maintaining quality standards. MBA from Wharton, BS in Biology from Howard University.',
    image: null
  },
  {
    name: 'Dr. Rachel Okonkwo, Ph.D.',
    role: 'Chief Scientific Officer',
    bio: 'Pioneer in cannabis analytical methodology with 45+ peer-reviewed publications. Former professor at UC Berkeley. Developed the first validated LC-MS method for minor cannabinoids.',
    image: null
  },
  {
    name: 'James Park',
    role: 'VP of Regulatory Affairs',
    bio: 'Former DEA compliance officer with deep expertise in Schedule I research protocols. Has guided 200+ laboratories through DEA registration and state licensing processes.',
    image: null
  }
];

const timeline = [
  { year: '2018', event: 'Founded in Denver, CO with initial DEA Schedule I research registration' },
  { year: '2019', event: 'Achieved ISO/IEC 17025 accreditation. Expanded to 5 state licenses.' },
  { year: '2020', event: 'Launched consulting division. Helped 50+ labs achieve compliance.' },
  { year: '2021', event: 'Opened second facility in Oakland, CA. Reached 20 state licenses.' },
  { year: '2022', event: 'Achieved ISO 17034 accreditation for reference standards production.' },
  { year: '2023', event: 'Expanded to 38 states. Processed 500,000th sample.' },
  { year: '2024', event: 'Launched AI-powered COA verification platform. Industry recognition awards.' }
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedLeader, setExpandedLeader] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/CD2E1122-D511-4EDB-BE5D-98EF274B4BAF/no-bg/E9DA3959-08AF-4881-9CD3-456C8FBA0BF7.png"
                alt="Quantix Analytics"
                width={80}
                height={80}
                className="h-12 sm:h-16 w-auto"
              />
              <span className="text-lg sm:text-xl font-bold tracking-tight">QUANTIX</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Certifications</Link>
              <Link href="/about" className="text-white font-medium">About</Link>
              <Link href="/" className="px-4 py-2 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
                Contact Us
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 px-4 py-4 space-y-4">
            <Link href="/" className="block text-zinc-400 hover:text-white">Certifications</Link>
            <Link href="/about" className="block text-white font-medium">About</Link>
            <Link href="/" className="block px-4 py-2 bg-white text-black font-semibold text-center">
              Contact Us
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">
            Setting the Standard for Cannabis Laboratory Excellence
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
            Since 2018, Quantix Analytics has been the trusted partner for cannabis businesses 
            navigating the complex landscape of DEA compliance, ISO accreditation, and state regulations.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12">
          <div className="p-6 sm:p-8 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-zinc-400" size={28} />
              <h2 className="text-xl sm:text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              To provide the cannabis industry with world-class analytical testing services and 
              compliance consulting that ensures product safety, regulatory adherence, and consumer trust.
              We believe rigorous science and transparent processes are the foundation of a legitimate industry.
            </p>
          </div>
          <div className="p-6 sm:p-8 border border-zinc-800">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-zinc-400" size={28} />
              <h2 className="text-xl sm:text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              To be the definitive authority in cannabis laboratory certification and testing, 
              driving industry-wide standards that protect consumers and enable businesses to thrive.
              We envision a future where every cannabis product meets pharmaceutical-grade quality standards.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 border border-zinc-800 hover:border-zinc-600 transition-colors">
                <value.icon className="text-zinc-400 mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">Leadership Team</h2>
          <p className="text-zinc-400 text-center mb-10 max-w-2xl mx-auto">
            Our leadership combines decades of experience in analytical chemistry, regulatory compliance, and laboratory operations.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {leadership.map((leader, index) => (
              <div key={index} className="border border-zinc-800">
                <button
                  className="w-full p-6 text-left flex items-center justify-between"
                  onClick={() => setExpandedLeader(expandedLeader === index ? null : index)}
                >
                  <div>
                    <h3 className="text-lg font-bold">{leader.name}</h3>
                    <p className="text-zinc-400">{leader.role}</p>
                  </div>
                  <ChevronDown 
                    className={`text-zinc-400 transition-transform ${expandedLeader === index ? 'rotate-180' : ''}`} 
                    size={24} 
                  />
                </button>
                {expandedLeader === index && (
                  <div className="px-6 pb-6 border-t border-zinc-800 pt-4">
                    <p className="text-zinc-400 text-sm leading-relaxed">{leader.bio}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Our Journey</h2>
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-white"></div>
                  {index < timeline.length - 1 && <div className="w-px h-full bg-zinc-800 min-h-[60px]"></div>}
                </div>
                <div className="pb-8">
                  <span className="text-white font-bold">{item.year}</span>
                  <p className="text-zinc-400 mt-1">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: '500K+', label: 'Samples Tested' },
              { value: '38', label: 'State Licenses' },
              { value: '6+', label: 'Years Experience' },
              { value: '200+', label: 'Labs Certified' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 border border-zinc-800">
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 sm:py-16 px-4 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-zinc-400 mb-8">
            Ready to achieve compliance excellence? Our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-10">
            <a href="mailto:compliance@quantixanalytics.com" className="flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <Mail size={20} />
              <span>compliance@quantixanalytics.com</span>
            </a>
            <a href="tel:+18005551234" className="flex items-center justify-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <Phone size={20} />
              <span>(800) 555-1234</span>
            </a>
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <MapPin size={20} />
              <span>Denver, CO</span>
            </div>
          </div>
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            View Our Certifications
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="https://uaednwpxursknmwdeejn.supabase.co/storage/v1/object/public/product-images/ai-generated/CD2E1122-D511-4EDB-BE5D-98EF274B4BAF/no-bg/E9DA3959-08AF-4881-9CD3-456C8FBA0BF7.png"
              alt="Quantix Analytics"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="font-semibold">QUANTIX ANALYTICS</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2024 Quantix Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
