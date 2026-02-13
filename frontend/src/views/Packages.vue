<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Our Service Packages</h1>
        <p>Thoughtfully designed funeral service packages to honor your loved one with dignity and respect.</p>
      </div>
    </header>

    <section class="packages-main-section">
      <div class="container">
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <p>Loading packages...</p>
        </div>

        <!-- Packages Display -->
        <div v-else-if="packages.length > 0" class="packages-container">
          
          <!-- Each Package Card -->
          <div v-for="pkg in packages" :key="pkg._id" class="package-wrapper">
            
            <!-- Package Main Card -->
            <div class="package-card">
              <div class="package-header">
                <div v-if="pkg.image" class="package-image">
                  <img :src="pkg.image" :alt="pkg.name" />
                </div>
                <h2 class="package-name">{{ pkg.name }}</h2>
                <p class="package-tagline">{{ pkg.tagline }}</p>
              </div>
              
              <div class="package-body">
                <p class="package-description">{{ pkg.description }}</p>
                <ul class="package-features">
                  <li v-for="(feature, index) in pkg.features" :key="index">{{ feature }}</li>
                </ul>
              </div>
              
<div class="package-footer">
  <router-link 
    :to="`/packages/${pkg._id}/caskets`" 
    class="btn btn-primary btn-full"
  >
    View Available Caskets
  </router-link>
</div>
            </div>

            <!-- Caskets Section (Expandable) -->
            <div v-show="expandedPackage === pkg._id" class="caskets-section">
              <div class="caskets-header-section">
                <h3>Available Caskets for {{ pkg.name }}</h3>
                <p>Choose from our selection of quality caskets</p>
              </div>

              <div v-if="loadingCaskets" class="loading-caskets">
                <p>Loading caskets...</p>
              </div>

              <div v-else-if="currentCaskets.length > 0" class="caskets-list">
                <div v-for="casket in currentCaskets" :key="casket._id" class="casket-item">
                  
                  <div class="casket-image-box">
                    <img v-if="casket.image" :src="casket.image" :alt="casket.name" />
                    <div v-else class="casket-no-image">
                      <span>{{ casket.material }}</span>
                    </div>
                  </div>
                  
                  <div class="casket-info-box">
                    <div class="casket-title-row">
                      <h4>{{ casket.name }}</h4>
                      <span class="material-badge">{{ casket.material }}</span>
                    </div>
                    
                    <p v-if="casket.description" class="casket-desc">{{ casket.description }}</p>
                    <p v-if="casket.specifications" class="casket-spec">
                      <strong>Specifications:</strong> {{ casket.specifications }}
                    </p>
                    
                    <div class="casket-price-row">
                      <span v-if="casket.discountedPrice" class="price-old">
                        ₱{{ casket.regularPrice.toLocaleString() }}
                      </span>
                      <span class="price-now">
                        ₱{{ (casket.discountedPrice || casket.regularPrice).toLocaleString() }}
                      </span>
                      <span v-if="casket.discountedPrice" class="price-save">
                        Save ₱{{ (casket.regularPrice - casket.discountedPrice).toLocaleString() }}
                      </span>
                    </div>
                  </div>
                  
                  <div class="casket-button-box">
                    <router-link to="/contact" class="btn-inquire">Inquire</router-link>
                  </div>
                  
                </div>
              </div>

              <div v-else class="no-caskets-message">
                <p>No caskets available for this package at the moment.</p>
                <router-link to="/contact" class="btn-contact-us">Contact Us</router-link>
              </div>
            </div>

          </div>
          
        </div>

        <!-- No Packages State -->
        <div v-else class="no-packages-state">
          <p>No packages available at the moment.</p>
          <router-link to="/contact" class="btn-contact-us">Contact Us</router-link>
        </div>

      </div>
    </section>

    <!-- Payment Info Section -->
    <section class="payment-info-section">
      <div class="container">
        <h2>Flexible Payment Options</h2>
        <p>We understand that financial considerations are important during this difficult time. Velasquez Funeral and Chapel offers flexible payment arrangements to accommodate every family's budget.</p>
        
        <div class="payment-cards">
          <div class="payment-card">
            <div class="payment-icon">💳</div>
            <h3>Installment Plans</h3>
            <p>Begin with a 30% down payment and arrange comfortable monthly installments that work for your family.</p>
          </div>
          <div class="payment-card">
            <div class="payment-icon">📋</div>
            <h3>Transparent Pricing</h3>
            <p>Clear, upfront pricing with no hidden fees. We'll explain all costs before you make any commitment.</p>
          </div>
          <div class="payment-card">
            <div class="payment-icon">🤝</div>
            <h3>Personal Consultation</h3>
            <p>Our team will work with you to find a package and payment plan that honors your loved one within your budget.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Need Help Choosing?</h2>
          <p>Our compassionate team is here to guide you through the selection process and answer any questions you may have.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Contact Us Today</router-link>
            <router-link to="/add-ons" class="btn btn-outline">View Additional Services</router-link>
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
import seoMeta from '@/mixins/seoMeta'

export default {
  name: 'PackagesPage',
  mixins: [seoMeta],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      packages: [],
      currentCaskets: [],
      loading: false,
      seoTitle: 'Funeral Service Packages - Basic, Semi-Elegant & Elegant Options',
      seoDescription: 'Affordable funeral service packages in Cabiao, Nueva Ecija. Choose from Basic, Semi-Elegant, or Elegant packages with flexible payment plans starting at 30% down payment. Professional embalming, casket selection, chapel services, and complete burial coordination.',
      seoKeywords: 'funeral packages Cabiao, affordable funeral services Nueva Ecija, funeral payment plans, basic funeral package, elegant funeral service, casket selection Philippines, funeral installment payment',
      seoImage: 'https://velasquezfuneral.com/images/funeral-packages.jpg'
    }
  },

  mounted() {
    console.log('Packages page mounted')
    this.loadPackages()
  },
  methods: {
    async loadPackages() {
      this.loading = true
      console.log('Loading packages...')
      try {
        const response = await api.getPackages()
        console.log('Packages response:', response.data)
        this.packages = response.data.data
        console.log('Packages loaded:', this.packages.length)
      } catch (error) {
        console.error('Error loading packages:', error)
      } finally {
        this.loading = false
      }
    },
  }
}
</script>

<style scoped>
/* Main Section */
.packages-main-section {
  padding: 5rem 0;
  background: var(--white);
  min-height: 50vh;
}

.loading-state,
.no-packages-state {
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: var(--text-medium);
}

/* Packages Container */
.packages-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 3rem;
}

.package-wrapper {
  width: 100%;
  display: block;
}

/* Package Card */
.package-card {
  background: var(--cream);
  border: 2px solid var(--border-color);
  overflow: hidden;
  margin-bottom: 1rem;
}

.package-header {
  padding: 2.5rem 2rem;
  background: var(--white);
  border-bottom: 3px solid var(--primary-gold);
  text-align: center;
}

.package-image {
  width: 100%;
  max-width: 600px;
  height: 250px;
  margin: 0 auto 1.5rem;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid var(--primary-gold);
}

.package-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.package-name {
  font-size: 2.5rem;
  color: var(--rich-black);
  margin: 0 0 0.5rem 0;
  font-family: var(--font-heading);
}

.package-tagline {
  color: var(--primary-gold);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.package-body {
  padding: 2.5rem 2rem;
}

.package-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-medium);
  margin-bottom: 2rem;
  text-align: center;
}

.package-features {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.package-features li {
  padding: 1rem 0 1rem 2.5rem;
  position: relative;
  color: var(--text-dark);
  border-bottom: 1px solid var(--border-color);
  font-size: 1.05rem;
}

.package-features li:last-child {
  border-bottom: none;
}

.package-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-gold);
  font-weight: bold;
  font-size: 1.3rem;
}

.package-footer {
  padding: 2rem;
  border-top: 2px solid var(--border-color);
  text-align: center;
}

.btn-toggle-caskets {
  width: 100%;
  max-width: 400px;
  padding: 1.25rem 2rem;
  background: var(--primary-gold);
  color: var(--white);
  border: none;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-toggle-caskets:hover {
  background: var(--dark-gold);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212,175,55,0.3);
}

/* Caskets Section */
.caskets-section {
  background: var(--light-gray);
  border: 2px solid var(--primary-gold);
  border-top: 4px solid var(--primary-gold);
  padding: 2rem;
  margin-top: 1rem;
}

.caskets-header-section {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
}

.caskets-header-section h3 {
  color: var(--primary-gold);
  font-size: 2rem;
  margin: 0 0 0.75rem 0;
  font-family: var(--font-heading);
}

.caskets-header-section p {
  color: var(--text-medium);
  font-size: 1.1rem;
  margin: 0;
}

.loading-caskets {
  text-align: center;
  padding: 3rem;
  color: var(--text-medium);
}

/* Caskets List */
.caskets-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.casket-item {
  display: grid;
  grid-template-columns: 220px 1fr auto;
  gap: 2rem;
  background: var(--white);
  padding: 2rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  align-items: center;
}

.casket-image-box {
  width: 220px;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid var(--border-color);
  flex-shrink: 0;
}

.casket-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 1.1rem;
}

.casket-info-box {
  flex: 1;
  min-width: 0;
}

.casket-title-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.casket-title-row h4 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--rich-black);
  font-family: var(--font-heading);
}

.material-badge {
  background: var(--primary-gold);
  color: var(--white);
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.casket-desc {
  margin: 0.75rem 0;
  color: var(--text-medium);
  line-height: 1.6;
  font-size: 1.05rem;
}

.casket-spec {
  margin: 0.5rem 0 1rem 0;
  color: var(--text-light);
  font-size: 0.95rem;
}

.casket-price-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.price-old {
  text-decoration: line-through;
  color: var(--text-light);
  font-size: 1.1rem;
}

.price-now {
  color: var(--primary-gold);
  font-size: 2.25rem;
  font-weight: 700;
  font-family: var(--font-heading);
}

.price-save {
  background: #28a745;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
}

.casket-button-box {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.btn-inquire {
  padding: 1rem 2rem;
  background: var(--primary-gold);
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: var(--transition);
  white-space: nowrap;
}

.btn-inquire:hover {
  background: var(--dark-gold);
  transform: translateY(-2px);
}

.no-caskets-message {
  text-align: center;
  padding: 3rem;
  background: var(--white);
  border-radius: 8px;
  border: 2px solid var(--border-color);
}

.no-caskets-message p {
  margin-bottom: 1.5rem;
  color: var(--text-medium);
  font-size: 1.1rem;
}

.btn-contact-us {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--primary-gold);
  color: var(--white);
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: var(--transition);
}

.btn-contact-us:hover {
  background: var(--dark-gold);
}

/* Payment Info Section */
.payment-info-section {
  background: var(--light-gray);
  padding: 5rem 0;
  border-top: 3px solid var(--primary-gold);
}

.payment-info-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--rich-black);
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.payment-info-section > .container > p {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  color: var(--text-medium);
  line-height: 1.8;
}

.payment-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.payment-card {
  background: var(--white);
  padding: 2.5rem 2rem;
  text-align: center;
  border: 2px solid var(--border-color);
  transition: var(--transition);
}

.payment-card:hover {
  border-color: var(--primary-gold);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.payment-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.payment-card h3 {
  font-size: 1.5rem;
  color: var(--rich-black);
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.payment-card p {
  color: var(--text-medium);
  line-height: 1.7;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .casket-item {
    grid-template-columns: 180px 1fr;
    gap: 1.5rem;
  }

  .casket-image-box {
    width: 180px;
    height: 140px;
  }

  .casket-button-box {
    grid-column: 1 / -1;
    justify-content: center;
    margin-top: 1rem;
  }

  .btn-inquire {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .package-name {
    font-size: 2rem;
  }

  .casket-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .casket-image-box {
    width: 100%;
    height: 200px;
    margin: 0 auto;
  }

  .casket-title-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .casket-price-row {
    justify-content: center;
  }

  .payment-cards {
    grid-template-columns: 1fr;
  }
}
</style>