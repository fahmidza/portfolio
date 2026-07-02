import React, { useState, useMemo, useEffect } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

import ImageCarousel from '../ImageCarousel';

export default function ProjectFilter() {
  // Auto-collapse sidebar synchronously before browser paint to prevent flash
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
  
  useIsomorphicLayoutEffect(() => {
    const collapseBtn = document.querySelector('button[title="Collapse sidebar"]');
    if (collapseBtn) {
      collapseBtn.click();
    }
  }, []);

  let pluginData = { projects: [] };
  try {
    pluginData = usePluginData('plugin-projects-data');
  } catch (e) {
    console.error("Plugin data not loaded yet", e);
  }
  
  const projects = pluginData?.projects || [];

  const ALL_TAGS = useMemo(() => {
    const tags = new Set();
    projects.forEach(p => p.tags?.forEach(tag => tags.add(tag)));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState('');

  const toggleTag = (tag) => {
    setActiveTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeTags.length > 0) {
        if (!project.tags?.some(tag => activeTags.includes(tag))) {
          return false;
        }
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
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [projects, searchQuery, activeTags]);

  const displayedTags = useMemo(() => {
    let tags = ALL_TAGS.filter(t => t !== 'All');
    if (tagSearchQuery.trim() !== '') {
      tags = tags.filter(t => t.toLowerCase().includes(tagSearchQuery.toLowerCase()));
    }
    return tags;
  }, [ALL_TAGS, tagSearchQuery]);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.controlsRow}>
        <input
          type="text"
          placeholder="🔍 Search projects by keyword, tag, or title..."
          className={styles.searchBar}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tagFiltersRow}>
        <button 
          className={activeTags.length === 0 ? `${styles.tagPill} ${styles.tagPillActive}` : styles.tagPill}
          onClick={() => setActiveTags([])}
        >
          All Tags
        </button>
        {ALL_TAGS.filter(t => t !== 'All').map((tag) => (
          <button 
            key={tag}
            className={activeTags.includes(tag) ? `${styles.tagPill} ${styles.tagPillActive}` : styles.tagPill}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            <Link to={project.permalink} key={project.id} className={`card shadow--sm ${styles.projectCard}`}>
              <div className={styles.cardThumbnail}>
                <ImageCarousel 
                  images={project.images} 
                  alt={project.title} 
                  className={styles.cardThumbnailImg}
                />
              </div>
              <div className={`card__header ${styles.cardHeader}`}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <span className={styles.cardDate}>
                  {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
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
