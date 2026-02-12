<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <router-link to="/packages" class="back-link">
          ← Back to Packages
        </router-link>
        <h1>{{ packageName }} - Available Caskets</h1>
        <p v-if="packageInfo">{{ packageInfo.description }}</p>
      </div>
    </header>

    <section class="caskets-page-section">
      <div class="container">
        
        <div v-if="loading" class="loading-state">Loading caskets...</div>

        <div v-else-if="caskets.length > 0">
          
          <!-- Package Info Card -->
          <div v-if="packageInfo" class="package-info-card">
            <div class="package-info-header">
              <h2>{{ packageInfo.name }}</h2>
              <span class="package-category-badge">{{ packageInfo.category }}</span>
            </div>
            <p class="package-tagline">{{ packageInfo.tagline }}</p>
            
            <div class="package-features-preview">
              <h3>Package Includes:</h3>
              <ul>
                <li v-for="(feature, index) in packageInfo.features.slice(0, 5)" :key="index">{{ feature }}</li>
                <li v-if="packageInfo.features.length > 5">And {{ packageInfo.features.length - 5 }} more services...</li>
              </ul>
            </div>
          </div>

          <!-- Caskets Grid -->
          <div class="caskets-grid">
            <div v-for="casket in caskets" :key="casket._id" class="casket-card">
              
              <div class="casket-image-section">
                <img v-if="casket.image" :src="casket.image" :alt="casket.name" />
                <div v-else class="casket-no-image">
                  <span>{{ casket.material }}</span>
                </div>
                <div class="casket-material-overlay">
                  <span>{{ casket.material }}</span>
                </div>
              </div>

              <div class="casket-details-section">
                <div class="casket-header-row">
                  <h3>{{ casket.name }}</h3>
                  <span class="material-badge">{{ casket.material }}</span>
                </div>

                <div class="casket-pricing-section">
                  <div class="price-display">
                    <span v-if="casket.discountedPrice" class="original-price">
                      ₱{{ casket.regularPrice.toLocaleString() }}
                    </span>
                    <span class="current-price">
                      ₱{{ (casket.discountedPrice || casket.regularPrice).toLocaleString() }}
                    </span>
                  </div>
                  <span v-if="casket.discountedPrice" class="savings-badge">
                    Save ₱{{ (casket.regularPrice - casket.discountedPrice).toLocaleString() }}
                  </span>
                </div>

                <p v-if="casket.specifications" class="casket-specifications">
                  <strong>Specifications:</strong> {{ casket.specifications }}
                </p>

                <p v-if="casket.description" class="casket-description">
                  {{ casket.description }}
                </p>

                <div class="casket-actions">
                  <router-link to="/contact" class="btn btn-primary btn-full">
                    Inquire About This Casket
                  </router-link>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div v-else class="no-caskets-state">
          <h2>No Caskets Available</h2>
          <p>We're currently updating our casket selection for this package.</p>
          <p>Please contact us directly for available options.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Contact Us</router-link>
            <router-link to="/packages" class="btn btn-outline">Back to Packages</router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Need Help Choosing a Casket?</h2>
          <p>Our compassionate team is here to guide you through the selection process and answer any questions.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Contact Us Today</router-link>
            <router-link to="/packages" class="btn btn-outline">View All Packages</router-link>
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
  name: 'PackageCasketsPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      caskets: [],
      packageInfo: null,
      packageName: '',
      loading: false
    }
  },
  mounted() {
    this.loadPackageAndCaskets()
  },
  methods: {
    async loadPackageAndCaskets() {
      const packageId = this.$route.params.packageId
      this.loading = true

      try {
        // Load package info
        const packagesResponse = await api.getPackages()
        const allPackages = packagesResponse.data.data
        this.packageInfo = allPackages.find(p => p._id === packageId)
        
        if (this.packageInfo) {
          this.packageName = this.packageInfo.name
        }

        // Load caskets
        const casketsResponse = await api.getCasketsByPackage(packageId)
        this.caskets = casketsResponse.data.data
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.back-link {
  display: inline-block;
  color: var(--primary-gold);
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  transition: var(--transition);
}

.back-link:hover {
  transform: translateX(-5px);
}

.caskets-page-section {
  padding: 5rem 0;
  background: var(--white);
  min-height: 50vh;
}

.loading-state {
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: var(--text-medium);
}

/* Package Info Card */
.package-info-card {
  background: var(--cream);
  border: 3px solid var(--primary-gold);
  padding: 2.5rem;
  margin-bottom: 3rem;
  border-radius: 8px;
}

.package-info-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.package-info-header h2 {
  margin: 0;
  font-size: 2.5rem;
  color: var(--rich-black);
  font-family: var(--font-heading);
}

.package-category-badge {
  background: var(--primary-gold);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.package-tagline {
  font-size: 1.2rem;
  color: var(--text-medium);
  margin-bottom: 1.5rem;
}

.package-features-preview h3 {
  font-size: 1.3rem;
  color: var(--primary-gold);
  margin-bottom: 1rem;
}

.package-features-preview ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.package-features-preview li {
  padding-left: 1.5rem;
  position: relative;
  color: var(--text-dark);
}

.package-features-preview li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-gold);
  font-weight: bold;
}

/* Caskets Grid */
.caskets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2.5rem;
}

.casket-card {
  background: var(--cream);
  border: 2px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.casket-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-gold);
}

.casket-image-section {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.casket-image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.casket-card:hover .casket-image-section img {
  transform: scale(1.1);
}

.casket-no-image {
  width: 100%;
  height: 100%;
  background: var(--medium-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-weight: 600;
  font-size: 1.5rem;
}

.casket-material-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(26,26,26,0.9), transparent);
  padding: 1.5rem 1rem 0.75rem;
  text-align: center;
}

.casket-material-overlay span {
  color: var(--primary-gold);
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.casket-details-section {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.casket-header-row {
  margin-bottom: 1.5rem;
}

.casket-header-row h3 {
  font-size: 2rem;
  color: var(--rich-black);
  margin: 0 0 0.75rem 0;
  font-family: var(--font-heading);
}

.material-badge {
  background: var(--light-gray);
  color: var(--text-dark);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 2px solid var(--border-color);
}

.casket-pricing-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--border-color);
}

.price-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.original-price {
  text-decoration: line-through;
  color: var(--text-light);
  font-size: 1.2rem;
}

.current-price {
  color: var(--primary-gold);
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--font-heading);
}

.savings-badge {
  display: inline-block;
  background: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
}

.casket-specifications {
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-size: 1.05rem;
}

.casket-specifications strong {
  color: var(--primary-gold);
}

.casket-description {
  margin-bottom: 1.5rem;
  color: var(--text-medium);
  line-height: 1.7;
  flex: 1;
}

.casket-actions {
  margin-top: auto;
}

.btn-full {
  width: 100%;
  text-align: center;
}

/* No Caskets State */
.no-caskets-state {
  text-align: center;
  padding: 5rem 2rem;
}

.no-caskets-state h2 {
  font-size: 2.5rem;
  color: var(--rich-black);
  margin-bottom: 1rem;
}

.no-caskets-state p {
  font-size: 1.2rem;
  color: var(--text-medium);
  margin-bottom: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.no-caskets-state .cta-buttons {
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .caskets-grid {
    grid-template-columns: 1fr;
  }

  .package-info-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .package-features-preview ul {
    grid-template-columns: 1fr;
  }

  .casket-header-row h3 {
    font-size: 1.75rem;
  }

  .current-price {
    font-size: 2rem;
  }
}
</style>