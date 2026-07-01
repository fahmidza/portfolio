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

const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
const DOC_EXTENSIONS = ['html', 'htm', 'pdf'];
const EMBEDDABLE_EXTENSIONS = [...DOC_EXTENSIONS, ...IMAGE_EXTENSIONS];

function AttachmentItem({ item, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const ext = getFileExtension(item.file);
  const isEmbeddable = EMBEDDABLE_EXTENSIONS.includes(ext);
  const isImage = IMAGE_EXTENSIONS.includes(ext);
  const resolvedUrl = useBaseUrl(item.file);

  if (isEmbeddable) {
    return (
      <div className="project-attachment-item">
        {/* Header bar: label + action buttons */}
        <div className="project-attachment-item__header">
          <h3 className="project-attachment-item__label">
            {isImage ? '🖼️' : ext === 'pdf' ? '📄' : '🌐'} {item.label || `File ${index + 1}`}
          </h3>
          <div className="project-attachment-item__actions">
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-attachment-item__btn project-attachment-item__btn--outline"
              title="Open in new tab"
            >
              ↗ Open
            </a>
            <button
              className="project-attachment-item__btn project-attachment-item__btn--primary"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? '▲ Collapse' : '▼ Expand'}
            </button>
          </div>
        </div>

        {/* Collapsible embed area */}
        {isExpanded && (
          <div className="project-attachment-item__embed" style={isImage ? { padding: '1rem', textAlign: 'center', background: 'var(--color-surface-elevated)' } : {}}>
            {isImage ? (
              <img
                src={resolvedUrl}
                alt={item.label || `Attachment ${index + 1}`}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                loading="lazy"
              />
            ) : (
              <iframe
                src={resolvedUrl}
                title={item.label || `Attachment ${index + 1}`}
                className="project-attachment-item__iframe"
                loading="lazy"
                allowFullScreen
              />
            )}
          </div>
        )}
      </div>
    );
  }

  // Non-embeddable: show download button (no collapse needed)
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

export function ProjectAttachments({ reportFiles }) {

  if (!reportFiles || reportFiles.length === 0) return null;

  const embeddableCount = reportFiles.filter(f => EMBEDDABLE_EXTENSIONS.includes(getFileExtension(f.file))).length;

  return (
    <div className="project-attachments">
      {/* Title bar with global toggle */}
      <div className="project-attachments__header">
        <h2 id="attachments" className="project-attachments__title">Attachments</h2>
        {embeddableCount > 0 && (
          <div className="project-attachments__header-actions">
            <span className="project-attachments__count">
              {embeddableCount} file{embeddableCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
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
