const p = require('./src/plugins/plugin-blog-data/index.js');
const inst = p({ siteDir: __dirname });
inst.loadContent().then(console.log);
