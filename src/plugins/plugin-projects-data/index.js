const fs = require('fs');
const path = require('path');

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {} };
  const yamlString = match[1];
  const data = {};
  yamlString.split(/\r?\n/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      if (value.startsWith('[') && value.endsWith(']')) {
         value = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      }
      data[key] = value;
    }
  });
  return { data };
}

module.exports = function (context, options) {
  return {
    name: 'plugin-projects-data',
    async loadContent() {
      const projectsDir = path.join(context.siteDir, 'docs', 'projects');
      if (!fs.existsSync(projectsDir)) return [];
      
      const files = fs.readdirSync(projectsDir).filter(f => 
        (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('index')
      );
      const projects = files.map(file => {
        const filePath = path.join(projectsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = parseFrontmatter(content);
        
        return {
          id: file.replace(/\.mdx?$/, ''),
          title: data.title || file.replace(/\.mdx?$/, ''),
          description: data.description || '',
          category: data.category || 'Other',
          tags: Array.isArray(data.tags) ? data.tags : [],
          permalink: `/portfolio/docs/projects/${file.replace(/\.mdx?$/, '')}`,
        };
      });
      return projects;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({ projects: content });
    },
  };
};
