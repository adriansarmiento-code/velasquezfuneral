/**
 * ┌─────────────────────────────────────────────────────────┐
 * │  Velasquez Funeral — Prerender Script                   │
 * │  Runs AFTER vue-cli-service build                       │
 * │  Saves fully-rendered HTML for each public page         │
 * │  so Google reads real content instead of blank <div>    │
 * └─────────────────────────────────────────────────────────┘
 *
 * SETUP (run once):
 *   npm install --save-dev puppeteer serve
 *
 * Then update package.json scripts:
 *   "build:prod": "node generate-sitemap.js && vue-cli-service build && node prerender.js"
 *
 * HOW IT WORKS:
 *   1. Starts a local server serving your dist/ folder
 *   2. Puppeteer visits each page URL
 *   3. Waits for Vue to finish rendering
 *   4. Saves the rendered HTML to dist/[page]/index.html
 *   5. Hostinger then serves real HTML to Google on first crawl
 */

const puppeteer  = require('puppeteer')
const { execSync } = require('child_process')
const path       = require('path')
const fs         = require('fs')
const http       = require('http')
const axios      = require('axios')

// ── Config ────────────────────────────────────────────────
const DIST_DIR   = path.join(__dirname, 'dist')
const PORT       = 8765
const API_URL    = 'https://velasquez-funeral-api.onrender.com/api'
const SITE_URL   = `http://localhost:${PORT}`

// Static public routes to prerender (no admin, no dynamic params yet)
const STATIC_ROUTES = [
  '/',
  '/packages',
  '/blogs',
  '/add-ons',
  '/about',
  '/contact',
]

// ── Fetch blog slugs from API ─────────────────────────────
async function getBlogSlugs() {
  try {
    console.log('  📡 Fetching blog slugs from API...')
    const res  = await axios.get(`${API_URL}/blogs?published=true&limit=100`)
    const blogs = res.data?.data || []
    const slugs = blogs.map(b => `/blog/${b.slug}`).filter(Boolean)
    console.log(`  ✅ Found ${slugs.length} blog posts`)
    return slugs
  } catch (err) {
    console.warn(`  ⚠️  Could not fetch blogs: ${err.message}`)
    console.warn('     Blog posts will not be prerendered this build.')
    return []
  }
}

// ── Start a simple static file server ────────────────────
function startServer() {
  return new Promise((resolve) => {
    const handler = require('serve-handler')
    const server  = http.createServer((req, res) => {
      handler(req, res, {
        public: DIST_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }]
      })
    })
    server.listen(PORT, () => {
      console.log(`  🖥  Local server running at ${SITE_URL}`)
      resolve(server)
    })
  })
}

// ── Save HTML to the correct dist subfolder ───────────────
function saveHtml(route, html) {
  let filePath

  if (route === '/') {
    filePath = path.join(DIST_DIR, 'index.html')
  } else {
    // /packages      → dist/packages/index.html
    // /blog/my-slug  → dist/blog/my-slug/index.html
    const dir = path.join(DIST_DIR, ...route.split('/').filter(Boolean))
    fs.mkdirSync(dir, { recursive: true })
    filePath = path.join(dir, 'index.html')
  }

  fs.writeFileSync(filePath, html, 'utf8')
}

// ── Prerender a single route ──────────────────────────────
async function prerenderRoute(page, route) {
  const url = `${SITE_URL}${route}`

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

  // Wait for Vue to finish mounting — looks for any rendered content
  await page.waitForFunction(
    () => document.querySelector('#app')?.children.length > 0,
    { timeout: 15000 }
  ).catch(() => {
    console.warn(`    ⚠️  Timeout waiting for Vue on ${route} — saving anyway`)
  })

  // Extra wait for API-driven pages to load their data
  const apiRoutes = ['/packages', '/blogs', '/add-ons']
  if (apiRoutes.includes(route)) {
    await new Promise(r => setTimeout(r, 3000))
  }

  // Get the fully rendered HTML
  const html = await page.content()

  saveHtml(route, html)
}

// ── Main ──────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Starting prerender...\n')

  // Check dist exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ dist/ folder not found. Run vue-cli-service build first.')
    process.exit(1)
  }

  // Get all routes
  const blogRoutes = await getBlogSlugs()
  const allRoutes  = [...STATIC_ROUTES, ...blogRoutes]
  console.log(`\n  📄 Prerendering ${allRoutes.length} pages...\n`)

  // Start local server
  const server = await startServer()

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()

  // Suppress console noise from the app
  page.on('console', () => {})
  page.on('pageerror', () => {})

  let success = 0
  let failed  = 0

  for (const route of allRoutes) {
    try {
      process.stdout.write(`  ⏳ ${route}`)
      await prerenderRoute(page, route)
      process.stdout.write(`\r  ✅ ${route}\n`)
      success++
    } catch (err) {
      process.stdout.write(`\r  ❌ ${route} — ${err.message}\n`)
      failed++
    }
  }

  await browser.close()
  server.close()

  console.log(`\n─────────────────────────────────────`)
  console.log(`  ✅ Success: ${success} pages`)
  if (failed > 0) console.log(`  ❌ Failed:  ${failed} pages`)
  console.log(`\n  Your dist/ folder now has real HTML for every page.`)
  console.log(`  Upload it to Hostinger as usual.\n`)
}

main().catch(err => {
  console.error('\n❌ Prerender failed:', err.message)
  process.exit(1)
})