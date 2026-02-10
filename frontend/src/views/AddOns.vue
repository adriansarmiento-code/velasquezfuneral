<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Additional Services</h1>
        <p>Enhance your funeral service with our additional offerings.</p>
      </div>
    </header>

    <section class="addons-section">
      <div class="container">
        <div v-if="loading" class="loading">Loading services...</div>

        <div v-else-if="addons.length > 0" class="addons-grid">
          <article v-for="addon in addons" :key="addon._id" class="addon-card">
            <div class="addon-image-container">
              <img v-if="addon.image" :src="addon.image" :alt="addon.title">
              <div v-else class="addon-icon-large">{{ addon.icon || '📦' }}</div>
              <div class="addon-overlay">
                <span class="addon-icon">{{ addon.icon || '📦' }}</span>
              </div>
            </div>
            <div class="addon-content">
              <h3>{{ addon.title }}</h3>
              <p>{{ addon.description }}</p>
              <a v-if="addon.link" :href="addon.link" class="btn btn-primary" style="margin-top: auto;">
                Learn More
              </a>
            </div>
          </article>
        </div>

        <div v-else class="no-addons">
          <p>No additional services available at the moment.</p>
          <a href="/contact" class="btn btn-primary">Contact Us for More Info</a>
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
  name: 'AddOnsPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      addons: [],
      loading: false
    }
  },
  mounted() {
    this.loadAddOns()
  },
  methods: {
    async loadAddOns() {
      this.loading = true
      try {
        const response = await api.getAddOns()
        this.addons = response.data.data
      } catch (error) {
        console.error('Error loading add-ons:', error)
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

.no-addons {
  text-align: center;
  padding: 3rem;
}

.addon-icon-large {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  background: #f5f5f5;
}
</style>