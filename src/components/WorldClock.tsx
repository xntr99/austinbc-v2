import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = time.toLocaleDateString('en-US', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-[#1c1917] border border-slate-300 dark:border-[#292524] rounded-full shadow-[0_0_25px_rgba(16,185,129,0.15)]">
      <Globe size={14} className="text-[#10b981]" />
      <div className="flex flex-col">
        <span className="text-[9px] font-mono text-slate-600 dark:text-[#a8a29e] leading-none mb-0.5 tracking-wider">MANILA, PH (PHT)</span>
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-xs font-mono text-[#10b981] font-medium">{timeString}</span>
          <span className="text-[#292524] text-[10px]">•</span>
          <span className="text-xs font-mono text-slate-600 dark:text-[#a8a29e]">{dateString}</span>
        </div>
      </div>
    </div>
  );
}
