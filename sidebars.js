const fs = require('fs');
const path = require('path');

function generateFlatSidebar() {
  const projectsDir = path.join(__dirname, 'docs/projects');
  const projectItems = [];
  
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    projectFiles.forEach(file => {
      if (file === 'index.mdx' || file === 'index.md') return; // Skip index
      
      const docId = `projects/${file.replace(/\.mdx?$/, '')}`;
      projectItems.push(docId);
    });
  }
  
  // Construct the final flat sidebar
  return [
    {
      type: 'doc',
      id: 'projects/index',
      label: '👋 Projects Home',
    },
    {
      type: 'html',
      value: '<div style="height: 1px; background-color: var(--ifm-color-emphasis-300); margin: 0.5rem 1rem;"></div>',
      defaultStyle: true,
    },
    ...projectItems.sort() // Alphabetical sort, or you can let Docusaurus sort by sidebar_position if we mapped them
  ];
}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  projectsSidebar: generateFlatSidebar(),
};

module.exports = sidebars;
