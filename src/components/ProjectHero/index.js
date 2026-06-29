import React, { useEffect, useRef } from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';
import ImageCarousel from '../ImageCarousel';

const PLACEHOLDER_IMAGE = '/portfolio/img/projects/placeholder.svg';

export default function ProjectHero() {
  const { metadata, frontMatter } = useDoc();
  let pluginData = { projects: [] };
  try {
    pluginData = usePluginData('plugin-projects-data');
  } catch (e) {
    console.error("Plugin data not loaded yet", e);
  }
  
  const heroRef = useRef(null);
  const projects = pluginData?.projects || [];
  const currentProject = projects.find(p => metadata.permalink === p.permalink);
  const images = currentProject?.images || [PLACEHOLDER_IMAGE];
  
  const title = metadata.title || 'Project';
  const description = metadata.description || '';
  const category = frontMatter.category || '';
  const tags = frontMatter.tags || [];

  // Hide the default markdown h1 to avoid duplicate titles
  useEffect(() => {
    if (heroRef.current) {
      const article = heroRef.current.closest('article');
      if (article) {
        const defaultH1 = article.querySelector('.markdown > h1');
        if (defaultH1) {
          defaultH1.style.display = 'none';
        }
      }
    }
  }, []);

  return (
    <div className={styles.heroWrapper} ref={heroRef}>
      <div className={styles.heroImageContainer}>
        <ImageCarousel 
          images={images} 
          alt={title} 
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {description && (
          <p className={styles.heroDescription}>{description}</p>
        )}
        {tags.length > 0 && (
          <div className={styles.heroTags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
