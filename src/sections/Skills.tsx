import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as SimpleIcons from 'simple-icons';
import { Shield, Lock, Network, Server, Cloud, Cpu, Code, Wrench, Database, Terminal } from 'lucide-react';

// Helper to get SimpleIcon SVG path
const getIconPath = (slug: string) => {
  const icon = (SimpleIcons as any)[`si${slug.charAt(0).toUpperCase() + slug.slice(1)}`];
  return icon ? icon.path : null;
};

const skillCategories = [
  {
    title: 'Security and GRC',
    icon: Shield,
    skills: [
      { name: 'Firewall Configuration', icon: Shield, desc: 'Configuring and managing network firewalls for traffic filtering.' },
      { name: 'Active Directory Security', icon: Lock, desc: 'Securing AD environments against credential theft and privilege escalation.' },
      { name: 'Access Controls', icon: Lock, desc: 'Implementing RBAC, ABAC, and zero-trust access models.' },
      { name: 'Encryption', icon: Lock, desc: 'Data at rest and in transit encryption protocols and key management.' },
      { name: 'SIEM', icon: Shield, desc: 'Security Information and Event Management for log aggregation and analysis.' },
      { name: 'SOAR', icon: Shield, desc: 'Security Orchestration, Automation, and Response for incident handling.' },
      { name: 'IPS', icon: Shield, desc: 'Intrusion Prevention Systems for real-time threat blocking.' },
      { name: 'EDR', icon: Shield, desc: 'Endpoint Detection and Response for host-level threat visibility.' },
      { name: 'Email Security', icon: Shield, desc: 'Protecting email gateways against phishing, malware, and spam.' },
      { name: 'Threat Intelligence', icon: Shield, desc: 'Gathering and analyzing data about potential cyber threats.' },
      { name: 'Incident Response', icon: Shield, desc: 'Methodical approach to managing and resolving security breaches.' },
      { name: 'Penetration Testing', icon: Shield, desc: 'Simulated cyberattacks to identify exploitable vulnerabilities.' },
      { name: 'Vulnerability Assessment', icon: Shield, desc: 'Systematic review of security weaknesses in an information system.' },
      { name: 'Malware Analysis', icon: Shield, desc: 'Dissecting malicious software to understand its behavior and origin.' },
      { name: 'Packet Analysis', icon: Network, desc: 'Capturing and analyzing network traffic for troubleshooting and security.' },
      { name: 'Wireshark', icon: 'wireshark', desc: 'Network protocol analyzer for deep inspection of data traffic.' },
      { name: 'Telemetry Monitoring', icon: Server, desc: 'Collecting and analyzing system metrics for performance and security.' },
      { name: 'Risk Management', icon: Shield, desc: 'Identifying, evaluating, and mitigating risks to IT assets.' },
      { name: 'Business Compliance', icon: Shield, desc: 'Ensuring IT operations adhere to legal and regulatory standards.' },
      { name: 'OSINT', icon: Shield, desc: 'Open-Source Intelligence gathering for threat profiling.' },
      { name: 'NIST Framework', icon: Shield, desc: 'Adherence to the National Institute of Standards and Technology guidelines.' },
      { name: 'ISO 27001', icon: Shield, desc: 'International standard for information security management systems.' },
      { name: 'MITRE ATT&CK', icon: Shield, desc: 'Knowledge base of adversary tactics and techniques based on real-world observations.' }
    ]
  },
  {
    title: 'Cloud and Infrastructure',
    icon: Cloud,
    skills: [
      { name: 'Azure', icon: 'microsoftazure', desc: 'Microsoft cloud computing platform and services.' },
      { name: 'AWS', icon: 'amazonwebservices', desc: 'Amazon Web Services cloud computing platform.' },
      { name: 'Google Cloud Platform', icon: 'googlecloud', desc: 'Suite of cloud computing services by Google.' },
      { name: 'Microsoft 365', icon: 'microsoft365', desc: 'Cloud-based productivity suite and identity management.' },
      { name: 'Exchange', icon: 'microsoftexchange', desc: 'Email and calendaring server developed by Microsoft.' },
      { name: 'SharePoint', icon: 'microsoftsharepoint', desc: 'Web-based collaborative platform integrated with Microsoft Office.' },
      { name: 'Windows Server', icon: 'windows', desc: 'Group of operating systems designed by Microsoft that supports enterprise-level management.' },
      { name: 'Linux Systems', icon: 'linux', desc: 'Open-source Unix-like operating systems.' },
      { name: 'Hypervisors', icon: Server, desc: 'Software that creates and runs virtual machines.' },
      { name: 'Infrastructure Deployment', icon: Server, desc: 'Provisioning and configuring IT infrastructure components.' },
      { name: 'Cloud Migration', icon: Cloud, desc: 'Moving digital assets, services, databases, and applications to the cloud.' },
      { name: 'Backup and Recovery', icon: Database, desc: 'Creating copies of data to protect against data loss.' },
      { name: 'Veeam', icon: 'veeam', desc: 'Backup, disaster recovery and intelligent data management software.' },
      { name: 'EC2', icon: 'amazonec2', desc: 'Amazon Elastic Compute Cloud for scalable computing capacity.' },
      { name: 'S3', icon: 'amazons3', desc: 'Amazon Simple Storage Service for object storage.' },
      { name: 'RDS', icon: 'amazonrds', desc: 'Amazon Relational Database Service.' },
      { name: 'VPC', icon: Cloud, desc: 'Virtual Private Cloud for isolated cloud resources.' },
      { name: 'Elastic Stack', icon: 'elastic', desc: 'Group of open source products for search, analysis, and visualization.' }
    ]
  },
  {
    title: 'Networking',
    icon: Network,
    skills: [
      { name: 'Subnetting', icon: Network, desc: 'Dividing a network into two or more networks.' },
      { name: 'Routing', icon: Network, desc: 'Selecting a path for traffic in a network or between or across multiple networks.' },
      { name: 'Switching', icon: Network, desc: 'Connecting devices together on a computer network.' },
      { name: 'Network Architecture Design', icon: Network, desc: 'Designing the layout and structure of a computer network.' },
      { name: 'Cisco Infrastructure', icon: 'cisco', desc: 'Networking hardware, software, and telecommunications equipment.' },
      { name: 'Meraki', icon: 'cisco', desc: 'Cloud-managed IT solutions from Cisco.' },
      { name: 'VLAN', icon: Network, desc: 'Virtual Local Area Network for broadcast domain segmentation.' },
      { name: 'LACP', icon: Network, desc: 'Link Aggregation Control Protocol for bundling multiple physical ports.' },
      { name: 'OSPF', icon: Network, desc: 'Open Shortest Path First routing protocol.' },
      { name: 'EIGRP', icon: Network, desc: 'Enhanced Interior Gateway Routing Protocol.' },
      { name: 'ACL', icon: Shield, desc: 'Access Control Lists for network traffic filtering.' },
      { name: 'NAT/PAT', icon: Network, desc: 'Network Address Translation and Port Address Translation.' },
      { name: 'STP', icon: Network, desc: 'Spanning Tree Protocol to prevent loop in network topology.' },
      { name: 'EtherChannel', icon: Network, desc: 'Port link aggregation technology.' },
      { name: 'HSRP', icon: Network, desc: 'Hot Standby Router Protocol for default gateway redundancy.' },
      { name: 'DHCP', icon: Network, desc: 'Dynamic Host Configuration Protocol for IP address assignment.' },
      { name: 'VPN', icon: Lock, desc: 'Virtual Private Network for secure remote access.' },
      { name: 'VoIP', icon: Network, desc: 'Voice over Internet Protocol for voice communications.' },
      { name: 'Load Balancing', icon: Network, desc: 'Distributing network traffic across multiple servers.' }
    ]
  },
  {
    title: 'AI Utilization and Automation',
    icon: Cpu,
    skills: [
      { name: 'AI Agents', icon: Cpu, desc: 'Autonomous systems that perceive their environment and take actions.' },
      { name: 'Workflow Automation', icon: Cpu, desc: 'Automating complex business processes and IT tasks.' },
      { name: 'Prompt Engineering', icon: Code, desc: 'Designing and optimizing prompts for large language models.' },
      { name: 'n8n', icon: 'n8n', desc: 'Fair-code workflow automation tool.' },
      { name: 'Zapier', icon: 'zapier', desc: 'Web-based service that allows end users to integrate the web applications they use.' },
      { name: 'OpenAI', icon: 'openai', desc: 'AI research and deployment company.' },
      { name: 'GPT', icon: 'openai', desc: 'Generative Pre-trained Transformer models.' },
      { name: 'Claude', icon: 'anthropic', desc: 'AI assistant created by Anthropic.' },
      { name: 'Gemini', icon: 'google', desc: 'Multimodal AI model developed by Google.' },
      { name: 'Llama', icon: 'meta', desc: 'Large language model developed by Meta.' },
      { name: 'Copilot', icon: 'github', desc: 'AI pair programmer.' },
      { name: 'Perplexity', icon: 'perplexity', desc: 'AI-powered search engine.' },
      { name: 'Cursor', icon: Code, desc: 'AI-first code editor.' },
      { name: 'Replit', icon: 'replit', desc: 'Online collaborative IDE.' },
      { name: 'Antigravity', icon: Code, desc: 'AI coding harness.' },
      { name: 'Loveable', icon: Code, desc: 'AI development tool.' },
      { name: 'AI-assisted Development', icon: Code, desc: 'Using AI tools to accelerate software development.' },
      { name: 'APIs', icon: Code, desc: 'Application Programming Interfaces for software integration.' },
      { name: 'Webhooks', icon: Code, desc: 'User-defined HTTP callbacks.' }
    ]
  },
  {
    title: 'Enterprise Systems and Support Tools',
    icon: Wrench,
    skills: [
      { name: 'Splashtop', icon: Wrench, desc: 'Remote desktop software.' },
      { name: 'Datto RMM', icon: Wrench, desc: 'Remote monitoring and management platform.' },
      { name: 'N-Central', icon: Wrench, desc: 'IT service management software.' },
      { name: 'ConnectWise', icon: Wrench, desc: 'Business management software for IT solution providers.' },
      { name: 'TeamViewer', icon: 'teamviewer', desc: 'Remote control, desktop sharing, and file transfer software.' },
      { name: 'AnyDesk', icon: 'anydesk', desc: 'Remote desktop application.' },
      { name: 'LogMeIn', icon: Wrench, desc: 'Remote access and systems management software.' },
      { name: 'ServiceNow', icon: Wrench, desc: 'Cloud computing platform to help companies manage digital workflows.' },
      { name: 'Zendesk', icon: 'zendesk', desc: 'Customer service software and support ticketing system.' },
      { name: 'Jira', icon: 'jira', desc: 'Issue tracking and agile project management tool.' },
      { name: 'AutoTask', icon: Wrench, desc: 'Professional Services Automation software.' },
      { name: 'ConnectWise Manage', icon: Wrench, desc: 'Business management platform.' },
      { name: 'NinjaRMM', icon: Wrench, desc: 'Remote monitoring and management software.' },
      { name: 'IT Glue', icon: Wrench, desc: 'IT documentation software.' },
      { name: 'CLI Diagnostics', icon: Code, desc: 'Using command-line interfaces for system troubleshooting.' },
      { name: 'Group Policy Management', icon: Server, desc: 'Managing Windows Server Group Policy Objects.' },
      { name: 'Hardware and Software Troubleshooting', icon: Wrench, desc: 'Diagnosing and resolving IT issues.' },
      { name: 'System Diagnostics Tools', icon: Wrench, desc: 'Tools for analyzing system performance and health.' }
    ]
  },
  {
    title: 'Software Development',
    icon: Terminal,
    skills: [
      { name: 'PowerShell', icon: 'powershell', desc: 'Task automation and configuration management framework.' },
      { name: 'Python', icon: 'python', desc: 'High-level, general-purpose programming language.' },
      { name: 'Java', icon: 'java', desc: 'High-level, class-based, object-oriented programming language.' },
      { name: 'JavaScript', icon: 'javascript', desc: 'High-level, often just-in-time compiled language.' },
      { name: 'TypeScript', icon: 'typescript', desc: 'Strict syntactical superset of JavaScript.' },
      { name: 'SQL', icon: Database, desc: 'Domain-specific language used in programming and managing relational databases.' },
      { name: 'PHP', icon: 'php', desc: 'General-purpose scripting language geared toward web development.' },
      { name: 'HTML', icon: 'html5', desc: 'Standard markup language for documents designed to be displayed in a web browser.' },
      { name: 'CSS', icon: 'css3', desc: 'Style sheet language used for describing the presentation of a document written in HTML.' },
      { name: 'Dart', icon: 'dart', desc: 'Client-optimized language for fast apps on any platform.' },
      { name: 'Flutter', icon: 'flutter', desc: 'Open-source UI software development kit created by Google.' },
      { name: '.NET', icon: 'dotnet', desc: 'Free, cross-platform, open source developer platform.' },
      { name: 'React', icon: 'react', desc: 'Free and open-source front-end JavaScript library for building user interfaces.' },
      { name: 'Git', icon: 'git', desc: 'Distributed version control system.' }
    ]
  }
];

const skillVariants = [
  { text: "text-blue-600 dark:text-[#f59e0b]", hoverBorder: "group-hover:border-blue-600/50 dark:group-hover:border-[#f59e0b]/50", bg: "bg-blue-600 dark:bg-[#f59e0b]", activeBorder: "border-blue-600 dark:border-[#f59e0b]", activeShadow: "shadow-blue-600/10 dark:shadow-[#f59e0b]/10", hoverTextWhite: "group-hover:text-blue-600 dark:group-hover:text-white" },
  { text: "text-blue-700 dark:text-[#f97316]", hoverBorder: "group-hover:border-blue-700/50 dark:group-hover:border-[#f97316]/50", bg: "bg-blue-700 dark:bg-[#f97316]", activeBorder: "border-blue-700 dark:border-[#f97316]", activeShadow: "shadow-blue-700/10 dark:shadow-[#f97316]/10", hoverTextWhite: "group-hover:text-blue-700 dark:group-hover:text-white" },
  { text: "text-blue-500 dark:text-[#ef4444]", hoverBorder: "group-hover:border-blue-500/50 dark:group-hover:border-[#ef4444]/50", bg: "bg-blue-500 dark:bg-[#ef4444]", activeBorder: "border-blue-500 dark:border-[#ef4444]", activeShadow: "shadow-blue-500/10 dark:shadow-[#ef4444]/10", hoverTextWhite: "group-hover:text-blue-500 dark:group-hover:text-white" },
  { text: "text-blue-800 dark:text-[#fbbf24]", hoverBorder: "group-hover:border-blue-800/50 dark:group-hover:border-[#fbbf24]/50", bg: "bg-blue-800 dark:bg-[#fbbf24]", activeBorder: "border-blue-800 dark:border-[#fbbf24]", activeShadow: "shadow-blue-800/10 dark:shadow-[#fbbf24]/10", hoverTextWhite: "group-hover:text-blue-800 dark:group-hover:text-white" },
  { text: "text-blue-400 dark:text-[#f43f5e]", hoverBorder: "group-hover:border-blue-400/50 dark:group-hover:border-[#f43f5e]/50", bg: "bg-blue-400 dark:bg-[#f43f5e]", activeBorder: "border-blue-400 dark:border-[#f43f5e]", activeShadow: "shadow-blue-400/10 dark:shadow-[#f43f5e]/10", hoverTextWhite: "group-hover:text-blue-400 dark:group-hover:text-white" },
  { text: "text-blue-600 dark:text-[#ea580c]", hoverBorder: "group-hover:border-blue-600/50 dark:group-hover:border-[#ea580c]/50", bg: "bg-blue-600 dark:bg-[#ea580c]", activeBorder: "border-blue-600 dark:border-[#ea580c]", activeShadow: "shadow-blue-600/10 dark:shadow-[#ea580c]/10", hoverTextWhite: "group-hover:text-blue-600 dark:group-hover:text-white" }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<typeof skillCategories[0] | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="min-h-screen relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-blue-600 dark:text-[#f59e0b] mb-4">
            Core Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444]" />
        </motion.div>

        {/* 3x2 Grid for Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            const v = skillVariants[catIndex % 6];
            const isHovered = hoveredCategory === category.title;

            return (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer h-64"
                onMouseEnter={() => setHoveredCategory(category.title)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setSelectedCategory(category)}
              >
                {/* Card Background with Glow */}
                <div 
                  className={`absolute inset-0 bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-2xl transition-all duration-500 ${v.hoverBorder}`}
                />
                
                {/* Glow Effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl ${v.bg}`}
                />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col items-center justify-center text-center">
                  <div 
                    className={`mb-6 p-4 rounded-2xl bg-slate-300 dark:bg-[#292524]/50 transition-transform duration-500 group-hover:scale-110 ${v.text}`}
                  >
                    <CategoryIcon size={48} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-[#f3f4f6] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 dark:text-[#a8a29e] text-sm font-mono">
                    {category.skills.length} Specialized Skills
                  </p>
                  
                  {/* Hover Indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className={`text-xs font-bold uppercase tracking-widest ${v.text}`}>
                      View Details
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-300 dark:border-[#292524] flex items-center justify-between bg-slate-100/90 dark:bg-[#1c1917]/90 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div 
                    className={`p-3 rounded-xl bg-slate-300 dark:bg-[#292524]/50 ${skillVariants[skillCategories.indexOf(selectedCategory) % 6].text}`}
                  >
                    <selectedCategory.icon size={32} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                      {selectedCategory.title}
                    </h3>
                    <p className="text-slate-600 dark:text-[#a8a29e] text-sm font-mono">
                      {selectedCategory.skills.length} Technical Proficiencies
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 hover:bg-slate-300 dark:hover:bg-white/10 rounded-full transition-colors text-slate-600 dark:text-[#a8a29e] hover:text-slate-900 dark:hover:text-white"
                >
                  <Wrench size={24} className="rotate-45" />
                </button>
              </div>

              {/* Modal Body - Skills Grid */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.skills.map((skill, skillIndex) => {
                    const isSimpleIcon = typeof skill.icon === 'string';
                    const IconComponent = !isSimpleIcon ? skill.icon : null;
                    const svgPath = isSimpleIcon ? getIconPath(skill.icon as string) : null;
                    const v = skillVariants[skillCategories.indexOf(selectedCategory) % 6];
                    const isActive = activeSkill === skill.name;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: skillIndex * 0.05 }}
                        className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                          isActive 
                            ? `bg-slate-300 dark:bg-[#292524] ${v.activeBorder} lg:scale-[1.02] shadow-lg ${v.activeShadow}` 
                            : 'bg-slate-200 dark:bg-[#1c1917] border-slate-300 dark:border-[#292524] hover:border-slate-500 hover:dark:border-white/20'
                        }`}
                        onClick={() => setActiveSkill(isActive ? null : skill.name)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className={`w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#292524]/50 transition-colors ${
                              isActive ? v.text : `text-slate-600 dark:text-[#a8a29e] ${v.hoverTextWhite}`
                            }`}
                          >
                            {isSimpleIcon && svgPath ? (
                              <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d={svgPath} />
                              </svg>
                            ) : IconComponent ? (
                              <IconComponent size={20} />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-current" />
                            )}
                          </div>
                          <span className={`font-bold text-sm transition-colors ${
                            isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-[#d1d5db]'
                          }`}>
                            {skill.name}
                          </span>
                        </div>
                        
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="text-xs text-slate-600 dark:text-[#a8a29e] leading-relaxed mt-2"
                            >
                              {skill.desc}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
