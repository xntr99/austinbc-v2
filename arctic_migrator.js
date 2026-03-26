import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colorMap = {
  // Grays/Backgrounds 
  'bg-slate-50 dark:bg-[#0c0a09]': 'bg-slate-100 dark:bg-[#0c0a09]',
  'bg-white dark:bg-[#1c1917]': 'bg-slate-200 dark:bg-[#1c1917]',
  'border-slate-200 dark:border-[#292524]': 'border-slate-300 dark:border-[#292524]',
  'bg-white dark:bg-[#1e1e1e]': 'bg-slate-200 dark:bg-[#1e1e1e]',
  'bg-slate-100 dark:bg-[#2d2d2d]': 'bg-slate-300 dark:bg-[#2d2d2d]',
  'from-slate-50 dark:from-[#0c0a09]': 'from-slate-100 dark:from-[#0c0a09]',
  'via-slate-50 dark:via-[#0c0a09]': 'via-slate-100 dark:via-[#0c0a09]',
  'to-slate-50 dark:to-[#0c0a09]': 'to-slate-100 dark:to-[#0c0a09]',
  
  // Oranges -> Arctic Blues
  'text-[#f59e0b]': 'text-blue-600 dark:text-[#f59e0b]',
  'bg-[#f59e0b]': 'bg-blue-600 dark:bg-[#f59e0b]',
  'border-[#f59e0b]': 'border-blue-600 dark:border-[#f59e0b]',
  'from-[#f59e0b]': 'from-blue-600 dark:from-[#f59e0b]',
  'via-[#ea580c]': 'via-blue-700 dark:via-[#ea580c]',
  'to-[#ef4444]': 'to-blue-500 dark:to-[#ef4444]', 
  'text-[#ea580c]': 'text-blue-700 dark:text-[#ea580c]',
  'border-[#ea580c]': 'border-blue-700 dark:border-[#ea580c]',
  'text-[#f97316]': 'text-blue-600 dark:text-[#f97316]',
  'border-[#f97316]': 'border-blue-600 dark:border-[#f97316]',
  'text-[#9a3412]': 'text-blue-800 dark:text-[#9a3412]',

  // Shadow strings
  'shadow-[0_0_15px_rgba(245,158,11,0.3)]': 'shadow-[0_0_15px_rgba(37,99,235,0.3)] dark:shadow-[0_0_15px_rgba(245,158,11,0.3)]',
  'shadow-[0_0_20px_rgba(234,88,12,0.15)]': 'shadow-[0_0_20px_rgba(29,78,216,0.15)] dark:shadow-[0_0_20px_rgba(234,88,12,0.15)]',
  'shadow-[0_0_30px_rgba(234,88,12,0.3)]': 'shadow-[0_0_30px_rgba(29,78,216,0.3)] dark:shadow-[0_0_30px_rgba(234,88,12,0.3)]',
  'shadow-[0_0_25px_rgba(154,52,18,0.4)]': 'shadow-[0_0_25px_rgba(30,64,175,0.4)] dark:shadow-[0_0_25px_rgba(154,52,18,0.4)]',
  'shadow-[0_0_20px_rgba(249,115,22,0.25)]': 'shadow-[0_0_20px_rgba(37,99,235,0.25)] dark:shadow-[0_0_20px_rgba(249,115,22,0.25)]',
  
  // Opacities
  'bg-[#f59e0b]/10': 'bg-blue-600/10 dark:bg-[#f59e0b]/10',
  'border-[#f59e0b]/30': 'border-blue-600/30 dark:border-[#f59e0b]/30',
  'hover:border-[#f59e0b]/30': 'hover:border-blue-600/30 dark:hover:border-[#f59e0b]/30',
  'border-[#f59e0b]/50': 'border-blue-600/50 dark:border-[#f59e0b]/50',
  'hover:border-[#f59e0b]/50': 'hover:border-blue-600/50 dark:hover:border-[#f59e0b]/50',
  'hover:bg-[#f59e0b]/5': 'hover:bg-blue-600/10 dark:hover:bg-[#f59e0b]/5',
  'bg-[#9a3412]/10': 'bg-blue-800/10 dark:bg-[#9a3412]/10',
  'border-[#9a3412]/30': 'border-blue-800/30 dark:border-[#9a3412]/30',
  'border-[#f97316]/40': 'border-blue-600/40 dark:border-[#f97316]/40',
  'hover:border-[#f97316]/60': 'hover:border-blue-600/60 dark:hover:border-[#f97316]/60',

  // Extras missing in dual format previously:
  'group-hover:text-[#f59e0b]': 'group-hover:text-blue-600 dark:group-hover:text-[#f59e0b]',
  'group-hover:border-[#f59e0b]/50': 'group-hover:border-blue-600/50 dark:group-hover:border-[#f59e0b]/50',
  'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]': 'group-hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] dark:group-hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]',
  'hover:text-[#f59e0b]': 'hover:text-blue-600 dark:hover:text-[#f59e0b]',
  'group-hover:text-[#ea580c]': 'group-hover:text-blue-700 dark:group-hover:text-[#ea580c]',
  'group-hover:text-[#f97316]': 'group-hover:text-blue-600 dark:group-hover:text-[#f97316]',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('Navbar.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let originalContent = content;

      // Ensure we don't accidentally double-replace if script is run twice
      for (const [key, value] of Object.entries(colorMap)) {
        if (!content.includes(value)) {
           content = content.split(key).join(value);
        }
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
processDirectory(srcDir);
console.log('Arctic Blue migration complete!');
