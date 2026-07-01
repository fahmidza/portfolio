import React from 'react';
import clsx from 'clsx';
import {blogPostContainerID} from '@docusaurus/utils-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import MDXContent from '@theme/MDXContent';
import { ProjectAttachments } from '@site/src/theme/DocItem/Content';
import { usePluginData } from '@docusaurus/useGlobalData';
import ImageCarousel from '@site/src/components/ImageCarousel';

export default function BlogPostItemContent({children, className}) {
  const {isBlogPostPage, frontMatter, metadata} = useBlogPost();
  const reportFiles = frontMatter?.report_files || [];

  let images = [];
  try {
    const { blogDataMap } = usePluginData('plugin-blog-data');
    if (metadata?.source) {
      // metadata.source looks like '@site/blog/2023-01-01-my-post.md'
      const filename = metadata.source.split('/').pop();
      if (blogDataMap && blogDataMap[filename]) {
        images = blogDataMap[filename].images || [];
      }
    }
  } catch(e) {
    // Plugin data not found or error
  }

  if (!isBlogPostPage) {
    return (
      <div className={clsx('markdown', className)}>
        {images.length > 0 && (
          <div style={{ marginBottom: '1.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <ImageCarousel images={images} />
          </div>
        )}
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1rem' }}>
          {frontMatter.description || 'Click below to read the full article.'}
        </p>
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
