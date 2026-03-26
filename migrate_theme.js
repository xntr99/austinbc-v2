import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colorMap = {
  'bg-[#0c0a09]': 'bg-slate-50 dark:bg-[#0c0a09]',
  'bg-[#1c1917]': 'bg-white dark:bg-[#1c1917]',
  'border-[#292524]': 'border-slate-200 dark:border-[#292524]',
  'text-[#f3f4f6]': 'text-slate-900 dark:text-[#f3f4f6]',
  'text-[#a8a29e]': 'text-slate-600 dark:text-[#a8a29e]',
  'bg-[#1e1e1e]': 'bg-white dark:bg-[#1e1e1e]',
  'bg-[#2d2d2d]': 'bg-slate-100 dark:bg-[#2d2d2d]',
  'border-[#333333]': 'border-slate-200 dark:border-[#333333]',
  'from-[#0c0a09]': 'from-slate-50 dark:from-[#0c0a09]',
  'to-[#0c0a09]': 'to-slate-50 dark:to-[#0c0a09]',
  'via-[#0c0a09]': 'via-slate-50 dark:via-[#0c0a09]',
  'bg-[#080B12]': 'bg-slate-50 dark:bg-[#080B12]',
  'text-[#A0A8B8]': 'text-slate-600 dark:text-[#A0A8B8]',
};

// Also map opacity variations like bg-[#0c0a09]/80 -> bg-white/80 dark:bg-[#0c0a09]/80
const advancedReplacements = [
  { regex: /bg-\[#0c0a09\]\/(\d+)/g, replace: 'bg-white/$1 dark:bg-[#0c0a09]/$1' },
  { regex: /bg-\[#1c1917\]\/(\d+)/g, replace: 'bg-white/$1 dark:bg-[#1c1917]/$1' },
  { regex: /border-\[#292524\]\/(\d+)/g, replace: 'border-slate-200/$1 dark:border-[#292524]/$1' },
  { regex: /from-\[#0c0a09\]\/(\d+)/g, replace: 'from-white/$1 dark:from-[#0c0a09]/$1' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('Navbar.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let originalContent = content;

      // Handle direct map
      for (const [dark, dual] of Object.entries(colorMap)) {
        content = content.split(dark).join(dual);
      }

      // Handle advanced regex (like opacities)
      for (const rule of advancedReplacements) {
        content = content.replace(rule.regex, rule.replace);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

// Ensure Navbar isn't messed up if it was already updated
const srcDir = path.join(__dirname, 'src');
processDirectory(srcDir);
console.log('Done!');
