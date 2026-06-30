import React, { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import useBaseUrl from '@docusaurus/useBaseUrl';

function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');
  
  // Convert absolute paths like /img/... to /portfolio/img/... using Docusaurus router
  const fullResumeUrl = useBaseUrl(resumeUrl);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;

    // Listen for clicks on elements with the 'resume-popup-trigger' class
    const handleClick = (e) => {
      // Find closest trigger (handles clicks on child SVG/span elements)
      const trigger = e.target.closest('.resume-popup-trigger') || e.target.closest('.resume-popup-trigger-wrapper');
      
      if (trigger) {
        e.preventDefault(); // Prevent navigating to '#'
        let url = trigger.getAttribute('data-resume-url');
        if (!url) {
          const span = trigger.querySelector('[data-resume-url]');
          if (span) url = span.getAttribute('data-resume-url');
        }
        setResumeUrl(url || '');
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    
    if (isOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !resumeUrl) return null;

  return (
    <div 
      className="resume-modal-overlay" 
      onClick={() => setIsOpen(false)}
    >
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <div className="resume-modal-actions">
            <a href={fullResumeUrl} download className="resume-modal-btn resume-download-btn" title="Download PDF">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <button className="resume-modal-btn resume-close-btn" onClick={() => setIsOpen(false)} title="Close">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe 
            src={ExecutionEnvironment.canUseDOM && window.innerWidth <= 768 ? `https://docs.google.com/gview?url=${encodeURIComponent('https://fahmidza.github.io/portfolio' + resumeUrl)}&embedded=true` : fullResumeUrl} 
            className="resume-modal-iframe" 
            title="Resume PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
}

export default function Root({children}) {
  return (
    <>
      {children}
      <ResumeModal />
    </>
  );
}
