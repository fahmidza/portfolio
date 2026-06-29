import React, { useEffect, useMemo, useState } from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ProjectHero from '@site/src/components/ProjectHero';
import Link from '@docusaurus/Link';

function ProjectReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, nextProgress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <div
      className="project-reading-progress"
      aria-hidden="true"
    >
      <div
        className="project-reading-progress__bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function ContentWrapper(props) {
  const { metadata } = useDoc();

  // Only show the ProjectHero on project detail pages (not the index)
  const isProjectPage =
    metadata.permalink &&
    metadata.permalink.includes('/docs/projects/') &&
    !metadata.permalink.endsWith('/docs/projects') &&
    !metadata.permalink.endsWith('/docs/projects/');

  return (
    <>
      {isProjectPage && <ProjectReadingProgress />}
      {isProjectPage && <ProjectHero />}
      <Content {...props} />
      {isProjectPage && (
        <div className="project-overview-cta">
          <Link className="button button--primary button--lg" to="/docs/projects">
            ← Back to Project Overview
          </Link>
        </div>
      )}
    </>
  );
}
