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
              <div v-else class="addon-placeholder"></div>
              <div class="addon-overlay">
                <span class="addon-icon"></span>
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
import seoMeta from '@/mixins/seoMeta'

export default {
  name: 'BlogsPage',
  mixins: [seoMeta],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      blogs: [],
      loading: false,
      seoTitle: 'Funeral Planning Guides & Resources',
      seoDescription: 'Helpful articles and guides about funeral planning, etiquette, burial services, and grief support. Learn about immediate steps after loss, funeral costs, memorial services, and more from Velasquez Funeral and Chapel.',
      seoKeywords: 'funeral planning guide, funeral etiquette Philippines, burial planning, grief support, memorial service ideas, funeral costs Cabiao, advance funeral planning',
      seoImage: 'https://velasquezfuneral.com/images/funeral-blog.jpg'
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

  /* Blog cards (scoped) */
  .addons-section {
    padding: 4rem 0;
  }

  .addons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .addon-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
  }

  .addon-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    border-color: #d4af37;
  }

  .addon-image-container {
    height: 220px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .addon-image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  .addon-card:hover .addon-image-container img {
    transform: scale(1.05);
  }

  .addon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,10,10,0.35) 100%);
    opacity: 0;
    transition: opacity 0.25s ease;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0.75rem;
  }

  .addon-card:hover .addon-overlay { opacity: 1; }

  .addon-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .addon-content h3 { color: #0a0a0a; font-size: 1.15rem; margin: 0; }
  .addon-content p { color: #666; margin: 0.5rem 0 1rem; }

  @media (max-width: 768px) {
    .addons-grid { grid-template-columns: 1fr; }
    .addon-image-container { height: 180px; }
  }
</style>