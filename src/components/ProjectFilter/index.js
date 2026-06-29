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
      // Must include ALL selected tags (or ANY? Let's do ANY for broader results, or ALL for strict filtering.
      // Usually multiselect means ANY (OR logic), but sometimes ALL (AND logic). Let's use ANY for tags.
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
    });
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
        
        <div className={styles.dropdownContainer}>
          <button 
            className={styles.dropdownToggle} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>🏷️ {activeTags.length > 0 ? `Selected Tags (${activeTags.length})` : 'Select Tags...'}</span>
            <span>{isDropdownOpen ? '▴' : '▾'}</span>
          </button>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              <div className={styles.dropdownSearch}>
                <input
                  type="text"
                  placeholder="Search tags..."
                  className={styles.dropdownSearchInput}
                  value={tagSearchQuery}
                  onChange={(e) => setTagSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <label className={styles.dropdownItem}>
                <input 
                  type="checkbox" 
                  checked={activeTags.length === 0}
                  onChange={() => setActiveTags([])}
                />
                All Tags
              </label>
              {displayedTags.length > 0 ? displayedTags.map((tag) => (
                <label key={tag} className={styles.dropdownItem}>
                  <input 
                    type="checkbox" 
                    checked={activeTags.includes(tag)}
                    onChange={() => toggleTag(tag)}
                  />
                  {tag}
                </label>
              )) : (
                <div style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-500)' }}>
                  No tags found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {activeTags.length > 0 && (
        <div className={styles.selectedTags}>
          {activeTags.map(tag => (
            <span key={tag} className={styles.selectedTag}>
              {tag} 
              <button onClick={() => toggleTag(tag)} className={styles.removeTagBtn}>×</button>
            </span>
          ))}
          <button 
            onClick={() => setActiveTags([])} 
            className="button button--link button--sm"
          >
            Clear All
          </button>
        </div>
      )}

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
