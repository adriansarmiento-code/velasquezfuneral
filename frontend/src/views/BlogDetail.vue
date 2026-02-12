<template>
  <div>
    <Navbar />

    <div v-if="loading" class="loading-container">
      <p>Loading blog...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="container">
        <h1>Blog Not Found</h1>
        <p>{{ error }}</p>
        <router-link to="/blogs" class="btn btn-primary">Back to Blogs</router-link>
      </div>
    </div>

    <article v-else-if="blog" class="blog-detail">
      <!-- Blog Header -->
      <header class="blog-header">
        <div class="container">
          <div class="blog-meta">
            <span v-if="blog.category" class="blog-category">{{ blog.category }}</span>
            <span class="blog-date">{{ formatDate(blog.createdAt) }}</span>
          </div>
          <h1 class="blog-title">{{ blog.title }}</h1>
          <p class="blog-excerpt">{{ blog.excerpt }}</p>
        </div>
      </header>

      <!-- Blog Image -->
      <div class="blog-image-container">
        <div class="container">
          <img v-if="blog.image" :src="getImageUrl(blog.image)" :alt="blog.title" class="blog-image">
          <div v-else class="blog-image-placeholder">📝</div>
        </div>
      </div>

      <!-- Blog Content -->
      <section class="blog-content-section">
        <div class="container">
          <div class="blog-content" v-html="blog.content"></div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>We're Here to Help 24/7</h2>
            <p>
              At Velasquez Funeral & Chapel, our compassionate team is available around the clock to guide you through every step of the <strong>funeral planning</strong> process. 
              As <strong>Cabiao's trusted funeral service provider since 1970</strong>, we offer <strong>affordable funeral packages</strong>, 
              <strong>professional embalming services</strong>, <strong>burial coordination services</strong>, and <strong>chapel venue for wake</strong> services. 
              We're honored to serve families in <strong>Cabiao, Nueva Ecija</strong> during their most difficult times.
            </p>
            <div class="cta-buttons">
              <router-link to="/contact" class="btn btn-secondary">Contact Us Anytime</router-link>
            </div>
          </div>
        </div>
      </section>

      <div class="back-to-blogs-container">
        <div class="container">
          <router-link to="/blogs" class="btn btn-outline">← Back to All Blogs</router-link>
        </div>
      </div>
    </article>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import api from '@/services/api'

export default {
  name: 'BlogDetailPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      blog: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    this.loadBlog()
  },
  watch: {
    '$route.params.slug'() {
      this.loadBlog()
    }
  },
  methods: {
    async loadBlog() {
      this.loading = true
      this.error = null

      try {
        const slug = this.$route.params.slug
        const response = await api.getBlog(slug)
        this.blog = response.data.data
      } catch (error) {
        console.error('Error loading blog:', error)
        this.error = 'Blog post not found or has been removed.'
      } finally {
        this.loading = false
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
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    },

    renderContent(content) {
      if (!content) return ''
      // if content already contains HTML tags, assume it's rich HTML
      if (/</.test(content) && />/.test(content)) return content
      // otherwise convert simple plaintext line breaks to paragraphs
      return content
        .split('\n\n')
        .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('')
    }
  }
}
</script>

<style scoped>
.loading-container,
.error-container {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
}

.blog-header {
  background: #f8f8f8;
  padding: 4rem 0 3rem;
}

.blog-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-header .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.blog-category {
  background: #d4af37;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
}

.blog-date {
  color: #666;
}

.blog-title {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.blog-excerpt {
  font-size: 1.25rem;
  color: #0a0a0a;
  line-height: 1.6;
  margin: 0;
}

.blog-image-container {
  padding: 3rem 0;
  background: white;
}

.blog-image {
  width: 100%;
  max-width: 860px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.12);
  display: block;
  margin: 1.5rem auto;
}

.blog-image-placeholder {
  width: 100%;
  max-width: 860px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: #f5f5f5;
  color: #999;
  border-radius: 8px;
  margin: 1.5rem auto;
}

.blog-content-section {
  padding: 3rem 0 5rem;
  background: white;
}

.blog-content {
  max-width: 820px;
  margin: 0 auto;
  font-size: 1.12rem;
  line-height: 1.8;
  color: #0a0a0a;
}

.blog-content >>> p {
  margin-bottom: 1.5rem;
}

.blog-content >>> h2 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #d4af37;
}

.blog-content >>> h3 {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #0a0a0a;
}


.blog-content >>> li {
  margin-bottom: 0.5rem;
}

/* Remove or replace the .blog-actions styles with these */

.back-to-blogs-container {
  text-align: center;
  margin: 3rem 0 5rem; /* Adds space above and below the button */
}

/* Ensure the CTA button is prominent */
.cta-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

/* Make sure strong tags in the CTA are visible */
.cta-content p strong {
  color: var(--soft-cream, #FAF8F3);
  font-weight: 700;
}

/* Adjust CTA padding to match the elegant design */
.cta-section {
  padding: 5rem 0;
  background: #d4af35; /* Matches --rich-black */
}
@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }

  .blog-excerpt {
    font-size: 1.1rem;
  }

  .blog-content {
    font-size: 1rem;
  }
}
</style>