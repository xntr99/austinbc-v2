import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Home, Briefcase, Code, Award, GraduationCap, Mail, Shield, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import WorldClock from './WorldClock';

const navLinks = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Projects', href: '#projects', icon: Code },
  { name: 'Skills', href: '#skills', icon: Award },
  { name: 'Certs & Education', href: '#certifications', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

const navColorVariants = [
  { text: "text-blue-600 dark:text-[#f59e0b]", bg: "bg-blue-600 dark:bg-[#f59e0b]", shadow: "shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(245,158,11,0.8)]" },
  { text: "text-blue-700 dark:text-[#f97316]", bg: "bg-blue-700 dark:bg-[#f97316]", shadow: "shadow-[0_0_8px_rgba(29,78,216,0.8)] dark:shadow-[0_0_8px_rgba(249,115,22,0.8)]" },
  { text: "text-blue-500 dark:text-[#ef4444]", bg: "bg-blue-500 dark:bg-[#ef4444]", shadow: "shadow-[0_0_8px_rgba(59,130,246,0.8)] dark:shadow-[0_0_8px_rgba(239,68,68,0.8)]" },
  { text: "text-blue-800 dark:text-[#fbbf24]", bg: "bg-blue-800 dark:bg-[#fbbf24]", shadow: "shadow-[0_0_8px_rgba(30,64,175,0.8)] dark:shadow-[0_0_8px_rgba(251,191,36,0.8)]" },
  { text: "text-blue-400 dark:text-[#f43f5e]", bg: "bg-blue-400 dark:bg-[#f43f5e]", shadow: "shadow-[0_0_8px_rgba(96,165,250,0.8)] dark:shadow-[0_0_8px_rgba(244,63,94,0.8)]" },
  { text: "text-blue-600 dark:text-[#ea580c]", bg: "bg-blue-600 dark:bg-[#ea580c]", shadow: "shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:shadow-[0_0_8px_rgba(234,88,12,0.8)]" }
];

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] to-blue-500 dark:to-[#ef4444] origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-[#0c0a09]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#292524] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-[#f3f4f6] group-hover:text-blue-600 dark:group-hover:text-[#f59e0b] opacity-[0.85] transition-all duration-300">
              Austin BC
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              const v = navColorVariants[index % 6];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={twMerge(
                    "font-heading text-sm uppercase tracking-wider transition-all duration-300 relative py-2",
                    isActive ? v.text : "text-slate-500 hover:text-slate-900 dark:text-[#a8a29e] dark:hover:text-[#f3f4f6]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${v.bg} ${v.shadow}`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <div className="pl-4 border-l border-slate-200 dark:border-[#292524] flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-[#a8a29e] dark:hover:bg-[#1c1917] transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <WorldClock />
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-[#a8a29e] dark:hover:bg-[#1c1917] transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-slate-900 dark:text-[#f3f4f6] p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="lg:hidden overflow-hidden bg-white/95 dark:bg-[#0c0a09]/95 backdrop-blur-xl border-b border-slate-200 dark:border-[#292524]"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="pb-4 mb-2 border-b border-slate-200 dark:border-[#292524] flex justify-center">
              <WorldClock />
            </div>
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              const v = navColorVariants[index % 6];
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={twMerge(
                    "font-heading text-lg flex items-center gap-3 py-2 transition-colors",
                    isActive ? v.text : "text-slate-500 dark:text-[#a8a29e]"
                  )}
                >
                  <Icon size={20} className={isActive ? v.text : "opacity-70 text-slate-500 dark:text-[#a8a29e]"} />
                  {link.name}
                </a>
              );
            })}
          </div>
        </motion.div>
      </nav>
    </>
  );
}
