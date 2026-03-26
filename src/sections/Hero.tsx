import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { Github, Linkedin, Mail, GraduationCap, Trophy, Shield, BookOpen, Network, Cloud, Cpu } from 'lucide-react';

export default function Hero() {
  const [activeAchievement, setActiveAchievement] = useState<string | null>(null);

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
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-slate-300 dark:border-[#292524] shadow-[0_0_30px_rgba(37,99,235,0.3)] dark:shadow-[0_0_30px_rgba(245,158,11,0.3)] relative group">
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
                  <div className="relative hidden sm:flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-blue-800/10 dark:bg-[#9a3412]/10 border border-blue-800/30 dark:border-[#9a3412]/30 shadow-[0_0_25px_rgba(30,64,175,0.4)] dark:shadow-[0_0_25px_rgba(154,52,18,0.4)] shrink-0">
                    <Shield className="text-blue-800 dark:text-[#9a3412] w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="font-display text-[clamp(2rem,6vw,5rem)] leading-[0.9] tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444] drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] truncate">
                    Austin BC
                  </h1>
                </motion.div>

                <motion.h2 
                  variants={itemVariants}
                  className="font-body text-xs sm:text-lg md:text-xl text-slate-600 dark:text-[#a8a29e] line-clamp-2 sm:line-clamp-none"
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
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-600 dark:bg-[#f59e0b] text-[#0c0a09] font-medium rounded-md hover:bg-[#f3f4f6] transition-colors text-[10px] sm:text-sm w-[100px] sm:w-[140px] text-center"
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
              <span className="text-blue-600 dark:text-[#f97316] font-bold">Cloud Security Engineer</span> • Trusted Tech
            </div>
            <div className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-[#1c1917] border border-blue-600 dark:border-[#f97316]/40 shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)] font-mono text-xs text-slate-600 dark:text-[#a8a29e] whitespace-nowrap hover:border-blue-600 dark:hover:border-[#f97316]/60 transition-colors">
              <span className="text-blue-600 dark:text-[#f97316] font-bold">Founder</span> • Silicon Barracks
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div variants={itemVariants} className="w-full mb-10">
            <div className="bg-slate-200 dark:bg-[#1e1e1e] border border-slate-200 dark:border-[#333333] rounded-xl overflow-hidden shadow-2xl relative">
              {/* Terminal Header */}
              <div className="bg-slate-300 dark:bg-[#2d2d2d] px-4 py-2.5 flex items-center gap-2 border-b border-slate-200 dark:border-[#333333]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 text-center font-mono text-xs text-slate-600 dark:text-[#a8a29e] opacity-80">
                  austin@security-engineer:~
                </div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm leading-relaxed text-slate-600 dark:text-[#a8a29e] space-y-4 relative">
                <p>
                  I am a Security Engineer working at the intersection of cloud infrastructure, enterprise networks, and system architecture which I am currently augmenting on AI Implications and Machine Learning. I have supported clients across USA, Canada, Europe, India, Australia, and Philippines, working across MSPs, Enterprises, BPOs, Consulting firms, and critical sectors such as Healthcare, Finance, Energy Grids, and Defense.
                </p>
                <p>
                  I am also about to finish my MSc in Cybersecurity and my Postgraduate in Governance, Risk, and Compliance along with DataCamp's entire platform with a Full-Scholarship Grant, all while holding 30+ industry-standard certifications with the top vendors in the globe. Despite a deep technical map, my roots are in the humanities. I believe the best engineers are also unique thinkers and strong communicators.
                </p>
                <p className="text-emerald-600 dark:text-[#10b981] font-medium">
                  Open to roles in but not limited to: Security Engineering, Enterprise Architecture (Networks & Systems), Full-Stack Development, Digital Forensics and Cyber Intelligence globally.<motion.span 
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
            {[
              { label: 'Years Experience', value: 5, suffix: '+' },
              { label: 'Countries Served', value: 6, suffix: '+' },
              { label: 'Certifications', value: 30, suffix: '+' },
              { label: 'Projects Done', value: 10, suffix: '' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] shadow-[0_0_20px_rgba(29,78,216,0.15)] dark:shadow-[0_0_20px_rgba(234,88,12,0.15)] hover:shadow-[0_0_30px_rgba(29,78,216,0.3)] dark:hover:shadow-[0_0_30px_rgba(234,88,12,0.3)] transition-all duration-300 group">
                <span className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-black text-slate-900 dark:text-[#f3f4f6] group-hover:text-blue-700 dark:group-hover:text-[#ea580c] transition-colors">
                  <CountUp end={stat.value} duration={2.5} />{stat.suffix}
                </span>
                <span className="font-body text-sm text-slate-600 dark:text-[#a8a29e] mt-2">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Notable Achievements Grid */}
          <motion.div variants={itemVariants} className="w-full mb-10">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-600 dark:text-[#a8a29e] mb-4">Notable Achievements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: GraduationCap, title: 'Summa Cum Laude', sub: 'BSIT, Holy Angel University', desc: 'Graduated with highest honors, demonstrating exceptional academic performance and dedication to the IT field.' },
                { icon: Trophy, title: 'Class Valedictorian', sub: 'Humanities & Social Sciences, Hillcrest Heights Institute', desc: 'Ranked 1st in the graduating class, delivering the valedictory address and leading the student body.' },
                { icon: GraduationCap, title: 'MSc Cybersecurity Candidate', sub: 'Holy Angel University', desc: 'Currently advancing expertise in network defense, cryptography, and enterprise security management.' },
                { icon: Shield, title: 'CySA+, CSAP, Sec+', sub: 'CompTIA', desc: 'Certified in cybersecurity analytics, foundational security principles, and advanced security practices.' },
                { icon: Network, title: 'CCNP ENCOR, CCNA', sub: 'Cisco', desc: 'Cisco certified in enterprise network core technologies, routing, switching, and network fundamentals.' },
                { icon: Cloud, title: 'AWS Solutions Architect', sub: '', desc: 'Certified in designing distributed systems and deploying highly secure, scalable applications on AWS.' },
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
                    className={`p-4 rounded-xl bg-slate-200 dark:bg-[#1c1917] border ${isActive ? 'border-blue-600 dark:border-[#f59e0b]' : 'border-slate-300 dark:border-[#292524]'} flex flex-col gap-3 lg:hover:border-blue-600 dark:lg:hover:border-[#f59e0b]/50 transition-colors cursor-pointer relative overflow-hidden`}
                  >
                    <motion.div layout className="flex items-start gap-3">
                      <item.icon className="text-blue-600 dark:text-[#f59e0b] shrink-0 mt-0.5" size={20} strokeWidth={1.5} />
                      <div className="flex flex-col gap-1.5">
                        <div className="text-slate-900 dark:text-[#f3f4f6] font-medium text-sm leading-snug">{item.title}</div>
                        {item.sub && <div className="text-slate-600 dark:text-[#a8a29e] text-xs leading-snug">{item.sub}</div>}
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
