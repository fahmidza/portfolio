const path = require('path');
const plugin = require('./src/plugins/plugin-projects-data');

async function test() {
  const context = {
    siteDir: __dirname
  };
  const p = plugin(context);
  const content = await p.loadContent();
  content.forEach(proj => {
    console.log(`Project: ${proj.title}`);
    console.log(`  Images length: ${proj.images.length}`);
    if (proj.images.length > 1) {
      console.log(`  Images:`, proj.images);
    }
  });
}
test();
