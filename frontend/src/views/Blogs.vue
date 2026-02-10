<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Our Blog</h1>
        <p>Helpful resources and stories from our community.</p>
      </div>
    </header>

    <section class="addons-section">
      <div class="container">
        <div v-if="loading" class="loading">Loading blogs...</div>

        <div v-else-if="blogs.length > 0" class="addons-grid">
          <article v-for="blog in blogs" :key="blog._id" class="addon-card">
            <div class="addon-image-container">
              <img v-if="blog.image" :src="blog.image" :alt="blog.title">
              <div v-else class="addon-placeholder">📝</div>
              <div class="addon-overlay">
                <span class="addon-icon">📝</span>
              </div>
            </div>
            <div class="addon-content">
              <h3>{{ blog.title }}</h3>
              <p>{{ blog.excerpt }}</p>
              <router-link :to="`/blog/${blog.slug}`" class="btn btn-primary" style="margin-top: auto;">
                Read Full Article
              </router-link>
            </div>
          </article>
        </div>

        <div v-else class="no-blogs">
          <p>No blog posts available yet. Check back soon!</p>
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

export default {
  name: 'BlogsPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      blogs: [],
      loading: false
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
      }
    }
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.no-blogs {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.addon-placeholder {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: #f5f5f5;
}
</style>