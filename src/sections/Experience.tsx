import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cloud, Server, Network, Building2, X, ArrowRight } from 'lucide-react';

const experiences = [
  {
    id: '1',
    role: 'AI Security Engineer (MLSecOps)',
    company: 'micro1',
    type: 'Freelance',
    location: 'Remote',
    date: 'Mar 2026 - Present',
    current: true,
    icon: Shield,
    logo: '/logos/micro1.png',
    bullets: [
      'Active role. AI security and MLSecOps engineering on a freelance basis.'
    ]
  },
  {
    id: '2',
    role: 'Cloud Security Engineer',
    company: 'Microsoft Solutions Partner — Trusted Tech',
    type: 'Full-time',
    location: 'Remote, Irvine CA, USA',
    date: 'Feb 2025 - Present',
    current: true,
    icon: Cloud,
    logo: '/logos/microsoft.png',
    bullets: [
      'Administered Microsoft 365 and Azure infrastructure supporting 50+ enterprise properties across North America, maintaining identity security, endpoint compliance, and tenant configuration across multi-tenant environments',
      'Implemented Conditional Access policies, MFA enforcement, and Intune compliance controls to strengthen identity security across multi-tenant Microsoft 365 environments',
      'Managed identity lifecycle operations including user provisioning, access governance, and endpoint onboarding across 365 tenants',
      'Performed security alert triage and investigation involving email security threats and identity risk detections within Microsoft 365 security monitoring workflows',
      'Provided infrastructure support for network connectivity, endpoint compliance, and cloud workloads ensuring stability'
    ]
  },
  {
    id: '3',
    role: 'Founder and Technical Director',
    company: 'Silicon Barracks',
    type: 'Self-employed',
    location: 'Angeles City, Philippines',
    date: 'Feb 2022 - Present',
    current: true,
    icon: Building2,
    logo: '/logos/silicon-barracks.png',
    bullets: [
      'Building a technical collective focused on security, infrastructure, and AI-driven systems.'
    ]
  },
  {
    id: '4',
    role: 'Network Security Engineer',
    company: 'LTVplus LLC',
    type: 'Full-time',
    location: 'Remote, Santa Monica CA, USA',
    date: 'Sept 2024 - Feb 2025',
    current: false,
    icon: Network,
    logo: '/logos/ltvplus.png',
    bullets: [
      'Managed enterprise network and systems infrastructure across 200+ hospitality properties, maintaining connectivity, reliability, and operational uptime',
      'Delivered Tier 2 to 3 infrastructure and remote support, resolving network outages, security anomalies, and system failures',
      'Designed segmented network architectures for guest, staff, and operational environments, improving traffic isolation, reliability, and security posture',
      'Implemented endpoint and email security controls within Microsoft 365 and Azure environments to strengthen identity governance'
    ]
  },
  {
    id: '5',
    role: 'Endpoint Security Engineer Intern',
    company: 'Cloudstaff Philippines',
    type: 'Internship',
    location: 'Onsite, Angeles City, Philippines',
    date: 'Feb 2024 - May 2024',
    current: false,
    icon: Shield,
    logo: '/logos/cloudstaff.png',
    bullets: [
      'Supported 2000+ enterprise endpoints using Microsoft 365, Azure AD, and VPN systems',
      'Assisted Tier 2 engineering teams with identity administration, endpoint configuration, and system troubleshooting',
      'Deployed SentinelOne EDR and integrated Sentinel SIEM to strengthen centralized threat detection and endpoint monitoring'
    ]
  },
  {
    id: '6',
    role: 'Systems Administrator',
    company: 'Events and Crafts',
    type: 'Part-time',
    location: 'Onsite, Angeles City, Philippines',
    date: 'Feb 2021 - Jan 2024',
    current: false,
    icon: Server,
    logo: '/logos/events-and-crafts.png',
    bullets: [
      'Managed internal network systems and IT infrastructure for operational events and office environments',
      'Maintained endpoint systems, network connectivity, and hardware configurations for staff and event operations',
      'Delivered on-site technical support and troubleshooting for production environments'
    ]
  }
];

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<typeof experiences[0] | null>(null);

  return (
    <section id="experience" className="min-h-screen relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-blue-600 dark:text-[#f59e0b] mb-4">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444]" />
        </motion.div>

        <div className="relative border-l-0 md:border-l border-blue-600 dark:border-blue-600/30 dark:border-[#f59e0b]/30 ml-0 md:ml-8 grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-8">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const variants = [
              {
                node: "bg-blue-600 dark:bg-[#f59e0b]",
                hoverBorder: "lg:hover:border-blue-600 dark:lg:hover:border-[#f59e0b] hover:border-blue-600 dark:hover:border-[#f59e0b]",
                logoBg: "bg-blue-600/5 dark:bg-white/5",
                logoText: "text-blue-600 dark:text-[#f59e0b]",
                titleHover: "group-hover:text-blue-600 dark:group-hover:text-[#f59e0b]",
                indicator: "text-blue-600 dark:text-[#f59e0b]",
                badgeBg: "bg-blue-600/10 dark:bg-[#f59e0b]/10",
                badgeText: "text-blue-700 dark:text-[#f59e0b]",
                badgeBorder: "border-blue-600/20 dark:border-[#f59e0b]/20"
              },
              {
                node: "bg-blue-700 dark:bg-[#f97316]",
                hoverBorder: "lg:hover:border-blue-700 dark:lg:hover:border-[#f97316] hover:border-blue-700 dark:hover:border-[#f97316]",
                logoBg: "bg-blue-700/5 dark:bg-white/5",
                logoText: "text-blue-700 dark:text-[#f97316]",
                titleHover: "group-hover:text-blue-700 dark:group-hover:text-[#f97316]",
                indicator: "text-blue-700 dark:text-[#f97316]",
                badgeBg: "bg-blue-700/10 dark:bg-[#f97316]/10",
                badgeText: "text-blue-800 dark:text-[#f97316]",
                badgeBorder: "border-blue-700/20 dark:border-[#f97316]/20"
              },
              {
                node: "bg-blue-500 dark:bg-[#ef4444]",
                hoverBorder: "lg:hover:border-blue-500 dark:lg:hover:border-[#ef4444] hover:border-blue-500 dark:hover:border-[#ef4444]",
                logoBg: "bg-blue-500/5 dark:bg-white/5",
                logoText: "text-blue-600 dark:text-[#ef4444]",
                titleHover: "group-hover:text-blue-600 dark:group-hover:text-[#ef4444]",
                indicator: "text-blue-600 dark:text-[#ef4444]",
                badgeBg: "bg-blue-500/10 dark:bg-[#ef4444]/10",
                badgeText: "text-blue-700 dark:text-[#ef4444]",
                badgeBorder: "border-blue-500/20 dark:border-[#ef4444]/20"
              },
              {
                node: "bg-blue-400 dark:bg-[#fbbf24]",
                hoverBorder: "lg:hover:border-blue-400 dark:lg:hover:border-[#fbbf24] hover:border-blue-400 dark:hover:border-[#fbbf24]",
                logoBg: "bg-blue-400/5 dark:bg-white/5",
                logoText: "text-blue-500 dark:text-[#fbbf24]",
                titleHover: "group-hover:text-blue-500 dark:group-hover:text-[#fbbf24]",
                indicator: "text-blue-500 dark:text-[#fbbf24]",
                badgeBg: "bg-blue-400/10 dark:bg-[#fbbf24]/10",
                badgeText: "text-blue-600 dark:text-[#fbbf24]",
                badgeBorder: "border-blue-400/20 dark:border-[#fbbf24]/20"
              }
            ];
            const v = variants[index % variants.length];
            return (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }} className="relative pl-0 md:pl-12 group cursor-pointer" onClick={() => setSelectedExp(exp)} >
                <div 
                  className={`hidden md:block absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] group-hover:scale-150 transition-transform duration-300 ${v.node}`} 
                />

                <div className={`bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] ${v.hoverBorder} rounded-xl p-3.5 sm:p-6 flex flex-col gap-3 sm:gap-6 lg:hover:bg-slate-300/80 dark:lg:hover:bg-white/5 transition-all duration-300 h-full`}>
                  
                  {/* Icon/Logo Box */}
                  <div className="shrink-0 flex items-center justify-center sm:justify-start">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center lg:group-hover:scale-110 transition-all duration-300 overflow-hidden ${v.logoBg} ${v.logoText} group-hover:bg-slate-400/20 dark:group-hover:bg-white/10`}>
                      {exp.logo ? (
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to icon if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
                          }}
                        />
                      ) : (
                        <Icon size={24} strokeWidth={1.5} />
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 
                          className={`font-heading text-base sm:text-xl font-bold text-slate-900 dark:text-[#f3f4f6] mb-1 transition-colors ${v.titleHover} leading-tight line-clamp-2 sm:line-clamp-none`} 
                        >
                          {exp.role}
                        </h3>
                        <div className="text-slate-600 dark:text-[#a8a29e] text-[0.7rem] sm:text-sm line-clamp-1 sm:line-clamp-none">
                          {exp.company}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        {exp.current && (
                          <span className={`font-mono text-[10px] px-2 py-1 rounded border ${v.badgeBg} ${v.badgeText} ${v.badgeBorder}`}>
                            Current
                          </span>
                        )}
                        <span className="font-mono text-xs text-slate-600 dark:text-[#a8a29e]">
                          {exp.date}
                        </span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 sm:py-1 bg-[#ef4444]/10 dark:bg-[#ef4444]/10 text-red-600 dark:text-[#f87171] rounded border border-red-500/20 dark:border-[#ef4444]/20">
                        {exp.type}
                      </span>
                      <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 sm:py-1 bg-slate-300 dark:bg-white/5 text-slate-700 dark:text-[#a8a29e] rounded border border-slate-400 dark:border-white/10">
                        {exp.location}
                      </span>
                    </div>

                    {/* Hover Indicator */}
                    <div className={`mt-4 flex items-center gap-1.5 font-mono text-xs opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 lg:translate-y-2 lg:group-hover:translate-y-0 ${v.indicator}`}>
                      <span className="lg:hidden">Tap to view details</span>
                      <span className="hidden lg:inline">Click to view details</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-slate-900/20 dark:bg-[#0c0a09]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-2xl bg-slate-200/90 dark:bg-[#1c1917]/90 backdrop-blur-xl border border-slate-300 dark:border-[#292524] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8 overflow-y-auto">
                  <button 
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-4 right-4 p-2 text-slate-600 dark:text-[#a8a29e] hover:text-slate-900 dark:hover:text-[#f3f4f6] bg-slate-300 dark:bg-[#292524] rounded-full z-20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="mt-2 mb-8 pr-8">
                    <h3 className="font-heading text-3xl font-bold text-slate-900 dark:text-[#f3f4f6] mb-2">{selectedExp.role}</h3>
                    <div className="font-heading text-xl text-blue-600 dark:text-[#f59e0b] mb-4">{selectedExp.company}</div>
                    <div className="font-mono text-sm text-slate-600 dark:text-[#a8a29e] mb-2">{selectedExp.date}</div>
                    <div className="font-mono text-xs text-slate-600 dark:text-[#a8a29e]">{selectedExp.type} &middot; {selectedExp.location}</div>
                  </div>

                  <div className="space-y-4">
                    {selectedExp.bullets.map((bullet, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#ef4444] mt-2.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <p className="font-body text-slate-700 dark:text-[#D1D5DB] leading-relaxed">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
