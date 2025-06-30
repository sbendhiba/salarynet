import { NextRequest, NextResponse } from 'next/server';
import { generateSitemap, sitePages } from '@/utils/sitemap';

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://salairenet.ma';
  
  const sitemap = generateSitemap(sitePages, baseUrl);
  
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  });
}
