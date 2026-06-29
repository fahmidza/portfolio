const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'projects');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const lines = content.split(/\r?\n/);
    let inFrontmatter = false;
    let newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '---') {
        inFrontmatter = !inFrontmatter;
        newLines.push(line);
        continue;
      }
      
      if (inFrontmatter) {
        // Drop dangling arrays from previous regex fail
        if (line.match(/^\s*\[.*\]\s*$/)) {
          continue; 
        }
      }
      
      newLines.push(line);
    }
    
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`Cleaned arrays from ${file}`);
  }
});
