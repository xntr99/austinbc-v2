import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-slate-300 dark:border-[#292524] bg-slate-100 dark:bg-[#0c0a09] z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="font-display font-bold text-2xl text-slate-900 dark:text-[#f3f4f6] mb-2">Austin BC</span>
          <span className="font-mono text-xs text-slate-600 dark:text-[#a8a29e]">
            &copy; {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://linkedin.com/in/batulaustin" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:text-[#f59e0b] transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/xntr99" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:text-[#f97316] transition-colors">
            <Github size={24} />
          </a>
          <a href="mailto:batulaustin.work@gmail.com" className="text-slate-600 dark:text-[#a8a29e] hover:text-[#ef4444] transition-colors">
            <Mail size={24} />
          </a>
        </div>

      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-full text-slate-600 dark:text-[#a8a29e] hover:text-blue-600 dark:text-[#f59e0b] hover:border-blue-600 dark:border-blue-600/50 dark:border-[#f59e0b]/50 hover:bg-white/5 transition-all duration-300 z-50 group"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </motion.button>
    </footer>
  );
}
