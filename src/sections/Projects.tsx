import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: '1',
    title: 'Reverse Engineering and Malware Behavioral Analysis',
    category: 'Security Research',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    description: 'Static analysis of Windows binaries using Ghidra and x64dbg to inspect execution flow and API calls. Dynamic analysis in isolated Windows VM observing process activity, registry changes, and network traffic.',
    tags: ['Ghidra', 'x64dbg', 'Windows', 'Malware Analysis'],
    icons: ['siGhidra', 'siWindows']
  },
  {
    id: '2',
    title: 'Security Automation and SOAR Workflow Engineering',
    category: 'Detection Engineering',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    description: 'Setting up Windows 10, Sysmon, Wazuh for monitoring, TheHive for case management, and SOAR. Automating SOC operations and custom alerts with Mimikatz telemetry.',
    tags: ['Wazuh', 'TheHive', 'Sysmon', 'SOAR', 'Mimikatz'],
    icons: ['siElastic', 'siWindows']
  },
  {
    id: '3',
    title: 'AI-Assisted Security Automation and Incident Analysis',
    category: 'AI Security',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    description: 'Python scripts using OpenAI API and n8n workflows to summarize and classify security logs. Automated alert triage generating structured incident summaries from sample SIEM events.',
    tags: ['Python', 'OpenAI', 'n8n', 'SIEM'],
    icons: ['siPython', 'siOpenai', 'siN8n']
  },
  {
    id: '4',
    title: 'Cloud Security Misconfiguration and Attack Path Analysis',
    category: 'Cloud Security',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    description: 'Deployed AWS and Azure lab environments to study IAM permissions and exposed storage services. Used open-source cloud assessment tools to identify misconfigurations and privilege escalation paths.',
    tags: ['AWS', 'Azure', 'IAM', 'Cloud Security'],
    icons: ['siAmazonwebservices', 'siMicrosoftazure']
  },
  {
    id: '5',
    title: 'Active Directory Security and Attack Simulation',
    category: 'Security Research',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    description: 'Active Directory on Windows Server 2022 with Windows 10 attack machine. Kali Linux for credential attack simulation and security testing. Splunk on Ubuntu for log analysis.',
    tags: ['Active Directory', 'Kali Linux', 'Splunk', 'Windows Server'],
    icons: ['siKalilinux', 'siSplunk', 'siWindows']
  },
  {
    id: '6',
    title: 'SIEM Deployment and Security Log Analysis',
    category: 'Detection Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    description: 'Elastic platform as SIEM, Elastic Agent on Kali VM for log collection. Generated and analyzed security events, customized dashboards and alerts.',
    tags: ['Elastic', 'Kibana', 'Kali Linux', 'Log Analysis'],
    icons: ['siElastic', 'siKibana', 'siKalilinux']
  },
  {
    id: '7',
    title: 'Security Monitoring and Detection Engineering Systems',
    category: 'Detection Engineering',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    description: 'Setting up VMware with pfSense, Security Onion for IDS, Splunk for analysis. Configuring Windows Server, desktops, and Kali Linux attack machine.',
    tags: ['pfSense', 'Security Onion', 'Splunk', 'VMware'],
    icons: ['siPfsense', 'siSplunk', 'siVmware']
  },
  {
    id: '8',
    title: 'Mesh Network Infrastructure for Surveillance Systems',
    category: 'Network Architecture',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
    description: 'Wireless mesh network with PtMP bridges, L3 Switches, Mesh Nodes, APs, IP Cameras, and NVR. Enhanced surveillance for Brgy. Camias, Pampanga.',
    tags: ['Mesh Network', 'PtMP', 'L3 Switches', 'IP Cameras', 'NVR'],
    icons: ['siUbiquiti']
  },
  {
    id: '9',
    title: 'Enterprise Network Architecture and Security Design',
    category: 'Network Architecture',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=800&auto=format&fit=crop',
    description: 'Cisco ASA Firewalls, WLC, AWS integration, ISPs. VLANs, STP PortFast, BPDUGuard, AD DHCP, Cisco Voice Gateways, IP Phones. Configured ACLs, firewall zones, NAT, OSPF, HSRP, LACP EtherChannel.',
    tags: ['Cisco', 'VLAN', 'OSPF', 'HSRP', 'LACP'],
    icons: ['siCisco']
  },
  {
    id: '10',
    title: 'Enterprise Security Governance and Policy Framework Design',
    category: 'Governance',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    description: 'Developed sample information security policies and control frameworks aligned with NIST CSF and ISO 27001. Created security governance documentation including risk registers, control mapping, and compliance checklists.',
    tags: ['NIST CSF', 'ISO 27001', 'GRC', 'Policy Framework'],
    icons: []
  }
];

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

const getCategoryStyles = (category: string) => {
  // Clean, neutral theme for categories
  return {
    text: 'text-slate-700 dark:text-[#d1d5db]',
    bg: 'bg-slate-300 dark:bg-[#374151]/30',
    border: 'border-slate-400 dark:border-[#4b5563]/50',
    cardBorder: 'border-blue-500 dark:border-[#6b7280]',
    activeBg: 'bg-blue-600 dark:bg-[#e5e7eb]',
    activeText: 'text-white dark:text-[#1c1917]',
    shadow: 'shadow-[0_0_15px_rgba(37,99,235,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
    hoverBorder: 'hover:border-blue-400 dark:hover:border-[#9ca3af]/50',
    hoverText: 'group-hover:text-blue-600 dark:group-hover:text-[#f3f4f6]',
    buttonHoverText: 'hover:text-blue-600 dark:hover:text-[#f3f4f6]'
  };
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(project => filter === 'All' || project.category === filter);

  return (
    <section id="projects" className="min-h-screen relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-blue-600 dark:text-[#f59e0b] mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => {
            const styles = getCategoryStyles(category);
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                  filter === category
                    ? `${styles.activeBg} ${styles.activeText} ${styles.shadow}`
                    : `bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] text-slate-600 dark:text-[#a8a29e] ${styles.hoverBorder} ${styles.buttonHoverText}`
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`group relative bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] rounded-xl overflow-hidden cursor-pointer ${getCategoryStyles(project.category).hoverBorder} transition-all duration-500 flex flex-col h-auto min-h-[320px] sm:h-[400px]`}
                onClick={() => setSelectedProject(project)}
              >
              {/* Image Container */}
              <div className="relative w-full h-[140px] sm:h-[220px] group-hover:h-[120px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden shrink-0">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`font-mono text-xs px-3 py-1.5 rounded backdrop-blur-sm border font-medium ${getCategoryStyles(project.category).bg} ${getCategoryStyles(project.category).text} ${getCategoryStyles(project.category).border}`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5 sm:p-6 flex flex-col flex-grow relative bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md z-10 transition-all duration-500">
                <h3 className={`font-heading text-[0.9rem] sm:text-xl font-bold text-slate-900 dark:text-[#f3f4f6] mb-2 sm:mb-4 transition-colors line-clamp-2 ${getCategoryStyles(project.category).hoverText}`}>
                  {project.title}
                </h3>
                
                {/* Tags Row - Always visible */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {project.tags.slice(0, 2).map((tag, i) => {
                    const colors = [
                      'text-slate-700 dark:text-[#d1d5db] border-slate-300 dark:border-[#4b5563]/50 bg-slate-300/50 dark:bg-[#374151]/30', 
                      'text-slate-600 dark:text-[#9ca3af] border-slate-300 dark:border-[#4b5563]/50 bg-slate-300/50 dark:bg-[#374151]/30', 
                      'text-slate-800 dark:text-[#e5e7eb] border-slate-300 dark:border-[#4b5563]/50 bg-slate-300/50 dark:bg-[#374151]/30'
                    ];
                    return (
                      <span key={tag} className={`font-mono text-[10px] px-2 py-1 rounded border ${colors[i % colors.length]}`}>
                        {tag}
                      </span>
                    );
                  })}
                  {project.tags.length > 3 && (
                    <span className="font-mono text-[10px] px-2 py-1 bg-slate-300 dark:bg-[#292524] text-slate-700 dark:text-[#a8a29e] rounded border border-slate-400 dark:border-[#44403c]">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Description - Hidden by default, reveals on hover */}
                <div className="grid grid-rows-[1fr] lg:grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
                  <div className="overflow-hidden">
                    <p className="text-slate-600 dark:text-[#a8a29e] text-xs sm:text-sm line-clamp-2 sm:line-clamp-4 mt-2 sm:mt-4 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* View Indicator */}
                <div className="mt-auto pt-4 flex items-center gap-2 font-mono text-xs text-slate-900 dark:text-[#f3f4f6] opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="lg:hidden">Tap to view</span>
                  <span className="hidden lg:inline">Click to view</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 border-2 opacity-0 group-hover:opacity-100 rounded-xl pointer-events-none transition-opacity duration-500 ${getCategoryStyles(project.category).cardBorder}`} />
            </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-[#0c0a09]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-4xl bg-slate-200/90 dark:bg-[#1c1917]/90 backdrop-blur-xl border border-slate-300 dark:border-[#292524] rounded-2xl overflow-hidden flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 text-slate-600 dark:text-[#a8a29e] hover:text-slate-900 dark:hover:text-[#f3f4f6] bg-slate-300 dark:bg-[#292524] rounded-full z-20 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="relative h-64 md:h-80 w-full shrink-0">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917] via-[#1c1917]/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className={`font-mono text-xs px-3 py-1.5 rounded inline-block mb-4 border font-medium ${getCategoryStyles(selectedProject.category).bg} ${getCategoryStyles(selectedProject.category).text} ${getCategoryStyles(selectedProject.category).border}`}>
                      {selectedProject.category}
                    </div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                  <div className="mb-8">
                    <h4 className="font-heading text-sm text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider mb-4">Project Overview</h4>
                    <p className="font-body text-base text-slate-700 dark:text-[#D1D5DB] leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-heading text-sm text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider mb-4">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, i) => {
                        const colors = [
                          'text-slate-700 dark:text-[#d1d5db] border-slate-400 dark:border-[#4b5563]/50 bg-slate-200 dark:bg-[#374151]/30', 
                          'text-slate-600 dark:text-[#9ca3af] border-slate-300 dark:border-[#4b5563]/50 bg-slate-200 dark:bg-[#374151]/30', 
                          'text-slate-800 dark:text-[#e5e7eb] border-slate-300 dark:border-[#4b5563]/50 bg-slate-200 dark:bg-[#374151]/30', 
                          'text-slate-900 dark:text-[#f3f4f6] border-slate-400 dark:border-[#4b5563]/50 bg-slate-200 dark:bg-[#374151]/30'
                        ];
                        return (
                          <span key={tag} className={`font-mono text-xs px-3 py-1.5 border rounded-md ${colors[i % colors.length]}`}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-6 border-t border-slate-300 dark:border-[#292524]">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-[#f59e0b] text-white dark:text-black font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-[#f59e0b]/90 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      <ExternalLink size={18} />
                      View Project
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-300 dark:bg-[#292524] text-slate-900 dark:text-[#f3f4f6] font-bold rounded-lg hover:bg-slate-400 dark:hover:bg-[#44403c] transition-colors border border-slate-400 dark:border-[#44403c]">
                      <Github size={18} />
                      Source Code
                    </button>
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
