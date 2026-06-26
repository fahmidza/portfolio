import React, { useState, useMemo } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function ProjectFilter() {
  let pluginData = { projects: [] };
  try {
    pluginData = usePluginData('plugin-projects-data');
  } catch (e) {
    console.error("Plugin data not loaded yet", e);
  }
  
  const projects = pluginData?.projects || [];

  const CATEGORIES = useMemo(() => {
    const cats = new Set(projects.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [projects]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory !== 'All' && project.category !== activeCategory) {
        return false;
      }
      
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
    <div className={styles.filterContainer}>
      <input
        type="text"
        placeholder="🔍 Search projects by keyword, tag, or title..."
        className={styles.searchBar}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className={styles.categoryPills}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={`button button--sm ${activeCategory === category ? 'button--primary' : 'button--outline button--primary'}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <Link to={project.permalink} key={project.id} className={`card shadow--sm ${styles.projectCard}`}>
              <div className={`card__header ${styles.cardHeader}`}>
                <span className={styles.cardCategory}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </div>
              <div className={`card__body ${styles.cardBody}`}>
                <p className={styles.cardDescription}>{project.description}</p>
              </div>
              <div className={`card__footer ${styles.cardFooter}`}>
                {project.tags.map(tag => (
                  <span key={tag} className={`badge badge--secondary ${styles.tagBadge}`}>{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="alert alert--info" role="alert">
          No projects found matching your criteria.
        </div>
      )}
    </div>
  );
}
