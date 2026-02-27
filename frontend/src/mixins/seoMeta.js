/**
 * seoMeta mixin
 * Directly sets document.title and meta tags on mount and route change.
 * No vue-meta API dependency — works with any vue-meta version or none.
 *
 * Usage in any page component:
 *   import seoMeta from '@/mixins/seoMeta'
 *   mixins: [seoMeta],
 *   data() { return {
 *     seoTitle: 'Your Page Title',
 *     seoDescription: 'Your description.',
 *     seoKeywords: 'keyword1, keyword2',
 *     seoImage: 'https://...'
 *   }}
 */

const SITE_NAME = 'Velasquez Funeral and Chapel'
const BASE_URL  = 'https://velasquezfuneral.com'
const DEFAULT_IMAGE = `${BASE_URL}/images/velasquez-funeral-og.jpg`
const DEFAULT_DESC  = 'Compassionate funeral services in Cabiao, Nueva Ecija since 1970. Available 24/7.'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  if (!href) return
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function applyMeta(ctx) {
  const title       = ctx.seoTitle       || SITE_NAME
  const description = ctx.seoDescription || DEFAULT_DESC
  const keywords    = ctx.seoKeywords    || 'funeral services Cabiao, funeral home Nueva Ecija'
  const image       = ctx.seoImage       || DEFAULT_IMAGE
  const url         = `${BASE_URL}${ctx.$route?.path || ''}`
  const fullTitle   = `${title} | ${SITE_NAME}`

  // Page title
  document.title = fullTitle

  // Standard
  setMeta('description',   description)
  setMeta('keywords',      keywords)

  // Open Graph
  setMeta('og:type',        'website',    'property')
  setMeta('og:site_name',   SITE_NAME,    'property')
  setMeta('og:title',       fullTitle,    'property')
  setMeta('og:description', description,  'property')
  setMeta('og:image',       image,        'property')
  setMeta('og:url',         url,          'property')
  setMeta('og:locale',      'en_PH',      'property')

  // Twitter
  setMeta('twitter:card',        'summary_large_image')
  setMeta('twitter:title',       fullTitle)
  setMeta('twitter:description', description)
  setMeta('twitter:image',       image)

  // Canonical
  setLink('canonical', url)
}

export default {
  mounted() {
    applyMeta(this)
  },

  watch: {
    // Re-apply if data changes after mount (e.g. BlogDetail loads blog from API)
    seoTitle()       { applyMeta(this) },
    seoDescription() { applyMeta(this) },
    seoImage()       { applyMeta(this) },
    '$route.path'()  { applyMeta(this) },
  }
}