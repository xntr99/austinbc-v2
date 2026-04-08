import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Github, Linkedin, Mail, GraduationCap, Trophy, Shield, BookOpen, Network, Cloud, Cpu } from 'lucide-react';

import { vendorLogos } from '../data/vendorLogos';

const marqueeLogos = vendorLogos.map(vendor => ({
  name: vendor.name,
  url: vendor.logoUrl || vendor.fallbackUrl,
  // Wikimedia SVGs are colorful, so we treat them as 'not white' to get the nice grayscale-to-color hover effect
  isWhite: false,
}));

export default function Hero() {
  const [activeAchievement, setActiveAchievement] = useState<string | null>(null);
  const [activeStatDetail, setActiveStatDetail] = useState<number | null>(null);

  const statDetails = [
    {
      label: 'Years Experience',
      value: 5,
      suffix: '+',
      items: [
        { label: 'AI Security Engineer', sub: 'micro1' },
        { label: 'Cloud Security Engineer', sub: 'Trusted Tech' },
        { label: 'Founder & Security Lead', sub: 'Silicon Barracks' },
        { label: 'Security & IT Consultant', sub: 'Independent' },
        { label: 'Full-Stack Developer', sub: 'Various Clients' },
      ],
    },
    {
      label: 'Countries Served',
      value: 6,
      suffix: '+',
      items: [
        { label: '🇺🇸 United States', sub: '' },
        { label: '🇬🇧 United Kingdom', sub: '' },
        { label: '🇨🇦 Canada', sub: '' },
        { label: '🇦🇺 Australia', sub: '' },
        { label: '🇵🇭 Philippines', sub: '' },
        { label: '🇪🇺 Europe', sub: 'Multiple Countries' },
      ],
    },
    {
      label: 'Certifications',
      value: 30,
      suffix: '+',
      items: [
        { label: 'CySA+, Sec+, CSAP', sub: 'CompTIA' },
        { label: 'CCNP ENCOR, CCNA', sub: 'Cisco' },
        { label: 'AWS Solutions Architect', sub: 'Amazon Web Services' },
        { label: 'NASA Open Science', sub: 'NASA' },
        { label: 'MSc Cybersecurity (in progress)', sub: 'Holy Angel University' },
        { label: '+ 25 more across domains', sub: 'Cloud · GRC · Forensics · AI' },
      ],
    },
    {
      label: 'Projects Done',
      value: 10,
      suffix: '',
      items: [
        { label: 'Reverse Engineering & Malware Analysis', sub: 'Security Research' },
        { label: 'SOAR Workflow Engineering', sub: 'Detection Engineering' },
        { label: 'AI-Assisted Security Automation', sub: 'AI Security' },
        { label: 'Cloud Security Attack Path Analysis', sub: 'Cloud Security' },
        { label: 'Active Directory Attack Simulation', sub: 'Security Research' },
        { label: 'Enterprise Network Architecture', sub: 'Network Architecture' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center pt-8 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
        <motion.div
          className="flex flex-col items-start w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >

          {/* Top Row: Image + Titles + Buttons */}
          <div className="flex flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 xl:gap-8 mb-8 w-full">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 min-w-0">
              <motion.div variants={itemVariants} className="shrink-0">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-slate-300 dark:border-[#292524] relative group">
                  <img
                    src="/austin.jpg"
                    alt="Austin BC"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-600 dark:group-hover:border-[#f59e0b]/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
              </motion.div>

              <div className="flex flex-col min-w-0">
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2 sm:mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-600 dark:text-[#a8a29e] uppercase truncate">
                    Available for Opportunities
                  </span>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                  <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-slate-900 dark:text-[#f2f2f2] truncate items-center flex">
                    <span className="font-semibold">Austin</span>
                    <span className="font-bold ml-2 -ml-[0.02em] tracking-[-0.04em]">BC</span>
                  </h1>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="font-body font-medium text-xs sm:text-lg md:text-xl text-slate-600 dark:text-[#a8a29e] line-clamp-2 sm:line-clamp-none"
                >
                  Security Engineer • IT Consultant • Developer • Ethical Hacker
                </motion.h2>
              </div>
            </div>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col items-end gap-2 sm:gap-3 shrink-0 xl:pb-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <a href="https://linkedin.com/in/batulaustin" target="_blank" rel="noreferrer" className="p-2 sm:p-2.5 rounded-md bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] hover:border-blue-600 dark:hover:border-[#f59e0b]/30 transition-all">
                  <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a href="https://github.com/xntr99" target="_blank" rel="noreferrer" className="p-2 sm:p-2.5 rounded-md bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] hover:border-blue-600 dark:hover:border-[#f59e0b]/30 transition-all">
                  <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
                <a href="mailto:batulaustin.work@gmail.com" className="p-2 sm:p-2.5 rounded-md bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] hover:border-blue-600 dark:hover:border-[#f59e0b]/30 transition-all">
                  <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
                </a>
              </div>
              <a
                href="#experience"
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-600 dark:bg-[#f59e0b] text-white dark:text-[#0c0a09] font-medium rounded-md hover:bg-blue-700 dark:hover:bg-[#d97706] transition-colors text-[10px] sm:text-sm w-[100px] sm:w-[140px] text-center"
              >
                View My Work
              </a>
              <a
                href="#projects"
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-blue-600 dark:text-[#f59e0b] font-medium rounded-md hover:border-blue-600 dark:hover:border-[#f59e0b]/50 hover:bg-slate-300 dark:hover:bg-[#f59e0b]/5 transition-colors text-[10px] sm:text-sm w-[100px] sm:w-[140px] text-center"
              >
                See Projects
              </a>
            </motion.div>
          </div>

          {/* Roles */}
          <motion.div variants={itemVariants} className="flex flex-row flex-wrap items-center gap-3 mb-10 w-full">
            <div className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-[#1c1917] border border-blue-600 dark:border-[#f97316]/40 shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)] font-mono text-xs text-slate-600 dark:text-[#a8a29e] whitespace-nowrap hover:border-blue-600 dark:hover:border-[#f97316]/60 transition-colors">
              <span className="text-blue-600 dark:text-[#f97316] font-bold">AI Security Engineer</span> • micro1
            </div>
            <div className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-[#1c1917] border border-blue-600 dark:border-[#f97316]/40 shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)] font-mono text-xs text-slate-600 dark:text-[#a8a29e] whitespace-nowrap hover:border-blue-600 dark:hover:border-[#f97316]/60 transition-colors">
              <span className="text-blue-600 dark:text-[#f97316] font-bold">Cloud Security Engineer</span> • Microsoft SP:TT
            </div>
            <div className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-[#1c1917] border border-blue-600 dark:border-[#f97316]/40 shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)] font-mono text-xs text-slate-600 dark:text-[#a8a29e] whitespace-nowrap hover:border-blue-600 dark:hover:border-[#f97316]/60 transition-colors">
              <span className="text-blue-600 dark:text-[#f97316] font-bold">Founder</span> • Silicon Barracks
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div variants={itemVariants} className="w-full mb-10">
            <div className="bg-slate-200 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#333333] rounded-xl overflow-hidden shadow-2xl relative">
              {/* Terminal Header */}
              <div className="bg-slate-300 dark:bg-[#2d2d2d] px-4 py-2.5 flex items-center justify-center border-b border-slate-200 dark:border-[#333333] relative">
                <div className="flex gap-1.5 absolute left-4">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="font-mono text-[13px] text-slate-600 dark:text-[#a8a29e] opacity-80">
                  austin@about-me:~
                </div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed text-slate-600 dark:text-[#a8a29e] space-y-4 relative">
                <p className="text-[0.85rem] italic text-slate-500 dark:text-[#78716c] border-l-2 border-blue-500 dark:border-[#f59e0b]/60 pl-3 leading-relaxed tracking-wide">
                  "Security is a human problem dressed in technical clothing. That belief shapes everything I do. My work lives where technical complexity meets real world consequence."
                </p>
                <p>
                  I am a Security Engineer with expertise across Infrastructure & System Architecture, Threat Intelligence, Digital Forensics, Offensive Security, and Governance, Risk, and Compliance which I am currently extending on secure AI Systems and Robust Machine Learning workflows in adversarial contexts. I have advised clients across the US, UK, Canada, Europe, Australia, and the Philippines, working with MSPs, Consulting Firms, BPOs, and critical sectors where failures are consequential: Healthcare, Finance, Energy Grids, and Defense.
                </p>
                <p>
                  I hold 30+ certifications from the world's top vendors and I am currently completing an MSc in Cybersecurity and a Postgraduate in Governance, Risk and Compliance, while finishing DataCamp's platforms on a full scholarship grant.
                </p>
                <p>
                  My background in the humanities is not incidental. It is the reason I can translate complexity into clarity and technical risk into decisions that leadership can act on. The best engineers are also rigorous thinkers and sharp communicators, and that is the standard I hold myself to.
                </p>
                <p className="text-emerald-600 dark:text-[#10b981] font-medium">
                  Open to roles in but not limited to: Security Engineering, Enterprise Architecture (Networks & Systems), Full-Stack Development, Digital Forensics and Threat Intelligence globally.<motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-2 h-4 bg-emerald-600 dark:bg-[#10b981] ml-1 align-middle translate-y-[-1px]"
                  />
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 w-full">
            {statDetails.map((stat, i) => {
              const isActive = activeStatDetail === i;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-slate-200 dark:bg-[#1c1917] border transition-all duration-300 group cursor-pointer select-none overflow-hidden
                    ${isActive
                      ? 'border-blue-500 dark:border-[#f59e0b]/70 shadow-[0_0_30px_rgba(29,78,216,0.35)] dark:shadow-[0_0_30px_rgba(234,88,12,0.35)]'
                      : 'border-slate-300 dark:border-[#292524] shadow-[0_0_20px_rgba(29,78,216,0.15)] dark:shadow-[0_0_20px_rgba(234,88,12,0.15)] hover:shadow-[0_0_30px_rgba(29,78,216,0.3)] dark:hover:shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:border-blue-500 dark:hover:border-[#f59e0b]/60'
                    }`}
                  onClick={() => setActiveStatDetail(isActive ? null : i)}
                >
                  {/* Card content — blurs when active */}
                  <div className={`flex flex-col items-center transition-all duration-300 ${isActive ? 'blur-sm opacity-20 pointer-events-none' : ''}`}>
                    <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-black text-slate-900 dark:text-[#f3f4f6] group-hover:text-blue-700 dark:group-hover:text-[#ea580c] transition-colors">
                      <CountUp end={stat.value} duration={2.5} />{stat.suffix}
                    </span>
                    <span className="font-body text-sm text-slate-600 dark:text-[#a8a29e] mt-2">{stat.label}</span>
                    {/* Centered hover hint */}
                    <span className="mt-3 text-[10px] font-mono tracking-wide text-blue-500 dark:text-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      View more details
                    </span>
                  </div>

                  {/* Overlay detail panel — fills the card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 z-10 flex flex-col p-4 rounded-2xl bg-slate-100/90 dark:bg-[#1c1917]/95 backdrop-blur-sm"
                        onClick={e => e.stopPropagation()}
                      >
                        {/* X close */}
                        <button
                          onClick={() => setActiveStatDetail(null)}
                          className="absolute top-2.5 right-3 text-slate-500 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] transition-colors text-sm font-bold leading-none"
                        >
                          ✕
                        </button>

                        {/* Label */}
                        <p className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-[#f59e0b] mb-2.5 mt-0.5">{stat.label}</p>

                        {/* List */}
                        <ul className="space-y-1.5 overflow-y-auto flex-1">
                          {stat.items.map((item, j) => (
                            <li key={j} className="flex flex-col text-left">
                              <span className="text-[11px] font-semibold text-slate-800 dark:text-[#f3f4f6] leading-tight">{item.label}</span>
                              {item.sub && <span className="text-[10px] text-slate-500 dark:text-[#78716c] leading-tight">{item.sub}</span>}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Marquee Strip */}
          <motion.div 
            variants={itemVariants} 
            className="w-[110%] -left-[5%] relative overflow-hidden group mb-12 py-5 border-y border-blue-600/80 dark:border-orange-950 shadow-[0_0_15px_rgba(37,99,235,0.2)] dark:shadow-[0_0_20px_rgba(67,20,7,0.5)] bg-slate-200 dark:bg-[#1e1e1e]"
            style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            <style>{`
              @keyframes scroll-left {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .animate-marquee {
                animation: scroll-left 45s linear infinite;
              }
              .group:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}</style>

            <div className="flex w-max animate-marquee items-center gap-4">
              {[...marqueeLogos, ...marqueeLogos].map((logo, index) => {
                const needsWhiteBg = logo.name === 'Fortinet' || logo.name === 'Qualys' || logo.name === 'Amazon AWS';
                return (
                  <div key={index} className={`flex-none flex items-center justify-center ${needsWhiteBg ? 'px-2 sm:px-4 mx-2 sm:mx-4' : 'px-4 sm:px-8'}`}>
                    <div className={`transition-all duration-300 flex items-center justify-center ${needsWhiteBg ? 'dark:bg-slate-200/80 dark:px-4 dark:py-2.5 dark:rounded-xl dark:shadow-sm backdrop-blur-sm hover:scale-105' : ''}`}>
                      <img
                        src={logo.url}
                        alt={logo.name}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          if (target.parentElement && target.parentElement.parentElement) {
                            target.parentElement.parentElement.style.display = 'none';
                          }
                        }}
                        className={`object-contain w-auto opacity-75 transition-all duration-300 hover:opacity-100 ${needsWhiteBg ? '' : 'hover:scale-[1.15]'}
                          ${logo.name === 'NASA' ? 'h-14 sm:h-[4.5rem] scale-110' : 'h-10 sm:h-12'}
                        `}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Notable Achievements Grid */}
          <motion.div variants={itemVariants} className="w-full mb-10">
            <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-widest text-slate-700 dark:text-[#a8a29e] mb-4">Notable Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: GraduationCap, title: 'GWA 1.05 / 4.0 GPA', sub: 'BS Information Technology, Major in Network Administration Holy Angel University', desc: 'Graduated with a GWA of 1.05 (Philippine grading scale, where 1.0 is highest). US equivalent: 4.0 GPA / Summa Cum Laude — the highest academic distinction.' },
                { icon: Trophy, title: 'Class Valedictorian', sub: 'Humanities & Social Sciences, Hillcrest Heights Institute', desc: 'Ranked 1st in the graduating class, delivering the valedictory address and leading the student body.' },
                { icon: GraduationCap, title: 'Master of Sciences in Cybersecurity', sub: 'Holy Angel University', desc: 'Currently advancing expertise in network defense, cryptography, and enterprise security management.' },
                { icon: Shield, title: 'CySA+, CSAP, Sec+', sub: 'CompTIA', desc: 'Certified in cybersecurity analytics, foundational security principles, and advanced security practices.' },
                { icon: Network, title: 'CCNP ENCOR, CCNA', sub: 'Cisco', desc: 'Cisco certified in enterprise network core technologies, routing, switching, and network fundamentals.' },
                { icon: Cloud, title: 'AWS Solutions Architect', sub: 'Amazon Web Services', desc: 'Certified in designing distributed systems and deploying highly secure, scalable applications on AWS.' },
                { icon: Trophy, title: 'NASA Open Science Certified', sub: '', desc: 'Certified by NASA in Open Science principles, promoting transparency, accessibility, and collaboration in scientific research.' },
                { icon: BookOpen, title: 'Full Scholarship in DataCamp & Inegben', sub: '', desc: 'Recipient of a full scholarship grant for DataCamp and Inegben platforms, mastering data science, AI, and cybersecurity domains.' },
              ].map((item, i) => {
                const isActive = activeAchievement === item.title;
                return (
                  <motion.div
                    layout
                    key={i}
                    onMouseEnter={() => window.innerWidth >= 1024 && setActiveAchievement(item.title)}
                    onMouseLeave={() => window.innerWidth >= 1024 && setActiveAchievement(null)}
                    onClick={() => setActiveAchievement(activeAchievement === item.title ? null : item.title)}
                    className={`group p-4 rounded-xl bg-slate-200 dark:bg-[#1c1917] border ${isActive ? 'border-blue-600 dark:border-[#f59e0b]' : 'border-slate-300 dark:border-[#292524]'} flex flex-col gap-3 lg:hover:border-blue-600 dark:lg:hover:border-[#f59e0b]/50 transition-colors cursor-pointer relative overflow-hidden`}
                  >
                    <motion.div layout className="flex items-start gap-3">
                      <item.icon className="text-blue-600 dark:text-[#f59e0b] shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                      <div className="flex flex-col gap-1.5">
                        <div className="text-slate-900 dark:text-[#f3f4f6] font-medium text-sm leading-snug transition-colors group-hover:text-blue-600 dark:group-hover:text-[#f59e0b]">{item.title}</div>
                        {item.sub && <div className="text-slate-600 dark:text-[#a8a29e] text-xs leading-snug transition-colors group-hover:text-blue-500 dark:group-hover:text-[#f59e0b]/70">{item.sub}</div>}
                      </div>
                    </motion.div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-slate-600 dark:text-[#a8a29e] text-xs leading-relaxed pt-2 border-t border-slate-300 dark:border-[#292524]"
                        >
                          {item.desc}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>



        </motion.div>
      </div>
    </section>
  );
}
