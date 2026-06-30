// @ts-check
// Docusaurus Configuration for Dzulfahmi's Data Science Portfolio

/** @type {import('@docusaurus/types').Config} */
async function createConfig() {
  // Read CMS site settings
  let siteSettings = {};
  try {
    siteSettings = require('./data/settings.json');
  } catch (e) {
    console.warn("No data/settings.json found.");
  }

  // Dynamically import ESM-only plugins for math equation support
  const remarkMath = (await import('remark-math')).default;
  const rehypeKatex = (await import('rehype-katex')).default;

  return {
    title: 'Dzulfahmi Dzakia Ahmad',
    tagline: 'Data Scientist — Turning Data into Actionable Insights',
    favicon: 'img/favicon.ico',

    url: 'https://fahmidza.github.io',
    baseUrl: '/portfolio/',

    organizationName: 'fahmidza',
    projectName: 'portfolio',
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'warn',
    markdown: {
      hooks: {
        onBrokenMarkdownLinks: 'warn',
      },
    },

    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
    },

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: false,
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
          blog: {
            showReadingTime: true,
            blogTitle: 'Insights & Reflections',
            blogDescription: 'Thoughts on data science, machine learning, and the journey of turning data into impact.',
            postsPerPage: 5,
            blogSidebarTitle: 'Recent Posts',
            blogSidebarCount: 'ALL',
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
          theme: {
            customCss: './src/css/custom.css',
          },
        }),
      ],
    ],

    plugins: [
      './src/plugins/plugin-projects-data',
      function googleTranslatePlugin() {
        return {
          name: 'google-translate-plugin',
          injectHtmlTags() {
            return {
              headTags: [
                {
                  tagName: 'script',
                  attributes: {
                    type: 'text/javascript',
                    src: '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
                  },
                },
                {
                  tagName: 'script',
                  attributes: { type: 'text/javascript' },
                  innerHTML: `
                    function googleTranslateElementInit() {
                      new google.translate.TranslateElement({
                        pageLanguage: 'en',
                        includedLanguages: 'en,id'
                      }, 'google_translate_element');
                    }
                  `,
                },
              ],
            };
          },
        };
      },
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        image: 'img/social-card.jpg',
        colorMode: {
          defaultMode: 'dark',
          disableSwitch: false,
          respectPrefersColorScheme: true,
        },
        docs: {
          sidebar: {
            hideable: true,
            autoCollapseCategories: true,
          },
        },
        navbar: {
          title: 'Dzulfahmi D.A.',
          logo: {
            alt: 'Portfolio Logo',
            src: 'img/logo.svg',
          },
          items: [
            { to: '/', label: 'Home', position: 'left', exact: true },
            { to: '/docs/projects', label: 'Projects', position: 'left' },
            { to: '/blog', label: 'Blog & Activities', position: 'left' },
            { to: '/docs/about', label: 'About Me', position: 'left' },
            {
              type: 'html',
              position: 'right',
              value: '<div id="google_translate_element" class="google-translate-container"></div>',
            },
            {
              href: 'https://github.com/fahmidza',
              html: '<img src="https://cdn-icons-png.flaticon.com/512/3291/3291667.png" alt="GitHub" class="navbar-icon github-icon" /> GitHub',
              position: 'right',
            },
            {
              href: 'https://www.linkedin.com/in/dzulfahmidzakiaahmad/',
              html: '<img src="https://static.vecteezy.com/system/resources/thumbnails/018/930/587/small/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" class="navbar-icon linkedin-icon" /> LinkedIn',
              position: 'right',
            },
            {
              href: siteSettings.resume_pdf || '#',
              html: '<svg class="navbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="vertical-align: middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> <span style="vertical-align: middle;">Resume</span>',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Portfolio',
              items: [
                { label: 'Projects', to: '/docs/projects' },
                { label: 'About Me', to: '/docs/about' },
                { label: 'Blog & Activities', to: '/blog' },
              ],
            },
            {
              title: 'Connect',
              items: [
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/in/dzulfahmidzakiaahmad/',
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/fahmidza',
                },
                {
                  label: 'Email',
                  href: 'mailto:dzulfahmidzakiaahmad@gmail.com',
                },
              ],
            },
                {
                  title: 'Popular Tags',
                  items: [
                    { label: 'Python', to: '/docs/tags/python' },
                    { label: 'Machine Learning', to: '/docs/tags/machine-learning' },
                    { label: 'Dashboard', to: '/docs/tags/dashboard' },
                  ],
                },
          ],
          copyright: `© ${new Date().getFullYear()} Dzulfahmi Dzakia Ahmad. Built with Docusaurus.`,
        },
        prism: {
          theme: require('prism-react-renderer').themes.github,
          darkTheme: require('prism-react-renderer').themes.dracula,
          additionalLanguages: ['python', 'r', 'sql', 'bash'],
        },
        metadata: [
          { name: 'keywords', content: 'data science, machine learning, portfolio, analytics, python, statistics' },
          { name: 'author', content: 'Dzulfahmi Dzakia Ahmad' },
          { name: 'description', content: 'Professional portfolio showcasing data science, machine learning, and analytics projects by Dzulfahmi Dzakia Ahmad.' },
        ],
      }),
  };
}

module.exports = createConfig;
