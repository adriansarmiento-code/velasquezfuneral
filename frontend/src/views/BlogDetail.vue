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
      <div v-if="blog.image" class="blog-image-container">
        <div class="container">
          <img :src="blog.image" :alt="blog.title" class="blog-image">
        </div>
      </div>

      <!-- Blog Content -->
      <section class="blog-content-section">
        <div class="container">
          <div class="blog-content" v-html="formatContent(blog.content)"></div>

          <!-- Share/Back Section -->
          <div class="blog-actions">
            <router-link to="/blogs" class="btn btn-secondary">← Back to All Blogs</router-link>
            <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
          </div>
        </div>
      </section>

      <!-- Related CTA -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Need Assistance?</h2>
            <p>Our compassionate team is here to help you through every step. Contact us anytime for support and guidance.</p>
            <div class="cta-buttons">
              <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
              <router-link to="/packages" class="btn btn-outline">View Our Services</router-link>
            </div>
          </div>
        </div>
      </section>
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

    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-US', options)
    },

    formatContent(content) {
      // Convert line breaks to paragraphs
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
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.blog-image-container {
  padding: 3rem 0;
  background: white;
}

.blog-image {
  width: 100%;
  max-width: 900px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  display: block;
  margin: 0 auto;
}

.blog-content-section {
  padding: 3rem 0 5rem;
  background: white;
}

.blog-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
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
  color: #1a1a1a;
}

.blog-content >>> ul,
.blog-content >>> ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.blog-content >>> li {
  margin-bottom: 0.5rem;
}

.blog-actions {
  max-width: 800px;
  margin: 3rem auto 0;
  padding-top: 3rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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