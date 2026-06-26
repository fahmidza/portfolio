import React, { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './projects.module.css';

const CATEGORIES = [
  'All',
  'Data Science & Analytics',
  'Dashboards & Visualization',
  'Machine Learning',
  'Web Applications'
];

export default function Projects() {
  // Use plugin data. If not available during dev before restart, fallback to []
  let pluginData = { projects: [] };
  try {
    pluginData = usePluginData('plugin-projects-data');
  } catch (e) {
    console.error("Plugin data not loaded yet", e);
  }
  
  const projects = pluginData?.projects || [];

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (activeCategory !== 'All' && project.category !== activeCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inDesc = project.description.toLowerCase().includes(query);
        const inTags = project.tags.some(tag => tag.toLowerCase().includes(query));
        if (!inTitle && !inDesc && !inTags) {
          return false;
        }
      }
      
      return true;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <Layout
      title="Projects Portfolio"
      description="Showcase of Data Science, Machine Learning, and Web Application projects">
      <main className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Projects & Portfolio</h1>
          <p className={styles.headerSubtitle}>
            A curated collection of my work across data science, visualization, machine learning, and web development.
          </p>
        </div>

        <div className={styles.controls}>
          <input
            type="text"
            placeholder="🔍 Search by keyword, tag, or title..."
            className={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <div className={styles.categoryFilters}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.categoryBtn} ${activeCategory === category ? styles.categoryBtnActive : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project) => (
              <Link to={project.permalink} key={project.id} className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.cardCategory}>{project.category}</div>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDescription}>{project.description}</p>
                  <div className={styles.cardTags}>
                    {project.tags.map(tag => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <p>No projects found matching your criteria. Try a different keyword or category.</p>
          </div>
        )}
      </main>
    </Layout>
  );
}
