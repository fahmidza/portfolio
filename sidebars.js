const fs = require('fs');
const path = require('path');

function generateFlatSidebar() {
  const projectsDir = path.join(__dirname, 'docs/projects');
  const projectItems = [];
  
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    projectFiles.forEach(file => {
      if (file === 'index.mdx' || file === 'index.md') return; // Skip index
      
      const filePath = path.join(projectsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Simple regex to grab the date from frontmatter (e.g., date: 2023-01-01)
      const dateMatch = content.match(/date:\s*([^\r\n]+)/);
      const dateValue = dateMatch ? new Date(dateMatch[1].trim()) : new Date(0); // Default to epoch if no date
      
      const docId = `projects/${file.replace(/\.mdx?$/, '')}`;
      projectItems.push({ id: docId, date: dateValue });
    });
  }
  
  // Sort items by date, newest first (descending)
  projectItems.sort((a, b) => b.date - a.date);
  const sortedIds = projectItems.map(item => item.id);
  
  // Construct the final flat sidebar
  return [
    {
      type: 'link',
      href: '/docs/projects',
      label: '👋 Projects Home',
    },
    {
      type: 'html',
      value: '<div style="height: 1px; background-color: var(--ifm-color-emphasis-300); margin: 0.5rem 1rem;"></div>',
      defaultStyle: true,
    },
    ...sortedIds
  ];
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  projectsSidebar: generateFlatSidebar(),
};

module.exports = sidebars;
