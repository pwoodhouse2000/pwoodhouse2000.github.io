#!/usr/bin/env node

/**
 * RSS Feed Generator for Valid State Advisory
 * 
 * Reads posts.json and generates feed.xml
 * Run: node generate-rss.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://validstateadvisory.com';
const SITE_TITLE = 'Pete Woodhouse - Thoughts';
const SITE_DESCRIPTION = 'Technology leadership insights from Pete Woodhouse, fractional CTO and embedded advisor.';
const AUTHOR_NAME = 'Pete Woodhouse';
const AUTHOR_EMAIL = 'pete@validstateadvisory.com';

// Read posts
const postsPath = path.join(__dirname, 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const posts = postsData.posts || [];

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate RSS XML
const buildDate = new Date().toUTCString();
const latestPostDate = posts.length > 0 ? new Date(posts[0].date).toUTCString() : buildDate;

let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${latestPostDate}</pubDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
`;

// Add items
posts.forEach(post => {
  const postDate = new Date(post.date).toUTCString();
  const postUrl = `${SITE_URL}#${post.id}`;
  const tags = (post.tags || []).map(tag => `#${tag}`).join(' ');
  
  // Escape XML special characters
  const escapeXml = (str) => {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;');
  };
  
  const content = escapeXml(post.content);
  const fullContent = tags ? `${content} ${tags}` : content;
  
  rss += `
    <item>
      <title>${escapeXml(post.content.substring(0, 60))}${post.content.length > 60 ? '...' : ''}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${postDate}</pubDate>
      <description>${fullContent}</description>
    </item>`;
});

rss += `
  </channel>
</rss>`;

// Write feed
const feedPath = path.join(__dirname, 'feed.xml');
fs.writeFileSync(feedPath, rss, 'utf8');

console.log(`✅ RSS feed generated: ${feedPath}`);
console.log(`   Posts included: ${posts.length}`);
