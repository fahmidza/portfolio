import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// === Data ===
const STATS = [
  { number: '12+', label: 'Projects' },
  { number: '8+', label: 'Technologies' },
  { number: '3.81', label: 'GPA / 4.00' },
  { number: '6+', label: 'Awards' },
];

const FEATURED_PROJECTS = [
  {
    category: 'Machine Learning',
    title: 'Nitrogen Deficiency Detection',
    description: 'Deep learning model using EfficientNet_B4 to classify nitrogen deficiency in rice crops from leaf images, achieving 95.5% F1-score. Deployed via Streamlit.',
    tech: ['PyTorch', 'EfficientNet', 'Streamlit', 'Computer Vision'],
    link: '/docs/machine-learning/nitrogen-deficiency-detection',
    highlight: true,
  },
  {
    category: 'Data Science',
    title: 'Customer Transaction Clustering',
    description: 'Comparative analysis of 7 clustering algorithms on customer transaction data. K-Medians achieved the highest silhouette score (0.742) across three meaningful segments.',
    tech: ['Python', 'Scikit-learn', 'Keras', 'K-Means', 'GMM'],
    link: '/docs/data-science/customer-clustering',
    highlight: true,
  },
  {
    category: 'Machine Learning',
    title: 'Earthquake Damage Prediction',
    description: 'Predicting building damage levels from earthquakes using CatBoost with SHAP-based interpretability analysis for actionable disaster preparedness insights.',
    tech: ['CatBoost', 'SHAP', 'Python', 'Feature Engineering'],
    link: '/docs/machine-learning/earthquake-damage-prediction',
    highlight: true,
  },
  {
    category: 'Web Application',
    title: 'SADAR — Digital Fraud Prevention',
    description: 'Full-stack application for preventing digital fraud, featuring suspicious URL detection models built as a national capstone project with a cross-functional team.',
    tech: ['Python', 'Machine Learning', 'Web App', 'NLP'],
    link: '/docs/web-apps/sadar-fraud-prevention',
  },
  {
    category: 'Data Science',
    title: 'Twitter Disability Sentiment Analysis',
    description: 'Crawled 4,500+ tweets on disability issues in Indonesia, performed NLP preprocessing and sentiment classification revealing 50% neutral, 35% positive opinions.',
    tech: ['TextBlob', 'Sastrawi', 'NLP', 'Web Scraping'],
    link: '/docs/data-science/twitter-disability-sentiment',
  },
  {
    category: 'Dashboard',
    title: 'Renewable Energy Dashboard',
    description: 'Interactive analytical dashboard exploring renewable energy potential across Indonesian provinces with visual comparisons and strategic recommendations.',
    tech: ['Google Data Studio', 'Data Visualization', 'Analysis'],
    link: '/docs/dashboards/renewable-energy-dashboard',
  },
];

const SKILLS = [
  {
    icon: '📊',
    title: 'Data Analysis & Statistics',
    items: 'Python, R, SQL, SPSS, Minitab, EViews — Statistical modeling, hypothesis testing, regression, time series forecasting',
  },
  {
    icon: '🤖',
    title: 'Machine Learning & AI',
    items: 'Scikit-learn, PyTorch, TensorFlow — Classification, regression, clustering, deep learning, NLP, computer vision',
  },
  {
    icon: '📈',
    title: 'Visualization & BI',
    items: 'Google Data Studio, Power BI, Matplotlib, Seaborn — Dashboards, infographics, data storytelling',
  },
  {
    icon: '💻',
    title: 'Engineering & Tools',
    items: 'Git, Streamlit, Jupyter, Web Scraping, Pandas, NumPy — Data pipelines, deployment, automation',
  },
];

// === Components ===
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">Open to Opportunities</div>
        <h1 className="hero-title">
          Hi, I'm <span className="gradient-text">Dzulfahmi</span>
        </h1>
        <p className="hero-subtitle">
          Data Scientist & Statistician bridging the gap between raw data and real-world impact. 
          I turn complex datasets into actionable insights through statistical modeling, 
          machine learning, and compelling visualizations.
        </p>
        <div className="hero-cta-group">
          <Link to="/docs/intro" className="hero-cta hero-cta--primary">
            View Projects →
          </Link>
          <Link to="/docs/about" className="hero-cta hero-cta--secondary">
            About Me
          </Link>
        </div>
        <div className="stats-bar">
          {STATS.map((stat, i) => (
            <div className="stat-item" key={i}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <Link to={project.link} className="project-card">
      <span className="project-card__category">{project.category}</span>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tech">
        {project.tech.map((t, i) => (
          <span className="tech-pill" key={i}>{t}</span>
        ))}
      </div>
    </Link>
  );
}

function FeaturedProjects() {
  return (
    <section className="portfolio-section">
      <div className="section-header">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">
          A curated selection of data science, machine learning, and analytics projects 
          demonstrating end-to-end problem solving.
        </p>
      </div>
      <div className="projects-grid">
        {FEATURED_PROJECTS.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
        <Link to="/docs/intro" className="hero-cta hero-cta--secondary" style={{ borderColor: 'var(--color-border)' }}>
          View All 12 Projects →
        </Link>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="portfolio-section">
      <div className="section-header">
        <span className="section-label">Expertise</span>
        <h2 className="section-title">Skills & Technologies</h2>
        <p className="section-subtitle">
          A versatile toolkit spanning the full data science lifecycle — from acquisition to deployment.
        </p>
      </div>
      <div className="skills-grid">
        {SKILLS.map((skill, i) => (
          <div className="skill-card" key={i}>
            <div className="skill-card__icon">{skill.icon}</div>
            <h3 className="skill-card__title">{skill.title}</h3>
            <p className="skill-card__items">{skill.items}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="portfolio-section">
      <div className="cta-section">
        <span className="section-label">Get in Touch</span>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Let's Work Together</h2>
        <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
          I'm actively seeking opportunities in data science, analytics, and machine learning. 
          Let's connect and explore how data can drive your next big decision.
        </p>
        <div className="hero-cta-group">
          <a href="mailto:dzulfahmidzakiaahmad@gmail.com" className="hero-cta hero-cta--primary">
            ✉️ Email Me
          </a>
          <a href="https://www.linkedin.com/in/dzulfahmidzakiaahmad/" className="hero-cta hero-cta--secondary" target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

// === Main Page ===
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Portfolio"
      description="Professional portfolio of Dzulfahmi Dzakia Ahmad — Data Scientist specializing in statistical analysis, machine learning, and data-driven insights."
    >
      <HeroSection />
      <main>
        <FeaturedProjects />
        <SkillsSection />
        <CTASection />
      </main>
    </Layout>
  );
}
