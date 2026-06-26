import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// === Components ===
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content-left">
          <h1 className="hero-title">Dzulfahmi Dzakia Ahmad</h1>
          <h2 className="hero-role">Data Enthusiast</h2>
          <p className="hero-description">
            Data Scientist & Statistician bridging the gap between raw data and real-world impact. I turn complex datasets into actionable insights through statistical modeling, machine learning, and compelling visualizations.
          </p>
          <div className="hero-cta-group">
            <Link to="/docs/projects" className="hero-cta hero-cta--primary">
              View Projects
            </Link>
            <Link to="/docs/about" className="hero-cta hero-cta--secondary">
              About Me
            </Link>
          </div>
        </div>
        
        <div className="hero-content-right">
          <div className="hero-image-wrapper">
            <img src="https://github.com/fahmidza.png" alt="Dzulfahmi Dzakia Ahmad" className="hero-profile-image" />
            <div className="floating-pill pill-1">
              <span className="pill-icon">🤖</span> Machine Learning
            </div>
            <div className="floating-pill pill-2">
              <span className="pill-icon">📊</span> Data Science
            </div>
            <div className="floating-pill pill-3">
              <span className="pill-icon">📈</span> Analytics
            </div>
            <div className="floating-pill pill-4">
              <span className="pill-icon">📝</span> Statistics
            </div>
          </div>
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
    </Layout>
  );
}
