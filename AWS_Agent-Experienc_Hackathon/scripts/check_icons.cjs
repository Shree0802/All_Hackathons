const fs = require('fs');
const path = require('path');
const lucide = require('../frontend/node_modules/lucide-react');

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const match = content.match(/import\s*\{([\s\S]*?)\}\s*from\s*['"]lucide-react['"]/);
      if (match) {
        const icons = match[1].split(',').map(s => s.trim()).filter(Boolean);
        for (const icon of icons) {
          if (!lucide[icon]) {
            console.error(`MISSING ICON: "${icon}" in ${fullPath}`);
          }
        }
      }
    }
  }
}

scanDir(path.resolve(__dirname, '../frontend/src'));
console.log('Check finished.');
