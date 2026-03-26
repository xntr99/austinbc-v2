import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:batulaustin.work@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-black text-blue-600 dark:text-[#f59e0b] mb-4">
            Connect With Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 dark:from-[#f59e0b] via-blue-700 dark:via-[#ea580c] to-blue-500 dark:to-[#ef4444] mx-auto mb-6" />
          <p className="text-slate-600 dark:text-[#a8a29e] font-body text-lg">
            Have a question or want to work together? Send me a message.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Name
              </label>
              <input 
                type="text" 
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input 
                type="email" 
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-xs text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={14} /> Message
            </label>
            <textarea 
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body resize-none"
              placeholder="How can I help you?"
            />
          </div>

          <button 
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 w-full py-4 bg-blue-600 dark:bg-[#f59e0b] text-white dark:text-black font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-[#f59e0b]/90 transition-colors font-heading tracking-wide"
          >
            <Send size={18} />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
