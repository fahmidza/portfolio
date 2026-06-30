import React, { useEffect, useMemo, useState } from 'react';
import Content from '@theme-original/DocItem/Content';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import ProjectHero from '@site/src/components/ProjectHero';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

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

function getFileExtension(filePath) {
  if (!filePath) return '';
  return filePath.split('.').pop().toLowerCase();
}

function AttachmentItem({ item, index }) {
  const ext = getFileExtension(item.file);
  const isEmbeddable = ['html', 'htm', 'pdf'].includes(ext);
  const resolvedUrl = useBaseUrl(item.file);

  if (isEmbeddable) {
    return (
      <div className="project-attachment-item">
        <h3 className="project-attachment-item__label">
          {ext === 'pdf' ? '📄' : '🌐'} {item.label || `File ${index + 1}`}
        </h3>
        <div className="project-attachment-item__embed">
          <iframe
            src={resolvedUrl}
            title={item.label || `Attachment ${index + 1}`}
            className="project-attachment-item__iframe"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Non-embeddable: show download button
  return (
    <div className="project-attachment-item">
      <a
        href={resolvedUrl}
        download
        className="project-attachment-item__download"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="project-attachment-item__download-icon">📥</span>
        <span className="project-attachment-item__download-text">
          <strong>{item.label || `File ${index + 1}`}</strong>
          <small>.{ext} file</small>
        </span>
      </a>
    </div>
  );
}

function ProjectAttachments({ reportFiles }) {
  if (!reportFiles || reportFiles.length === 0) return null;

  return (
    <div className="project-attachments">
      <h2 className="project-attachments__title">📎 Lampiran / Attachments</h2>
      <div className="project-attachments__list">
        {reportFiles.map((item, index) => (
          <AttachmentItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

export default function ContentWrapper(props) {
  const { metadata, frontMatter } = useDoc();

  // Only show the ProjectHero on project detail pages (not the index)
  const isProjectPage =
    metadata.permalink &&
    metadata.permalink.includes('/docs/projects/') &&
    !metadata.permalink.endsWith('/docs/projects') &&
    !metadata.permalink.endsWith('/docs/projects/');

  const reportFiles = frontMatter?.report_files || [];

  return (
    <>
      {isProjectPage && <ProjectReadingProgress />}
      {isProjectPage && <ProjectHero />}
      <Content {...props} />
      {isProjectPage && <ProjectAttachments reportFiles={reportFiles} />}
      {isProjectPage && (
        <div className="project-overview-cta">
          <Link className="button button--primary button--lg" to="/docs/projects">
            ← Back to Projects Home
          </Link>
        </div>
      )}
    </>
  );
}
