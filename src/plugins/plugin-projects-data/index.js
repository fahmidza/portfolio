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
    getPathsToWatch() {
      // Windows backslashes crash picomatch, so replace with forward slashes for globs
      return [path.join(context.siteDir, 'docs', 'projects', '*.{md,mdx}').replace(/\\/g, '/')];
    },
    async loadContent() {
      const projectsDir = path.join(context.siteDir, 'docs', 'projects');
      if (!fs.existsSync(projectsDir)) return [];

      // Read category map
      const catsDir = path.join(context.siteDir, 'src', 'data', 'categories');
      const catMap = {};
      if (fs.existsSync(catsDir)) {
        const catFiles = fs.readdirSync(catsDir).filter(f => f.endsWith('.json'));
        for (const cf of catFiles) {
          const cData = JSON.parse(fs.readFileSync(path.join(catsDir, cf), 'utf-8'));
          if (cData.id && cData.name) {
            catMap[cData.id] = cData.name;
          }
        }
      }
      
      const files = fs.readdirSync(projectsDir).filter(f => 
        (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('index')
      );
      const projects = files.map(file => {
        const filePath = path.join(projectsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = parseFrontmatter(content);
        
        // Map category ID to display name if exists
        if (data.category && catMap[data.category]) {
          data.category = catMap[data.category];
        }

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
