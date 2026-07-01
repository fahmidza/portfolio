import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import { ProjectAttachments } from '@site/src/theme/DocItem/Content';
import { usePluginData } from '@docusaurus/useGlobalData';
import ImageCarousel from '@site/src/components/ImageCarousel';
import Link from '@docusaurus/Link';

export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage, frontMatter, metadata} = useBlogPost();
  const reportFiles = frontMatter?.report_files || [];

  let images = [];
  try {
    const { blogDataMap } = usePluginData('plugin-blog-data');
    if (metadata?.permalink) {
      // permalink looks like '/portfolio/blog/tesblog'
      const slug = metadata.permalink.split('/').filter(Boolean).pop();
      console.log(`[DEBUG BLOG] slug=${slug}, keys=${Object.keys(blogDataMap || {}).join(',')}`);
      if (blogDataMap && blogDataMap[slug]) {
        images = blogDataMap[slug].images || [];
        console.log(`[DEBUG BLOG] Found images for ${slug}: ${images.length}`);
      } else {
        console.log(`[DEBUG BLOG] No images found in blogDataMap for ${slug}`);
      }
    }
  } catch(e) {
    console.error('[DEBUG BLOG] Error:', e.message);
  }

  if (!isBlogPostPage) {
    return (
      <div className={clsx('markdown', className)}>
        {images.length > 0 && (
          <div style={{ 
            marginBottom: '1.5rem', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid var(--color-border)',
            aspectRatio: '16/9',
            maxHeight: '400px',
            width: '100%'
          }}>
            <ImageCarousel images={images} />
          </div>
        )}
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1rem' }}>
          {frontMatter.description || metadata.description || 'Click the button below to read the full article.'}
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link to={metadata.permalink} className="button button--primary button--outline button--sm">
            <b>Read More</b>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      // This ID is used for the feed generation to locate the main content
      id={isBlogPostPage ? blogPostContainerID : undefined}
      className={clsx('markdown', className)}>
      <MDXContent>{children}</MDXContent>
      {isBlogPostPage && <ProjectAttachments reportFiles={reportFiles} />}
    </div>
  );
}
