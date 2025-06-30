// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

// Site configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://salairenet.ma';

// Define your pages
const pages = [
  {
    url: '/',
    changeFreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/a-propos',
    changeFreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/code-du-travail',
    changeFreq: 'monthly',
    priority: 0.7
  },
  {
    url: '/faq',
    changeFreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/mentions-legales',
    changeFreq: 'yearly',
    priority: 0.3
  },
  {
    url: '/politique-confidentialite',
    changeFreq: 'yearly',
    priority: 0.3
  }
];

function generateSitemap() {
  const today = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to public directory for static export
  //const publicDir = path.join(__dirname, '..', 'public');
  //const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  //fs.writeFileSync(sitemapPath, sitemap);
  //console.log('✅ Sitemap generated successfully at:', sitemapPath);
}

generateSitemap();
