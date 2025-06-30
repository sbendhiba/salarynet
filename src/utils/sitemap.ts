// utils/sitemap.ts
export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (entries: SitemapEntry[], baseUrl: string): string => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const url = `<url>
  <loc>${baseUrl}${entry.url}</loc>
  ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ''}
  ${entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''}
  ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
</url>`;
    return url;
  }).join('\n');

  return `${xmlHeader}
${urlsetOpen}
${urls}
${urlsetClose}`;
};

export const sitePages: SitemapEntry[] = [
  {
    url: '/',
    changeFrequency: 'weekly',
    priority: 1.0,
    lastModified: new Date().toISOString()
  },
  {
    url: '/a-propos',
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: new Date().toISOString()
  },
  {
    url: '/code-du-travail',
    changeFrequency: 'monthly',
    priority: 0.7,
    lastModified: new Date().toISOString()
  },
  {
    url: '/faq',
    changeFrequency: 'weekly',
    priority: 0.8,
    lastModified: new Date().toISOString()
  },
  {
    url: '/mentions-legales',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date().toISOString()
  },
  {
    url: '/politique-confidentialite',
    changeFrequency: 'yearly',
    priority: 0.3,
    lastModified: new Date().toISOString()
  }
];
