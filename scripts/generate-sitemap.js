/**
 * generate-sitemap.js
 *
 * Generates public/sitemap.xml before `next build` so the file is included
 * in the static export (output: 'export').
 *
 * lastmod is derived from the most recent git commit that touched the page's
 * source file. Falls back to today's date when git is unavailable.
 *
 * Usage (automatically called via npm run prebuild):
 *   node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://salairenet.ma';

const routeMetadata = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/guide-salaire/': { priority: '0.9', changefreq: 'monthly' },
  '/faq/': { priority: '0.8', changefreq: 'weekly' },
  '/code-du-travail/': { priority: '0.7', changefreq: 'monthly' },
  '/a-propos/': { priority: '0.8', changefreq: 'monthly' },
  '/mentions-legales/': { priority: '0.3', changefreq: 'yearly' },
  '/politique-confidentialite/': { priority: '0.3', changefreq: 'yearly' },
};

const defaultRouteMetadata = { priority: '0.7', changefreq: 'monthly' };

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function listPageFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('(')) {
      continue;
    }

    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        continue;
      }
      results.push(...listPageFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === 'page.tsx') {
      results.push(entryPath);
    }
  }

  return results;
}

function getStaticRoutes() {
  const appDir = path.join(__dirname, '..', 'src', 'app');

  if (!fs.existsSync(appDir)) {
    console.warn('⚠️  src/app directory not found');
    return [];
  }

  const pageFiles = listPageFiles(appDir);
  const routeMap = new Map();

  for (const pageFile of pageFiles) {
    const relativeDir = path.relative(appDir, path.dirname(pageFile));
    const route = relativeDir === '' ? '/' : `/${relativeDir.replace(/\\/g, '/')}/`;

    let mtime;
    try {
      const gitDate = execSync(`git log -1 --format="%cI" -- "${pageFile}"`, {
        encoding: 'utf8',
        cwd: path.join(__dirname, '..'),
      }).trim();
      if (gitDate) {
        mtime = formatDate(new Date(gitDate));
      } else {
        throw new Error('No git history');
      }
    } catch {
      const stats = fs.statSync(pageFile);
      mtime = formatDate(stats.mtime);
    }

    routeMap.set(route, mtime);
  }

  return Array.from(routeMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
}

function generateSitemapXML(routes) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const [route, mtime] of routes) {
    const metadata = routeMetadata[route] || defaultRouteMetadata;
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${route}</loc>\n`;
    xml += `    <lastmod>${mtime}</lastmod>\n`;
    xml += `    <changefreq>${metadata.changefreq}</changefreq>\n`;
    xml += `    <priority>${metadata.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}

function main() {
  console.log('🚀 Generating sitemap.xml...');

  const staticRoutes = getStaticRoutes();
  const sitemapXML = generateSitemapXML(staticRoutes);

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXML, 'utf8');

  console.log(`✅ Sitemap generated at ${outputPath}`);
  console.log(`📄 Total URLs: ${staticRoutes.length}`);
}

main();
