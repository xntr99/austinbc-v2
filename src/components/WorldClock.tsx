import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const TIMEZONES = [
  { label: 'Manila, PH', tz: 'Asia/Manila', code: 'PHT' },
  { label: 'New York, US', tz: 'America/New_York', code: 'EST' },
  { label: 'Los Angeles, US', tz: 'America/Los_Angeles', code: 'PST' },
  { label: 'London, UK', tz: 'Europe/London', code: 'GMT' },
  { label: 'Paris, EU', tz: 'Europe/Paris', code: 'CET' },
  { label: 'Dubai, UAE', tz: 'Asia/Dubai', code: 'GST' },
  { label: 'Singapore', tz: 'Asia/Singapore', code: 'SGT' },
  { label: 'Tokyo, JP', tz: 'Asia/Tokyo', code: 'JST' },
  { label: 'Sydney, AU', tz: 'Australia/Sydney', code: 'AEST' },
  { label: 'Toronto, CA', tz: 'America/Toronto', code: 'EST' },
];

export default function WorldClock() {
  const [time, setTime] = useState(new Date());
  const [selected, setSelected] = useState(TIMEZONES[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', {
    timeZone: selected.tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = time.toLocaleDateString('en-US', {
    timeZone: selected.tz,
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div ref={ref} className="relative">
      {/* Clock Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-full shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-[#10b981]/50 transition-colors group"
      >
        <Globe size={14} className="text-[#10b981] shrink-0" />
        <div className="flex flex-col text-left">
          <span className="text-[9px] font-mono text-slate-600 dark:text-[#a8a29e] leading-none mb-0.5 tracking-wider uppercase">
            {selected.label} ({selected.code})
          </span>
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-xs font-mono text-[#10b981] font-medium">{timeString}</span>
            <span className="text-slate-400 dark:text-[#292524] text-[10px]">•</span>
            <span className="text-xs font-mono text-slate-600 dark:text-[#a8a29e]">{dateString}</span>
          </div>
        </div>
        <ChevronDown
          size={12}
          className={`text-slate-500 dark:text-[#a8a29e] transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-56 bg-slate-100 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="py-1">
              {TIMEZONES.map((tz) => {
                const isActive = tz.tz === selected.tz;
                return (
                  <button
                    key={tz.tz}
                    onClick={() => { setSelected(tz); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-[#10b981]/10 text-[#10b981]'
                        : 'text-slate-700 dark:text-[#a8a29e] hover:bg-slate-200 dark:hover:bg-[#292524]/60 hover:text-slate-900 dark:hover:text-[#f3f4f6]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#10b981]' : 'bg-slate-400 dark:bg-[#44403c]'}`} />
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-xs font-medium truncate">{tz.label}</span>
                      <span className="font-mono text-[10px] opacity-60 tracking-wider">{tz.code}</span>
                    </div>
                    {isActive && (
                      <span className="ml-auto text-[#10b981] text-[10px] font-mono tracking-wider">ACTIVE</span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
