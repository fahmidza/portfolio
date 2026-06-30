import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import siteSettings from '../../data/settings.json';

const tools = [
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'R', icon: 'https://cdn.simpleicons.org/r/276DC3' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { name: 'Excel', icon: 'https://img.icons8.com/color/96/microsoft-excel-2019--v1.png' },
  { name: 'Word', icon: 'https://img.icons8.com/color/96/microsoft-word-2019--v2.png' },
  { name: 'PowerPoint', icon: 'https://img.icons8.com/color/96/microsoft-powerpoint-2019--v1.png' },
  { name: 'Tableau', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mfZH4vg-AxYbGmWJBz1m9vm88KRZ_DhJycKh38cUoT7x7IVVOr4e02b7&s=10' },
  { name: 'PowerBI', icon: 'https://img.icons8.com/color/96/power-bi.png' },
  { name: 'Data Studio', icon: 'https://img.icons8.com/fluent/1200/google-data-studio.jpg' },
  { name: 'Canva', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/canva-icon.png' },
  { name: 'Jupyter Notebook', icon: 'https://images.seeklogo.com/logo-png/35/1/jupyter-logo-png_seeklogo-354673.png' },
  { name: 'Git & GitHub', icon: 'https://image.web.id/images/git-vs-github.png' },
];

// === Components ===
function HeroSection() {
  const roles = siteSettings?.hero_roles || ["Data Enthusiast"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentText === roles[currentRoleIndex]) {
      typeSpeed = 2000; // Pause at end of typing
      setIsDeleting(true);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      typeSpeed = 500; // Pause before typing next word
    }
    
    const timeout = setTimeout(() => {
      setCurrentText(
        roles[currentRoleIndex].substring(0, currentText.length + (isDeleting ? -1 : 1))
      );
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content-left">
          <h1 className="hero-title">Dzulfahmi Dzakia Ahmad</h1>
          <h2 className="hero-role">
            {currentText}<span className="typewriter-cursor">|</span>
          </h2>
          <p className="hero-description">
            {siteSettings?.hero_description || "Data Scientist & Statistician bridging the gap between raw data and real-world impact. I turn complex datasets into actionable insights through statistical modeling, machine learning, and compelling visualizations."}
          </p>
          <div className="hero-cta-group">
            <Link to="/docs/projects" className="hero-cta hero-cta--primary">
              View Projects
            </Link>
            <Link to="/blog" className="hero-cta hero-cta--secondary">
              Blog & Activities
            </Link>
            <Link to="/docs/about" className="hero-cta hero-cta--secondary">
              About Me
            </Link>
          </div>
        </div>
        
        <div className="hero-content-right">
          <div className="hero-image-wrapper">
            <img src="https://github.com/fahmidza.png" alt="Dzulfahmi Dzakia Ahmad" className="hero-profile-image" />
            
            <div className="floating-pill text-pill text-pill-0">
              <span className="pill-icon">🤖</span> Machine Learning
            </div>
            <div className="floating-pill text-pill text-pill-1">
              <span className="pill-icon">📊</span> Data Science
            </div>
            <div className="floating-pill text-pill text-pill-2">
              <span className="pill-icon">📈</span> Analytics
            </div>
            <div className="floating-pill text-pill text-pill-3">
              <span className="pill-icon">📝</span> Statistics
            </div>

            {tools.map((tool, idx) => (
              <div key={idx} className={`floating-pill tool-pill tool-pill-${idx}`}>
                <img src={tool.icon} alt={tool.name} className="tool-pill-icon" />
                <span className="tool-pill-name">{tool.name}</span>
              </div>
            ))}
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
