/**
 * Velasquez Funeral & Chapel — Sitemap Generator
 * ------------------------------------------------
 * Fetches all published blogs from the API and writes
 * a fresh sitemap.xml to /public/sitemap.xml.
 *
 * Usage:
 *   node generate-sitemap.js
 *
 * Add to package.json scripts:
 *   "sitemap": "node generate-sitemap.js"
 *
 * Run before every production build, or any time you
 * publish a new blog post.
 */

const https = require('https')
const http  = require('http')
const fs    = require('fs')
const path  = require('path')

// ── Config ────────────────────────────────────────────────────────────────
const BASE_URL  = 'https://velasquezfuneral.com'
const API_URL   = 'https://velasquez-funeral-api.onrender.com/api'
const OUT_FILE  = path.join(__dirname, 'public', 'sitemap.xml')
const TODAY     = new Date().toISOString().split('T')[0]  // YYYY-MM-DD

// ── Static pages (always included) ───────────────────────────────────────
const STATIC_PAGES = [
  { path: '/',        changefreq: 'weekly',  priority: '1.0' },
  { path: '/packages', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact',  changefreq: 'yearly',  priority: '0.9' },
  { path: '/blogs',    changefreq: 'weekly',  priority: '0.8' },
  { path: '/about',    changefreq: 'yearly',  priority: '0.8' },
  { path: '/add-ons',  changefreq: 'monthly', priority: '0.7' },
]

// ── Helpers ───────────────────────────────────────────────────────────────
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    client.get(url, res => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(data)) }
        catch (e) { reject(new Error(`JSON parse error from ${url}: ${e.message}`)) }
      })
    }).on('error', reject)
  })
}

function escapeXml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&apos;')
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n')
}

// ── Main ──────────────────────────────────────────────────────────────────
async function generateSitemap() {
  console.log('🗺  Generating sitemap…')

  // 1. Static pages
  const staticEntries = STATIC_PAGES.map(p =>
    urlEntry({
      loc:        `${BASE_URL}${p.path}`,
      lastmod:    TODAY,
      changefreq: p.changefreq,
      priority:   p.priority,
    })
  )

  // 2. Dynamic blog pages
  let blogEntries = []
  try {
    console.log(`   Fetching blogs from ${API_URL}/blogs …`)
    const json = await fetchJSON(`${API_URL}/blogs`)

    const blogs = json.data || []
    console.log(`   Found ${blogs.length} published blog(s)`)

    blogEntries = blogs
      .filter(b => b.slug)   // skip any with missing slug
      .map(b => urlEntry({
        loc:        `${BASE_URL}/blog/${encodeURIComponent(b.slug)}`,
        lastmod:    b.updatedAt
                      ? b.updatedAt.split('T')[0]
                      : (b.createdAt ? b.createdAt.split('T')[0] : TODAY),
        changefreq: 'monthly',
        priority:   '0.7',
      }))
  } catch (err) {
    console.warn(`   ⚠️  Could not fetch blogs: ${err.message}`)
    console.warn('   Sitemap will be generated without dynamic blog entries.')
  }

  // 3. Assemble XML
  const allEntries = [...staticEntries, ...blogEntries]
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    `  <!-- Generated: ${new Date().toISOString()} -->`,
    `  <!-- Static pages: ${staticEntries.length} | Blog posts: ${blogEntries.length} | Total: ${allEntries.length} -->`,
    '',
    allEntries.join('\n\n'),
    '',
    '</urlset>',
    '',
  ].join('\n')

  // 4. Write file
  fs.writeFileSync(OUT_FILE, xml, 'utf8')
  console.log(`✅ Sitemap written to ${OUT_FILE}`)
  console.log(`   ${allEntries.length} URLs total (${staticEntries.length} static + ${blogEntries.length} blogs)`)
  console.log('')
  console.log('Next steps:')
  console.log('  1. Run `npm run build` to include the new sitemap in your dist/')
  console.log('  2. Submit https://velasquezfuneral.com/sitemap.xml in Google Search Console')
}

generateSitemap().catch(err => {
  console.error('❌ Sitemap generation failed:', err.message)
  process.exit(1)
})