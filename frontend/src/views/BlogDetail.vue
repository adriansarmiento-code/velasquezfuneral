<template>
  <div>
    <Navbar />

    <!-- LOADING -->
    <div v-if="loading" class="page-loader" style="padding-top:calc(73px + 8rem);">
      <div class="page-loader__ring"></div>
      <p class="page-loader__text">Loading article...</p>
    </div>

    <!-- ERROR -->
    <div v-else-if="error" style="min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:3rem;padding-top:calc(73px + 3rem);">
      <div>
        <p class="overline" style="margin-bottom:1rem">404 · Not Found</p>
        <h1 class="display-sm" style="margin-bottom:1rem">Blog Not Found</h1>
        <p class="serif-sm" style="color:var(--iron);margin-bottom:2rem">{{ error }}</p>
        <router-link to="/blogs" class="btn btn--primary btn--cta">Back to Blogs</router-link>
      </div>
    </div>

    <!-- ARTICLE -->
    <article v-else-if="blog" class="blog-article-page">

      <!-- HERO HEADER -->
      <header class="blog-article-header">
        <div class="container container--sm">
          <div class="blog-article-header__meta reveal">
            <span v-if="blog.createdAt" class="label--sm" style="color:var(--stone)">{{ formatDate(blog.createdAt) }}</span>
            <span class="label--sm c-amber">Published by: {{ blog.publishedBy || 'Velasquez Funeral and Chapel' }}</span>
          </div>
          <h1 class="display-lg reveal reveal--d1" style="margin-bottom:var(--sp-6);max-width:820px;margin-inline:auto;text-align:center;">
            {{ blog.title }}
          </h1>
          <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin:0 auto var(--sp-8);"></div>
          <p v-if="blog.excerpt" class="serif-xl reveal reveal--d3" style="color:var(--iron);font-style:italic;text-align:center;max-width:680px;margin-inline:auto;">
            {{ blog.excerpt }}
          </p>
        </div>
      </header>

      <!-- HERO IMAGE -->
      <div v-if="blog.image" class="blog-article-hero-img reveal" style="max-width:1000px;margin-inline:auto;padding-inline:var(--sp-8);margin-bottom:0;">
        <img :src="getImageUrl(blog.image)" :alt="blog.title" style="width:100%;border:2px solid var(--border);display:block;" />
      </div>

      <!-- CONTENT BODY -->
      <section class="section" style="padding-top:var(--sp-20);">
        <div class="container container--xs">
          <div class="blog-article-content" v-html="blog.content"></div>
        </div>
      </section>

      <!-- CTA STRIP -->
      <section class="section section--midnight" style="text-align:center;">
        <div class="container container--sm">
          <p class="overline reveal" style="margin-bottom:var(--sp-6)">Velasquez Funeral &amp; Chapel</p>
          <h2 class="display-md c-ivory reveal reveal--d1" style="margin-bottom:var(--sp-8)">
            We're Here to Help <em class="em-gold">24/7</em>
          </h2>
          <p class="serif-body reveal reveal--d2" style="color:rgba(248,244,239,0.82);margin-bottom:var(--sp-12);max-width:680px;margin-inline:auto;">
            At Velasquez Funeral &amp; Chapel, our compassionate team is available around the clock to guide
            you through every step of the funeral planning process. As Cabiao's trusted funeral service
            provider since 1970, we offer affordable funeral packages, professional embalming, burial
            coordination, and chapel venue services.
          </p>
          <router-link to="/contact" class="btn btn--ghost btn--cta reveal reveal--d3">
            Contact Us Anytime
          </router-link>
        </div>
      </section>

      <!-- BACK LINK -->
      <div class="section section--warm" style="text-align:center;padding-block:var(--sp-16);">
        <router-link to="/blogs" class="btn btn--ghost-dark btn--cta">
          ← Back to All Blogs
        </router-link>
      </div>

    </article>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'
import seoMeta from '@/mixins/seoMeta'

export default {
  name: 'BlogDetailPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      blog:    null,
      loading: false,
      error:   null,
      seoTitle:       '',
      seoDescription: '',
      seoKeywords:    '',
      seoImage:       ''
    }
  },
  watch: {
    blog(newBlog) {
      if (newBlog) {
        this.seoTitle       = newBlog.title
        this.seoDescription = newBlog.excerpt
        this.seoKeywords    = `${newBlog.title}, funeral planning, funeral services, Cabiao Nueva Ecija, ${newBlog.publishedBy || 'Velasquez Funeral'}`
        this.seoImage       = newBlog.image || 'https://velasquezfuneral.com/images/funeral-blog.jpg'
      }
    },
    '$route.params.slug'() {
      this.loadBlog()
    }
  },
  mounted() {
    this.loadBlog()
  },
  methods: {
    async loadBlog() {
      this.loading = true
      this.error   = null
      try {
        const slug     = this.$route.params.slug
        const response = await api.getBlog(slug)
        this.blog      = response.data.data
      } catch (error) {
        console.error('Error loading blog:', error)
        this.error = 'Blog post not found or has been removed.'
      } finally {
        this.loading = false
        this.$nextTick(() => this.initScrollAnimations())
      }
    },

    getImageUrl(url) {
      if (!url) return ''
      if (/^https?:\/\//i.test(url)) return url
      if (/^\/\//.test(url)) return window.location.protocol + url
      const base = process.env.VUE_APP_API_URL || 'http://localhost:5000'
      return base.replace(/\/api\/?$/, '') + url
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },

    renderContent(content) {
      if (!content) return ''
      if (/</.test(content) && />/.test(content)) return content
      return content
        .split('\n\n')
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('')
    },

    initScrollAnimations() {
      const reveals = document.querySelectorAll('.reveal')
      const run = () => {
        reveals.forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('is-visible')
        })
      }
      window.addEventListener('scroll', run, { passive: true })
      run()
    }
  }
}
</script>

<style scoped>
/* Header zone */
.blog-article-header {
  background: linear-gradient(to bottom, var(--bg-warm), var(--bg));
  padding: calc(73px + var(--sp-20)) 0 var(--sp-20);
}
.blog-article-header__meta {
  display: flex;
  align-items: center;
  gap: var(--sp-6);
  justify-content: center;
  margin-bottom: var(--sp-8);
}

/* Article body — rich text styling */
.blog-article-content {
  font-family: var(--font-serif);
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  line-height: 1.9;
  color: var(--iron);
}
.blog-article-content :deep(p) {
  margin-bottom: 1.8rem;
}
.blog-article-content :deep(h2) {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  color: var(--amber);
  font-weight: 600;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  line-height: 1.2;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}
.blog-article-content :deep(h3) {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.7rem);
  color: var(--onyx);
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}
.blog-article-content :deep(h4) {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--onyx);
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.blog-article-content :deep(ul),
.blog-article-content :deep(ol) {
  padding-left: 2rem;
  margin-bottom: 1.8rem;
  list-style: revert;
}
.blog-article-content :deep(li) {
  margin-bottom: 0.6rem;
  line-height: 1.75;
}
.blog-article-content :deep(strong) {
  color: var(--onyx);
  font-weight: 700;
}
.blog-article-content :deep(em) {
  color: var(--iron);
}
.blog-article-content :deep(blockquote) {
  border-left: 3px solid var(--amber);
  padding: 1.5rem 2rem;
  margin: 2.5rem 0;
  background: var(--bg-warm);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--stone);
}
.blog-article-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 2rem 0;
  border: 2px solid var(--border);
}
.blog-article-content :deep(a) {
  color: var(--amber);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.blog-article-content :deep(a:hover) {
  color: var(--amber-deep);
}
</style>