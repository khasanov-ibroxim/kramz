const fs = require('fs');
const path = require('path');

const baseUrl = 'https://gurlanglobalteks.uz';
const locales = ['ru', 'en'];

const pages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'about', priority: '0.9', changefreq: 'monthly' },
  { path: 'production', priority: '0.9', changefreq: 'monthly' },
  { path: 'products', priority: '0.9', changefreq: 'weekly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
];

function generateSitemap() {
  const currentDate = new Date().toISOString();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  pages.forEach(page => {
    locales.forEach(locale => {
      const url = page.path ? `${locale}/${page.path}` : locale;

      sitemap += `  <url>
    <loc>${baseUrl}/${url}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
`;

      // Add hreflang links
      locales.forEach(altLocale => {
        const altUrl = page.path ? `${altLocale}/${page.path}` : altLocale;
        sitemap += `    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altUrl}/" />
`;
      });

      sitemap += `  </url>
`;
    });
  });

  sitemap += `</urlset>`;

  // Write sitemap to public folder
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');

  console.log('✅ Sitemap generated successfully at:', sitemapPath);
}

generateSitemap();
