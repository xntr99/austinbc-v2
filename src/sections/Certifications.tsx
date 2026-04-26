import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slimIcons } from '../data/slimIcons';
import { X, ExternalLink, GraduationCap, Award } from 'lucide-react';

const getIconPath = (slug: string) => {
  return slimIcons[slug] || null;
};

const certifications = [
  { id: '1', name: 'CompTIA CySA+', issuer: 'CompTIA', category: 'Security', icon: 'comptia', verifyLink: 'https://www.credly.com/badges/a484b994-f322-4716-a25c-021c5c656270/public_url' },
  { id: '2', name: 'CompTIA Security+', issuer: 'CompTIA', category: 'Security', icon: 'comptia', verifyLink: 'https://www.credly.com/badges/02fa74ba-7a44-44dc-a980-a2ec6e03bd8a/public_url' },
  { id: '3', name: 'CompTIA CSAP', issuer: 'CompTIA', category: 'Security', icon: 'comptia', verifyLink: 'https://www.credly.com/badges/2277df8d-f434-453d-b940-39ace9aabe1c/public_url' },
  { id: '4', name: 'CCNP ENCOR', issuer: 'Cisco', category: 'Network', icon: 'cisco', verifyLink: '#' },
  { id: '5', name: 'CCNA ENSA', issuer: 'Cisco', category: 'Network', icon: 'cisco', verifyLink: 'https://www.credly.com/badges/421e0dee-b5ce-4e74-abfa-284c42938a40/public_url' },
  { id: '6', name: 'NASA Open Science', issuer: 'NASA', category: 'Cloud', icon: 'nasa', verifyLink: 'https://www.credly.com/badges/720a03c2-7ab1-4618-a703-47a0f3daa6d4/public_url' },
  { id: '7', name: 'Offensive Security Ethical Hacker', issuer: 'Cisco', category: 'Security', icon: 'cisco', verifyLink: 'https://www.credly.com/badges/8a381731-27fe-486f-bb20-571307534e1b/public_url' },
  { id: '8', name: 'Google Cybersecurity Professional', issuer: 'Google', category: 'Security', icon: 'google', verifyLink: 'https://coursera.org/share/eff2fadb19efb3d08b5cac74fd8507a3' },
  { id: '9', name: 'Google AI Professional', issuer: 'Google', category: 'AI', icon: 'google', verifyLink: 'https://coursera.org/share/98332a0f5c1e752405e5bcc7a8eb2627' },
  { id: '10', name: 'Data Scientist Associate', issuer: 'DataCamp', category: 'AI', icon: 'datacamp', verifyLink: '#' },
  { id: '11', name: 'Microsoft Cybersecurity Analyst', issuer: 'Microsoft', category: 'Security', icon: 'microsoft', verifyLink: 'https://coursera.org/share/e19172c6ef7568196367438ba459d634' },
  { id: '12', name: 'Certified Network Securty Practitioner', issuer: 'SecOps Group', category: 'Security', icon: 'security', verifyLink: 'https://drive.google.com/file/d/1b7y4hP8j2zOj2z8T5hJLkzLRKlv46zvn/view' },
  { id: '13', name: 'Certfieid AI/ML Pentester', issuer: 'SecOps Group', category: 'AI', icon: 'security', verifyLink: 'https://drive.google.com/file/d/1ij0mzLFONF2i2TzoeQI4ae8jO5rzXZFb/view' },
  { id: '14', name: 'ISO/IEC 27001:2022 Lead Auditor', issuer: 'Mastermind', category: 'GRC', icon: 'security', verifyLink: '#' },
  { id: '15', name: 'ISO/IEC 42001:2023 Lead Auditor', issuer: 'Mastermind', category: 'AI', icon: 'security', verifyLink: '#' },
  { id: '16', name: 'Certified API Security Associate', issuer: 'Wallarm', category: 'Security', icon: 'security', verifyLink: '#' },
  { id: '17', name: 'Solutions Architect', issuer: 'Amazon AWS', category: 'Cloud', icon: 'amazonwebservices', verifyLink: 'https://www.credly.com/badges/a60c486c-bcd1-418e-868c-2764689d4e41/public_url' },
  { id: '18', name: 'Google IT Support Professional', issuer: 'Google', category: 'ITSM', icon: 'google', verifyLink: 'https://coursera.org/share/b47170673330074bb6327e7a5c9ea890' },
  { id: '19', name: 'NSE3 Cybersecurity Associate', issuer: 'Fortinet', category: 'Security', icon: 'fortinet', verifyLink: 'https://www.credly.com/badges/a8112006-7cf4-4cf2-9e1d-1ee250f5b61c' },
  { id: '20', name: 'Qualys certified Specialist:EDR', issuer: 'Qualys', category: 'Security', icon: 'qualys', verifyLink: 'https://drive.google.com/file/d/1PAKhOSkxhHsTJSkZaXb-ID3I6GbV8ig1/view' },
  { id: '21', name: 'Qualys Certified Specialist:VMDR', issuer: 'Qualys', category: 'Security', icon: 'qualys', verifyLink: 'https://drive.google.com/file/d/1Dwze0fljgk-mtO6viOdo9r9lMTZede3U/view' },
  { id: '22', name: 'Juniper Security Associate', issuer: 'Juniper Networks', category: 'Network', icon: 'junipernetworks', verifyLink: 'https://drive.google.com/drive/u/0/folders/1HFhzV2nxcms7CEJBqZ9ivL_9hFKe4Z5x' },
  { id: '23', name: 'Next Generation Firewall Administrator', issuer: 'Palo Alto Networks', category: 'Network', icon: 'paloaltonetworks', verifyLink: 'https://www.credly.com/badges/d66e7a70-d472-422f-8192-5cdd202ef5c5/public_url' },
  { id: '24', name: 'Virtual Network Security Administrator', issuer: 'Palo Alto Networks', category: 'Network', icon: 'paloaltonetworks', verifyLink: 'https://www.credly.com/badges/93113800-60a7-4fc0-8287-98bdb84c5a16/public_url' },
  { id: '25', name: 'ITIL v4 Foundations', issuer: 'Simplilearn', category: 'ITSM', icon: 'itil', verifyLink: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiI0MTg0IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvNzcxOTMyM183OTgxMjk0MTczNTQyNjkzOTg1MC5wbmciLCJ1c2VybmFtZSI6IkF1c3RpbiBMb3VpZSBCYXR1bCJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion&referrer=https%3A%2F%2Flms.simplilearn.com%2Fdashboard%2Fcertificate&%24web_only=true&_branch_match_id=1565716148835128131&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL87MLcjJ1EssKNDLyczL1k%2FVtwxzDfE1SzP0CEiyrytKTUstKsrMS49PKsovL04tsvUBqkpN8cwDANDp%2FNJBAAAA' },
  { id: '26', name: 'Certified Cybersecurity Educator Professional', issuer: 'Red Team Leaders', category: 'GRC', icon: 'security', verifyLink: 'https://courses.redteamleaders.com/exam-completion/799e8303f489ca67' },
  { id: '27', name: 'Certfieid Phishing Prevention Specialist', issuer: 'Hack & Fix', category: 'GRC', icon: 'security', verifyLink: 'https://academy.hackandfix.com/certificate-page/?user=4209&course=53700' },
  { id: '28', name: 'Certified SME Cybersecurity Officer', issuer: 'International Cyber Threat Task Force', category: 'Security', icon: 'security', verifyLink: 'https://drive.google.com/file/d/10hy-ZA99nkjTsbfJhhaF9Na4vkPiTWtB/view' },
  { id: '29', name: 'Certified Threat Intelligence Analyst', issuer: 'Red Team Leaders', category: 'GRC', icon: 'security', verifyLink: 'https://courses.redteamleaders.com/exam-completion/fa189607f4443a7e' },
  { id: '30', name: 'Certfieid Ransomware Protection Officer', issuer: 'International Cyber Threat Task Force', category: 'GRC', icon: 'security', verifyLink: 'https://drive.google.com/file/d/12m-3-w8frQVx6eKtykNcOko-UK0g3pi0/view' }
];

const education = [
  {
    school: 'Holy Angel University',
    location: 'Angeles City, Philippines',
    logo: '/hau-logo.png',
    programs: [
      {
        id: '1',
        degree: 'Master of Sciences in Cybersecurity',
        date: 'Expected Nov 2026',
        highlight: 'Candidate with High Distinction',
        details: 'Pursuing advanced studies in cybersecurity, focusing on threat intelligence, incident response, and secure architecture design.'
      },
      {
        id: '2',
        degree: 'Bachelor of Science in Information Technology, Major in Network Administration',
        date: 'Graduated May 2024',
        highlight: 'GWA 1.05 (PH) • 4.0 GPA Equivalent (US) • JDN Scholar • DICT Scholar • Certified Ethical Hacker',
        details: 'Esports Varsity Team Captain. Specialized in network infrastructure, full-stack development, and offensive security.'
      }
    ]
  },
  {
    school: 'Inegben Academy',
    location: 'Remote, Lagos, Nigeria',
    logo: '/inegben-logo.png',
    programs: [
      {
        id: '3',
        degree: 'Postgraduate in Cybersecurity GRC',
        date: 'Expected July 2026',
        highlight: 'Full Scholar',
        details: 'Focusing on Governance, Risk, and Compliance frameworks including NIST CSF, ISO 27001, and regulatory compliance.'
      },
      {
        id: '5',
        degree: 'Postgraduate Diploma in Software Engineering',
        date: 'Expected March 2027',
        highlight: 'Full Scholar',
        details: 'Advanced studies in software development, system design, and engineering principles.'
      }
    ]
  },
  {
    school: 'Hillcrest Heights Institute',
    location: 'Philippines',
    logo: '/hillcrest-logo.png',
    programs: [
      {
        id: '4',
        degree: 'Humanities and Social Sciences',
        date: 'Graduated March 2020',
        highlight: 'Class Valedictorian',
        details: 'SSG President, Soccer Nationals Athlete Varsity Captain. Developed strong communication and critical thinking skills.'
      }
    ]
  }
];

const affiliations = [
  { org: 'DataCamp and Data Engineering Philippines', role: 'Full Scholar', date: '2026 to Present' },
  { org: 'Philippine Institute of Cybersecurity Professionals (PICSPro)', role: 'Member', date: '2025 to Present' },
  { org: 'Philippine Computer Society (PCS)', role: 'Member', date: '2025 to Present' }
];

const colorVariants = [
  { text: "text-blue-600 dark:text-[#f59e0b]", bg: "bg-blue-600 dark:bg-[#f59e0b]", border: "border-blue-600 dark:border-[#f59e0b]", borderLeft: "border-l-blue-600 dark:border-l-[#f59e0b]", hoverBorder: "lg:hover:border-blue-600 dark:hover:border-[#f59e0b]", groupHoverText: "group-hover:text-blue-600 dark:group-hover:text-[#f59e0b]" },
  { text: "text-blue-700 dark:text-[#f97316]", bg: "bg-blue-700 dark:bg-[#f97316]", border: "border-blue-700 dark:border-[#f97316]", borderLeft: "border-l-blue-700 dark:border-l-[#f97316]", hoverBorder: "lg:hover:border-blue-700 dark:hover:border-[#f97316]", groupHoverText: "group-hover:text-blue-700 dark:group-hover:text-[#f97316]" },
  { text: "text-blue-500 dark:text-[#ef4444]", bg: "bg-blue-500 dark:bg-[#ef4444]", border: "border-blue-500 dark:border-[#ef4444]", borderLeft: "border-l-blue-500 dark:border-l-[#ef4444]", hoverBorder: "lg:hover:border-blue-500 dark:hover:border-[#ef4444]", groupHoverText: "group-hover:text-blue-500 dark:group-hover:text-[#ef4444]" },
  { text: "text-blue-800 dark:text-[#fbbf24]", bg: "bg-blue-800 dark:bg-[#fbbf24]", border: "border-blue-800 dark:border-[#fbbf24]", borderLeft: "border-l-blue-800 dark:border-l-[#fbbf24]", hoverBorder: "lg:hover:border-blue-800 dark:hover:border-[#fbbf24]", groupHoverText: "group-hover:text-blue-800 dark:group-hover:text-[#fbbf24]" },
  { text: "text-blue-400 dark:text-[#f43f5e]", bg: "bg-blue-400 dark:bg-[#f43f5e]", border: "border-blue-400 dark:border-[#f43f5e]", borderLeft: "border-l-blue-400 dark:border-l-[#f43f5e]", hoverBorder: "lg:hover:border-blue-400 dark:hover:border-[#f43f5e]", groupHoverText: "group-hover:text-blue-400 dark:group-hover:text-[#f43f5e]" },
  { text: "text-blue-600 dark:text-[#ea580c]", bg: "bg-blue-600 dark:bg-[#ea580c]", border: "border-blue-600 dark:border-[#ea580c]", borderLeft: "border-l-blue-600 dark:border-l-[#ea580c]", hoverBorder: "lg:hover:border-blue-600 dark:hover:border-[#ea580c]", groupHoverText: "group-hover:text-blue-600 dark:group-hover:text-[#ea580c]" }
];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const [expandedEdu, setExpandedEdu] = useState<string | null>(null);

  const categories = ['All', 'Security', 'Network', 'Cloud', 'AI', 'GRC', 'ITSM'];

  const filteredCerts = activeCategory === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === activeCategory);

  return (
    <section id="certifications" className="min-h-screen relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-blue-600 dark:text-[#f59e0b] mb-4">
            Certifications & Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444]" />
        </motion.div>

        {/* Education Section */}
        <div id="education" className="mb-24">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-slate-900 dark:text-[#f3f4f6] mb-12 flex items-center gap-4">
            <GraduationCap className="text-blue-600 dark:text-[#f59e0b]" size={40} />
            Education
          </h3>
          <div className="space-y-12">
            {education.map((schoolGroup, sIndex) => {
              const v = colorVariants[sIndex % 6];
              
              return (
                <motion.div 
                  key={schoolGroup.school}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: sIndex * 0.1 }}
                  className="bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] rounded-2xl relative overflow-hidden group shadow-2xl p-4 sm:p-10"
                >
                  {/* Decorative background glow */}
                  <div 
                    className={`absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 blur-3xl transition-opacity group-hover:opacity-20 bg-blue-600 dark:bg-[#f59e0b]`}
                  />

                  {/* School Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-10 relative z-10">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100/50 dark:bg-[#0c0a09]/50 border border-slate-300 dark:border-[#292524] p-3 shadow-xl transform group-hover:scale-105 transition-transform duration-500 shrink-0">
                      <img 
                        src={schoolGroup.logo} 
                        alt={schoolGroup.school} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h4 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">{schoolGroup.school}</h4>
                      <p className="font-mono text-sm text-slate-700 dark:text-white/80 flex items-center justify-center sm:justify-start gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#f59e0b]`} />
                        {schoolGroup.location}
                      </p>
                    </div>
                  </div>

                  {/* Academic Programs List */}
                  <div className="space-y-0 relative z-10">
                    {schoolGroup.programs.map((prog, pIndex) => (
                      <div 
                        key={prog.id}
                        className={`py-8 ${pIndex !== 0 ? 'border-t border-slate-300 dark:border-[#292524]' : ''} group/prog cursor-pointer`}
                        onMouseEnter={() => window.innerWidth >= 1024 && setExpandedEdu(prog.id)}
                        onMouseLeave={() => window.innerWidth >= 1024 && setExpandedEdu(null)}
                        onClick={() => setExpandedEdu(expandedEdu === prog.id ? null : prog.id)}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                          <h5 className="font-heading text-xl font-bold text-slate-900 dark:text-[#f3f4f6] transition-colors group-hover/prog:text-blue-600 dark:group-hover/prog:text-[#ea580c]">{prog.degree}</h5>
                          <span className={`font-mono text-xs uppercase tracking-widest px-3 py-1 bg-slate-300 dark:bg-[#0c0a09] rounded border border-slate-400 dark:border-[#292524] shadow-sm text-slate-600 dark:text-[#a8a29e]`}>{prog.date}</span>
                        </div>
                        <p className={`font-mono text-sm font-medium tracking-wide mb-3 text-blue-600/80 dark:text-[#f59e0b]/80`}>{prog.highlight}</p>
                        
                        <AnimatePresence>
                          {expandedEdu === prog.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6">
                                <p className="font-body text-slate-700 dark:text-white leading-relaxed text-base italic">
                                  {prog.details}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Affiliations Section */}
        <div className="mb-24">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-slate-900 dark:text-[#f3f4f6] mb-12 flex items-center gap-4">
            <Award className="text-[#ef4444]" size={40} />
            Professional Affiliations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
            {affiliations.map((affil, index) => {
              const v = colorVariants[index % 6];
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] rounded-xl p-3 sm:p-6 border-l-4 lg:hover:bg-slate-300/80 dark:lg:hover:bg-white/5 ${v.hoverBorder} ${v.borderLeft} transition-all duration-300 h-full flex flex-col justify-between`}
              >
                <h4 className="font-heading text-[0.8rem] sm:text-lg font-bold text-slate-900 dark:text-[#f3f4f6] mb-2 sm:mb-4">{affil.org}</h4>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono text-[0.65rem] sm:text-sm text-slate-700 dark:text-[#d1d5db] uppercase tracking-wider gap-1 sm:gap-0">
                  <span className={`font-bold ${v.text}`}>{affil.role}</span>
                  <span className="opacity-80">{affil.date}</span>
                </div>
              </motion.div>
            )})}
          </div>
        </div>

        {/* Certifications Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-sm px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-blue-600 dark:bg-[#f59e0b] text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                  : 'bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-slate-600 dark:text-[#a8a29e] hover:text-slate-900 dark:text-[#f3f4f6] hover:border-blue-600 dark:border-blue-600/50 dark:border-[#f59e0b]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6"
        >
          <AnimatePresence>
            {filteredCerts.map((cert, index) => {
              const svgPath = getIconPath(cert.icon);
              const v = colorVariants[index % 6];
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className={`bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] rounded-xl p-3 sm:p-6 flex flex-col items-center text-center cursor-pointer group lg:hover:bg-slate-300/80 dark:lg:hover:bg-white/5 ${v.hoverBorder} transition-all duration-300`}
                >
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 mb-3 sm:mb-6 flex items-center justify-center transition-colors ${v.text}`}>
                    {svgPath ? (
                      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                        <path d={svgPath} />
                      </svg>
                    ) : (
                      <Award size={48} strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className={`font-heading text-[0.85rem] sm:text-lg font-bold text-slate-900 dark:text-[#f3f4f6] mb-1 sm:mb-2 transition-colors ${v.groupHoverText}`}>
                    {cert.name}
                  </h3>
                  <p className="font-body text-sm text-slate-700 dark:text-[#d1d5db] mb-4">{cert.issuer}</p>
                  <span className={`font-mono text-xs px-3 py-1 bg-slate-300 dark:bg-[#292524] border border-slate-400 dark:border-[#44403c] rounded-full mt-auto ${v.text}`}>
                    {cert.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Cert Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-[#0c0a09]/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-200/90 dark:bg-[#1c1917]/90 backdrop-blur-xl border border-slate-300 dark:border-[#292524] rounded-2xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 text-slate-600 dark:text-[#a8a29e] hover:text-slate-900 dark:hover:text-[#f3f4f6] bg-slate-300 dark:bg-[#292524] rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center text-blue-600 dark:text-[#f59e0b]">
                {getIconPath(selectedCert.icon) ? (
                  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                    <path d={getIconPath(selectedCert.icon)} />
                  </svg>
                ) : (
                  <Award size={64} strokeWidth={1.5} />
                )}
              </div>

              <h3 className="font-heading text-3xl font-bold text-slate-900 dark:text-[#f3f4f6] mb-4">
                {selectedCert.name}
              </h3>
              
              <div className="font-body text-xl text-slate-700 dark:text-[#d1d5db] mb-8">
                Issued by <span className="text-slate-900 dark:text-[#f3f4f6] font-medium">{selectedCert.issuer}</span>
              </div>

              <a 
                href={selectedCert.verifyLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 dark:bg-[#f59e0b] text-white dark:text-black font-heading font-bold uppercase tracking-wider rounded-lg hover:bg-blue-700 dark:hover:bg-[#f59e0b]/90 transition-colors"
              >
                Verify Credential <ExternalLink size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
