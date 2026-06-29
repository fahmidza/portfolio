const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'docs', 'about.md');
let content = fs.readFileSync(filePath, 'utf8');

// The regex needs to handle \r\n properly.
// Look for lines that only contain spaces and `---`
const lines = content.split(/\r?\n/);
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].trim() === '---' && i > 5) {
    // This is a divider. Ensure there's a blank line before it.
    if (newLines.length > 0 && newLines[newLines.length - 1].trim() !== '') {
      newLines.push('');
    }
    newLines.push('---');
    newLines.push('');
  } else {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log('Fixed markdown Setext headings properly in about.md');
