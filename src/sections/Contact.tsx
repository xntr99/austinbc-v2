import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MessageSquare, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('https://formspree.io/f/mwvwpbvr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
          className="bg-slate-200/80 dark:bg-[#1c1917]/80 backdrop-blur-md border border-slate-300 dark:border-[#292524] rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-xs text-slate-600 dark:text-[#a8a29e] uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === 'loading' || status === 'success'}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed"
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
                name="email"
                required
                disabled={status === 'loading' || status === 'success'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body disabled:opacity-50 disabled:cursor-not-allowed"
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
              name="message"
              required
              rows={5}
              disabled={status === 'loading' || status === 'success'}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-slate-100 dark:bg-[#0c0a09] border border-slate-300 dark:border-[#292524] rounded-lg px-4 py-3 text-slate-900 dark:text-[#f3f4f6] focus:outline-none focus:border-blue-600 dark:focus:border-[#f59e0b] transition-colors font-body resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="How can I help you?"
            />
          </div>

          {/* Status Feedback */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-sm"
              >
                <CheckCircle size={18} className="shrink-0" />
                Message sent! I'll get back to you soon.
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-mono text-sm"
              >
                <AlertCircle size={18} className="shrink-0" />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="mt-2 flex items-center justify-center gap-2 w-full py-4 bg-blue-600 dark:bg-[#f59e0b] text-white dark:text-black font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-[#d97706] transition-colors font-heading tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <><Loader2 size={18} className="animate-spin" /> Sending...</>
            ) : status === 'success' ? (
              <><CheckCircle size={18} /> Sent!</>
            ) : (
              <><Send size={18} /> Send Message</>
            )}
          </button>

          {status === 'success' && (
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-center font-mono text-xs text-slate-500 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] transition-colors underline underline-offset-4"
            >
              Send another message?
            </button>
          )}

          {status === 'error' && (
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-center font-mono text-xs text-slate-500 dark:text-[#a8a29e] hover:text-blue-600 dark:hover:text-[#f59e0b] transition-colors"
            >
              Try again
            </button>
          )}
        </motion.form>
      </div>
    </section>
  );
}
