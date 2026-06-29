// @ts-check
// Docusaurus Configuration for Dzulfahmi's Data Science Portfolio

/** @type {import('@docusaurus/types').Config} */
async function createConfig() {
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
    onBrokenMarkdownLinks: 'warn',



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
            sidebarPath: './sidebars.js',
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
      './src/plugins/plugin-projects-data'
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
              href: 'https://github.com/fahmidza',
              label: 'GitHub',
              position: 'right',
            },
            {
              href: 'https://www.linkedin.com/in/dzulfahmidzakiaahmad/',
              label: 'LinkedIn',
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
                { label: 'Projects', to: '/docs/intro' },
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
