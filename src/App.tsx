/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CanvasBackground from './components/CanvasBackground';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Setup intersection observers for scroll spy
  const { ref: homeRef, inView: homeInView } = useInView({ threshold: 0.5 });
  const { ref: expRef, inView: expInView } = useInView({ threshold: 0.2 });
  const { ref: projRef, inView: projInView } = useInView({ threshold: 0.2 });
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.2 });
  const { ref: certsRef, inView: certsInView } = useInView({ threshold: 0.2 });
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (homeInView) setActiveSection('home');
    else if (expInView) setActiveSection('experience');
    else if (projInView) setActiveSection('projects');
    else if (skillsInView) setActiveSection('skills');
    else if (certsInView) setActiveSection('certifications');
    else if (contactInView) setActiveSection('contact');
  }, [homeInView, expInView, projInView, skillsInView, certsInView, contactInView]);

  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-[#0c0a09] text-slate-800 dark:text-[#a8a29e] font-body selection:bg-blue-600/30 selection:text-black dark:selection:bg-[#f59e0b]/30 dark:selection:text-[#F0EEE9]">
      {/* Global Backgrounds */}
      <CanvasBackground />
      <div className="scanlines" />

      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <div ref={homeRef} id="home-section">
          <Hero />
        </div>
        <div ref={expRef} id="experience-section">
          <Experience />
        </div>
        <div ref={projRef} id="projects-section">
          <Projects />
        </div>
        <div ref={skillsRef} id="skills-section">
          <Skills />
        </div>
        <div ref={certsRef} id="certifications-section">
          <Certifications />
        </div>
        <div ref={contactRef} id="contact-section">
          <Contact />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

