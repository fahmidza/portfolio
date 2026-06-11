/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  projectsSidebar: [
    'intro',
    {
      type: 'category',
      label: '📊 Data Science & Analytics',
      collapsed: false,
      items: [
        'data-science/customer-clustering',
        'data-science/sarima-forecasting',
        'data-science/ev-sentiment-analysis',
        'data-science/twitter-disability-sentiment',
        'data-science/sem-teacher-burnout',
        'data-science/sleep-quality-survey',
      ],
    },
    {
      type: 'category',
      label: '📈 Dashboards & Visualization',
      collapsed: false,
      items: [
        'dashboards/ecommerce-dashboard',
        'dashboards/renewable-energy-dashboard',
      ],
    },
    {
      type: 'category',
      label: '🤖 Machine Learning',
      collapsed: false,
      items: [
        'machine-learning/earthquake-damage-prediction',
        'machine-learning/nitrogen-deficiency-detection',
        'machine-learning/ml-projects-collection',
      ],
    },
    {
      type: 'category',
      label: '🌐 Web Applications',
      collapsed: false,
      items: [
        'web-apps/sadar-fraud-prevention',
      ],
    },
    'about',
  ],
};

module.exports = sidebars;
