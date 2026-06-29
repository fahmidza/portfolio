const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'docs', 'projects');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.md') || file.endsWith('.mdx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to remove `tags:\n  - item\n  - item` from frontmatter
    // It looks for `tags:` followed by any number of lines starting with `  - `
    content = content.replace(/^tags:\s*(?:\r?\n\s+-\s+.*)*\r?\n?/m, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`Cleaned tags from ${file}`);
  }
});
