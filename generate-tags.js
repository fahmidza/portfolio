const fs = require('fs');
const path = require('path');

function getTags(dir) {
  const tags = new Set();
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf-8');
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (match) {
      const lines = match[1].split(/\r?\n/);
      let inTags = false;
      lines.forEach(line => {
        if (line.startsWith('tags:')) { inTags = true; return; }
        if (inTags && line.trim().startsWith('-')) {
          tags.add(line.replace('-', '').trim().replace(/^["']|["']$/g, ''));
        } else if (inTags && !line.startsWith(' ')) {
          inTags = false;
        }
      });
    }
  });
  return Array.from(tags).sort();
}

const docTags = getTags('docs/projects');
const blogTags = getTags('blog');

function createYaml(tags) {
  return tags.map(t => `${t}:
  label: ${t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
  description: ${t.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} related projects.`).join('\n');
}

fs.writeFileSync('docs/tags.yml', createYaml(docTags));
fs.writeFileSync('blog/tags.yml', createYaml(blogTags));
console.log('Tags generated successfully.');
