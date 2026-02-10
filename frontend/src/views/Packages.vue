<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Our Service Packages</h1>
        <p>Thoughtfully designed funeral service packages to honor your loved one with dignity and respect.</p>
      </div>
    </header>

    <section class="packages-section">
      <div class="container">
        <div v-if="loading" class="loading">Loading packages...</div>

        <div v-else-if="packages.length > 0" class="packages-grid">
          <article v-for="pkg in packages" :key="pkg._id" class="package-card">
            <div class="package-header">
              <h2 class="package-name">{{ pkg.name }}</h2>
              <p class="package-tagline">{{ pkg.tagline }}</p>
            </div>
            <div class="package-body">
              <p>{{ pkg.description }}</p>
              <ul class="package-features">
                <li v-for="(feature, index) in pkg.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
            <div class="package-footer">
              <a href="/contact" class="btn btn-secondary">Inquire About This Package</a>
            </div>
          </article>
        </div>

        <div v-else class="no-packages">
          <p>No packages available at the moment. Please contact us for more information.</p>
          <a href="/contact" class="btn btn-primary">Contact Us</a>
        </div>

        <!-- Payment Information -->
        <div class="payment-info">
          <div class="container">
            <h2>Flexible Payment Options</h2>
            <p>We understand that financial considerations are important during this difficult time. Velasquez Funeral and Chapel offers flexible payment arrangements to accommodate every family's budget:</p>
            <div class="features-grid" style="margin-top: 2rem;">
              <div class="feature-card">
                <div class="feature-icon">💳</div>
                <h3>Installment Plans</h3>
                <p>Begin with a 30% down payment and arrange comfortable monthly installments that work for your family.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📋</div>
                <h3>Transparent Pricing</h3>
                <p>Clear, upfront pricing with no hidden fees. We'll explain all costs before you make any commitment.</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">🤝</div>
                <h3>Personal Consultation</h3>
                <p>Our team will work with you to find a package and payment plan that honors your loved one within your budget.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section" style="margin-top: 5rem;">
          <div class="container">
            <div class="cta-content">
              <h2>Need Help Choosing?</h2>
              <p>Our compassionate team is here to guide you through the selection process and answer any questions you may have about our packages and services.</p>
              <div class="cta-buttons">
                <a href="/contact" class="btn btn-primary">Contact Us Today</a>
                <a href="/add-ons" class="btn btn-outline">View Additional Services</a>
              </div>
            </div>
          </div>
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
  name: 'PackagesPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      packages: [],
      loading: false
    }
  },
  mounted() {
    this.loadPackages()
  },
  methods: {
    async loadPackages() {
      this.loading = true
      try {
        const response = await api.getPackages()
        this.packages = response.data.data
      } catch (error) {
        console.error('Error loading packages:', error)
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

.no-packages {
  text-align: center;
  padding: 3rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
</style>