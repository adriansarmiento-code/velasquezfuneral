<template>
  <div>
    <Navbar />

    <!-- PAGE HERO -->
    <header class="page-hero-text" style="padding-top:calc(var(--nav-height) + var(--sp-24));padding-bottom:var(--sp-20);">
      <div class="container container--sm" style="text-align:center;">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Resources &amp; Insights</p>
        <h1 class="display-lg reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Stories of <em class="em-gold">Grace</em>,<br>
          Wisdom for the Journey
        </h1>
        <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin:0 auto var(--sp-8);"></div>
        <p class="serif-lg reveal reveal--d3" style="color:var(--iron);font-style:italic;max-width:600px;margin-inline:auto;">
          Thoughtful guidance, personal stories, and compassionate advice to help you navigate
          life's most difficult moments with dignity and understanding.
        </p>
      </div>
    </header>

    <!-- BLOG GRID -->
    <section class="section section--warm">
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="page-loader">
          <div class="page-loader__ring"></div>
          <p class="page-loader__text">Gathering our stories...</p>
        </div>

        <!-- Editorial grid -->
        <div v-else-if="blogs.length > 0" class="blogs-grid">
          <article
            v-for="(blog, index) in blogs"
            :key="blog._id"
            class="blog-card reveal"
            :class="{ 'blog-card--featured': index === 0 }"
          >
            <router-link :to="`/blog/${blog.slug}`" class="blog-card__link">

              <div class="blog-card__visual">
                <img v-if="blog.image" :src="blog.image" :alt="blog.title" class="blog-card__img" />
                <div v-else class="img-ph" :style="index === 0 ? 'width:100%;min-height:380px;' : 'width:100%;min-height:240px;'">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <div class="blog-card__overlay">
                  <span class="label--sm" style="color:var(--linen);">Read Article</span>
                </div>
              </div>

              <div class="blog-card__body">
                <div class="blog-card__meta">
                  <span v-if="blog.createdAt" class="label--sm" style="color:var(--text-muted)">{{ formatDate(blog.createdAt) }}</span>
                  <span v-if="blog.category" class="blog-card__tag">{{ blog.category }}</span>
                </div>
                <h2 class="blog-card__title" :class="index === 0 ? 'display-sm' : 'display-xs'">{{ blog.title }}</h2>
                <p class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-6)">{{ blog.excerpt }}</p>
                <div class="blog-card__cta">
                  <span class="label--sm" style="color:var(--amber)">Continue Reading</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--amber)"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>

            </router-link>
          </article>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <h3 style="margin-bottom:var(--sp-4)">No Stories Yet</h3>
          <p>We're working on sharing helpful resources and stories. Check back soon!</p>
        </div>

      </div>
    </section>

    <!-- CONNECT CTA -->
    <section class="section" style="text-align:center;">
      <div class="container container--xs">
        <div class="blogs-connect reveal">
          <div class="blogs-connect__icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <p class="overline" style="margin-bottom:var(--sp-4)">Stay Connected</p>
          <h2 class="display-md" style="margin-bottom:var(--sp-6)">Stay Connected<br>With Our Stories</h2>
          <p class="serif-lg" style="color:var(--iron);font-style:italic;margin-bottom:var(--sp-10)">
            Receive thoughtful guidance and compassionate insights.
          </p>
          <router-link to="/contact" class="btn btn--primary btn--cta">Get In Touch</router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'
import seoMeta from '@/mixins/seoMeta'

export default {
  name: 'BlogsPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      blogs:   [],
      loading: false,
      seoTitle:       'Funeral Planning Guides & Resources',
      seoDescription: 'Helpful articles and guides about funeral planning, etiquette, burial services, and grief support.',
      seoKeywords:    'funeral planning guide, funeral etiquette Philippines, burial planning, grief support, memorial service ideas',
      seoImage:       'https://velasquezfuneral.com/images/funeral-blog.jpg',
    }
  },
  mounted() {
    this.loadBlogs()
  },
  methods: {
    async loadBlogs() {
      this.loading = true
      try {
        const response = await api.getBlogs()
        this.blogs = response.data.data
      } catch (error) {
        console.error('Error loading blogs:', error)
      } finally {
        this.loading = false
        this.$nextTick(() => this.initScrollAnimations())
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    },
    initScrollAnimations() {
      const reveals = document.querySelectorAll('.reveal')
      const run = () => { reveals.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('is-visible') }) }
      window.addEventListener('scroll', run, { passive: true })
      run()
    }
  }
}
</script>

<style scoped>
/* Masonry-style blog grid: first card spans 2 columns */
.blogs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-8);
}
.blog-card--featured {
  grid-column: span 2;
}

.blog-card {
  border: 1px solid var(--border);
  overflow: hidden;
  background: var(--bg);
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.blog-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: var(--amber); }

.blog-card__link { display: flex; flex-direction: column; height: 100%; text-decoration: none; }

.blog-card__visual { position: relative; overflow: hidden; }
.blog-card__img { width: 100%; object-fit: cover; display: block; transition: transform 0.7s var(--ease-out); }
.blog-card--featured .blog-card__img { min-height: 340px; }
.blog-card:not(.blog-card--featured) .blog-card__img { min-height: 200px; }
.blog-card:hover .blog-card__img { transform: scale(1.04); }
.blog-card__overlay {
  position: absolute; inset: 0;
  background: rgba(15,14,12,0.35);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity var(--dur-base) var(--ease-out);
}
.blog-card:hover .blog-card__overlay { opacity: 1; }

.blog-card__body { padding: var(--sp-8); flex: 1; display: flex; flex-direction: column; }

.blog-card__meta {
  display: flex; align-items: center; gap: var(--sp-4);
  margin-bottom: var(--sp-4);
}
.blog-card__tag {
  font-family: var(--font-sans); font-size: var(--text-2xs);
  letter-spacing: var(--ls-wider); text-transform: uppercase;
  background: rgba(196,148,74,0.12); color: var(--amber);
  padding: 0.2rem 0.6rem;
}
.blog-card__title { margin-bottom: var(--sp-4); }

.blog-card__cta {
  display: flex; align-items: center; gap: var(--sp-3);
  margin-top: auto; padding-top: var(--sp-6);
  border-top: 1px solid var(--border);
}

/* Connect section */
.blogs-connect {
  padding: var(--sp-16);
  border: 1px solid var(--border);
  background: var(--bg-warm);
}
.blogs-connect__icon {
  width: 72px; height: 72px;
  border: 1px solid var(--border-accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber);
  margin: 0 auto var(--sp-8);
}

@media (max-width: 1024px) {
  .blogs-grid { grid-template-columns: repeat(2, 1fr); }
  .blog-card--featured { grid-column: span 2; }
}
@media (max-width: 768px) {
  .blogs-grid { grid-template-columns: 1fr; }
  .blog-card--featured { grid-column: span 1; }
}
</style>