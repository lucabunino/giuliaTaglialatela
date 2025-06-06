import { getArchive } from '$lib/utils/sanity';
import { urlFor } from '$lib/utils/image';
let baseUrl = "https://www.giuliataglialatela.com"

export async function GET() {
  // Fetch archive from the sanity utility
  const archive = await getArchive();

  // Create XML for individual project pages with their corresponding images
  const archiveSlugsXML = archive.map(project => {
    return `
      <url>
        <loc>${baseUrl}/archive/${project.slug.current}</loc>
        <lastmod>${project.year}</lastmod>
        <priority>0.80</priority>
        <image:image>
          <image:loc>${urlFor(project.thumbnail).url()}</image:loc>
        </image:image>
      </url>`;
  }).join('');

  // Build the complete sitemap
  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    >
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${baseUrl}/info</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
	  <url>
        <loc>${baseUrl}/interior</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
	  <url>
        <loc>${baseUrl}/commercial</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${baseUrl}/archive</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>0.80</priority>
      </url>
      ${archiveSlugsXML}
    </urlset>`.trim(),
    {
		headers: {
		'Content-Type': 'application/xml',
		'Cache-Control': 's-maxage=3600'
		}
    }
  );
}
