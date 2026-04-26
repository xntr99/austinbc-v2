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
  { name: 'Certifications', href: '#certifications', icon: Award },
  { name: 'Education', href: '#education', icon: GraduationCap },
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
        <div className="navbar-container">
          
          {/* Left: Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, '#home')}
            className="navbar-logo group"
          >
            <span className="font-display font-bold whitespace-nowrap tracking-tight text-slate-900 dark:text-[#f3f4f6] group-hover:text-blue-600 dark:group-hover:text-[#f59e0b] opacity-90 transition-all duration-300">
              Austin BC
            </span>
          </a>

          {/* Center: Nav Tabs — visible on tablet+ (>=640px), proportionally scaled */}
          <div className="navbar-links">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              const v = navColorVariants[index % 6];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={twMerge(
                    "navbar-link",
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
          </div>

          {/* Right: World Clock + Theme + Hamburger */}
          <div className="navbar-actions">
            <WorldClock />

            <div className="navbar-actions-btns">
              <button 
                onClick={toggleTheme}
                className="navbar-theme-btn"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="navbar-icon" /> : <Moon className="navbar-icon" />}
              </button>
              
              {/* Hamburger: only visible on phones (<640px) */}
              <button
                className="navbar-hamburger"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="navbar-icon" /> : <Menu className="navbar-icon" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown — only for phones */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="navbar-mobile-menu"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
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
