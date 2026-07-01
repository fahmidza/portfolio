const fs = require('fs');
const path = require('path');

module.exports = function (context, options) {
  return {
    name: 'plugin-blog-data',
    getPathsToWatch() {
      return [
        path.join(context.siteDir, 'blog'),
      ];
    },
    async loadContent() {
      const blogDir = path.join(context.siteDir, 'blog');
      if (!fs.existsSync(blogDir)) return {};

      const files = fs.readdirSync(blogDir).filter(f => 
        (f.endsWith('.md') || f.endsWith('.mdx')) && !f.startsWith('authors') && !f.startsWith('index')
      );
      
      const blogDataMap = {};
      
      files.forEach(file => {
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Extract images from markdown body
        let autoImages = [];
        const imgRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/g;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
          let imgPath = match[1] || match[2];
          if (imgPath.startsWith('/img/') || imgPath.startsWith('/files/')) {
            imgPath = `/portfolio${imgPath}`;
          }
          autoImages.push(imgPath);
        }
        
        let slug = file.replace(/\.mdx?$/, '');
        slug = slug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
        
        blogDataMap[slug] = {
          images: autoImages,
        };
      });
      return blogDataMap;
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData({ blogDataMap: content });
    },
  };
};
