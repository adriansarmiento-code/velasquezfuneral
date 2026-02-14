<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Additional Services</h1>
        <p>Enhance your funeral service with our additional offerings to create a truly personalized and meaningful tribute.</p>
      </div>
    </header>

    <section class="addons-main-section">
      <div class="container">
        
        <div v-if="loading" class="loading-state">Loading services...</div>

        <div v-else-if="addons.length > 0" class="addons-grid">
          <article v-for="addon in addons" :key="addon._id" class="addon-card">
            <div class="addon-image-container">
              <img v-if="addon.image" :src="addon.image" :alt="addon.title">
              <div v-else class="addon-icon-large">{{ addon.icon || '' }}</div>
              <div class="addon-overlay">
                <span class="addon-icon">{{ addon.icon || '' }}</span>
              </div>
            </div>
            <div class="addon-content">
              <h3>{{ addon.title }}</h3>
              <p>{{ addon.description }}</p>
              <a v-if="addon.link" :href="addon.link" class="btn btn-primary" target="_blank" rel="noopener">Learn More</a>
              <router-link v-else to="/contact" class="btn btn-primary">Inquire Now</router-link>
            </div>
          </article>
        </div>

        <div v-else class="no-addons">
          <p>Additional services information available upon request.</p>
          <router-link to="/contact" class="btn btn-primary">Contact Us for More Info</router-link>
        </div>
      </div>
    </section>

    <!-- Customizing Your Service Section -->
    <section class="customizing-section">
      <div class="container">
        <div class="section-intro">
          <h2 class="section-title">Customizing Your Service</h2>
          <p class="section-description">Every life is unique, and we believe memorial services should reflect that individuality. We work closely with families to create personalized tributes that honor their loved one's personality, passions, and legacy.</p>
        </div>

        <div class="customization-grid">
          <div class="custom-card">
            <div class="custom-icon">🎵</div>
            <h3>Music Selection</h3>
            <p>Choose meaningful songs that reflect your loved one's tastes and bring comfort to family and friends. From traditional hymns to contemporary favorites, we can accommodate any musical preference.</p>
          </div>

          <div class="custom-card">
            <div class="custom-icon">📸</div>
            <h3>Photo & Video Tributes</h3>
            <p>Create a visual celebration of life with photo displays, memorial videos, and slideshows that showcase cherished memories and special moments throughout your loved one's journey.</p>
          </div>

          <div class="custom-card">
            <div class="custom-icon">💐</div>
            <h3>Floral Arrangements</h3>
            <p>We can coordinate with local florists to create beautiful floral tributes, from simple elegant bouquets to elaborate custom arrangements that reflect your loved one's favorite flowers and colors.</p>
          </div>

          <div class="custom-card">
            <div class="custom-icon">📖</div>
            <h3>Memorial Programs</h3>
            <p>Professional printed programs that serve as keepsakes for attendees, featuring photos, life stories, favorite quotes, and order of service details beautifully designed to honor your loved one.</p>
          </div>

          <div class="custom-card">
            <div class="custom-icon">🕯</div>
            <h3>Ceremonial Elements</h3>
            <p>Incorporate meaningful rituals and traditions that hold significance for your family, whether religious customs, cultural practices, or personal ceremonies that celebrate your loved one's beliefs and values.</p>
          </div>

          <div class="custom-card">
            <div class="custom-icon">🎨</div>
            <h3>Personalized Themes</h3>
            <p>Create a unique atmosphere that reflects your loved one's personality, hobbies, or profession. From military honors to themed decorations celebrating their passions, we help bring your vision to life.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Personalization Matters Section -->
    <section class="why-personalization-section">
      <div class="container">
        <div class="personalization-content">
          <div class="personalization-text">
            <h2>Why Personalization Matters</h2>
            <p>A personalized funeral service does more than simply mark a passing — it celebrates a life lived. When you customize the service to reflect your loved one's unique personality, interests, and values, you create a meaningful experience that:</p>
            
            <ul class="benefits-list">
              <li>Provides comfort and closure for grieving family members and friends</li>
              <li>Creates a lasting tribute that truly honors the individual's memory</li>
              <li>Gives attendees a deeper connection to the person being remembered</li>
              <li>Turns a somber occasion into a celebration of life and legacy</li>
              <li>Offers healing through shared memories and stories</li>
              <li>Creates meaningful keepsakes that families treasure for years to come</li>
            </ul>

            <p>Our experienced team is here to guide you through the personalization process, offering suggestions while respecting your wishes and honoring your loved one's memory in the most fitting way possible.</p>
          </div>

          <div class="personalization-image">
            <div class="image-placeholder">
              <div class="placeholder-icon">✨</div>
              <p>Every life deserves a unique celebration</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Flexible Payment Section -->
    <section class="payment-section">
      <div class="container">
        <div class="section-intro">
          <h2 class="section-title">Flexible Payment Options</h2>
          <p class="section-description">We understand that funeral costs can be a concern during an already difficult time. That's why we offer flexible payment plans to make our services accessible to all families.</p>
        </div>

        <div class="payment-grid">
          <div class="payment-card">
            <div class="payment-icon">💳</div>
            <h3>Installment Plans</h3>
            <p>Start with just 30% down payment and arrange comfortable monthly installments that work within your family's budget. No hidden fees or surprise charges.</p>
          </div>

          <div class="payment-card">
            <div class="payment-icon">📋</div>
            <h3>Transparent Pricing</h3>
            <p>We believe in complete transparency. Every cost is explained upfront, and we'll work with you to create a service plan that honors your loved one while respecting your budget.</p>
          </div>

          <div class="payment-card">
            <div class="payment-icon">🤝</div>
            <h3>Personal Consultation</h3>
            <p>Our team will sit down with you to discuss all options, explain costs, and help you make informed decisions without pressure or judgment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Let's Create a Meaningful Tribute Together</h2>
          <p>Our compassionate team is ready to help you design a personalized service that truly celebrates your loved one's unique life and legacy.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Contact Us Today</router-link>
            <router-link to="/packages" class="btn btn-outline">View Our Packages</router-link>
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
  name: 'AddOnsPage',
  mixins: [seoMeta],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      addons: [],
      loading: false,
      seoTitle: 'Additional Funeral Services - Personalize Your Tribute',
      seoDescription: 'Enhance your funeral service with memorial videos, professional photography, floral arrangements, custom programs, and more. Create a personalized tribute that celebrates your loved one\'s unique life.',
      seoKeywords: 'memorial video presentation, funeral photography, floral arrangements funeral, memorial programs, personalized funeral services, custom funeral Cabiao',
      seoImage: 'https://velasquezfuneral.com/images/funeral-addons.jpg'
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
/* Main Section */
.addons-main-section {
  padding: 5rem 0;
  background: var(--white);
}

.loading-state {
  text-align: center;
  padding: 5rem 2rem;
  font-size: 1.2rem;
  color: var(--text-medium);
}

.addons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.addon-card {
  background: var(--cream);
  border: 2px solid var(--border-color);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.addon-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary-gold);
}

.addon-image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: var(--light-gray);
}

.addon-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.addon-card:hover .addon-image-container img {
  transform: scale(1.1);
}

.addon-icon-large {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  background: var(--medium-gray);
}

.addon-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26,26,26,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.addon-card:hover .addon-overlay {
  opacity: 1;
}

.addon-icon {
  font-size: 4rem;
  color: var(--primary-gold);
}

.addon-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.addon-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--rich-black);
  font-family: var(--font-heading);
}

.addon-content p {
  margin-bottom: 1.5rem;
  color: var(--text-medium);
  line-height: 1.7;
  flex: 1;
}

.no-addons {
  text-align: center;
  padding: 5rem 2rem;
}

.no-addons p {
  font-size: 1.2rem;
  color: var(--text-medium);
  margin-bottom: 2rem;
}

/* Customizing Section */
.customizing-section {
  padding: 5rem 0;
  background: var(--light-gray);
}

.section-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.section-title {
  font-size: 2.75rem;
  margin-bottom: 1rem;
  color: var(--rich-black);
  font-family: var(--font-heading);
}

.section-description {
  font-size: 1.15rem;
  color: var(--text-medium);
  line-height: 1.8;
}

.customization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.custom-card {
  background: var(--white);
  padding: 2.5rem 2rem;
  border: 2px solid var(--border-color);
  text-align: center;
  transition: var(--transition);
}

.custom-card:hover {
  border-color: var(--primary-gold);
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.custom-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.custom-card h3 {
  font-size: 1.5rem;
  color: var(--rich-black);
  margin-bottom: 1rem;
  font-family: var(--font-heading);
}

.custom-card p {
  color: var(--text-medium);
  line-height: 1.7;
  margin: 0;
}

/* Why Personalization Section */
.why-personalization-section {
  padding: 5rem 0;
  background: var(--white);
}

.personalization-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: center;
}

.personalization-text h2 {
  font-size: 2.5rem;
  color: var(--primary-gold);
  margin-bottom: 1.5rem;
  font-family: var(--font-heading);
}

.personalization-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: var(--text-medium);
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.benefits-list li {
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  border-bottom: 1px solid var(--medium-gray);
  font-size: 1.05rem;
  color: var(--text-dark);
}

.benefits-list li:last-child {
  border-bottom: none;
}

.benefits-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-gold);
  font-weight: bold;
  font-size: 1.3rem;
}

.personalization-image {
  height: 100%;
}

.image-placeholder {
  height: 100%;
  min-height: 400px;
  background: var(--cream);
  border: 3px solid var(--primary-gold);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.placeholder-icon {
  font-size: 6rem;
  color: var(--primary-gold);
  margin-bottom: 1.5rem;
}

.image-placeholder p {
  font-size: 1.3rem;
  color: var(--text-dark);
  font-family: var(--font-heading);
  font-style: italic;
  margin: 0;
}

/* Payment Section */
.payment-section {
  padding: 5rem 0;
  background: var(--cream);
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.payment-card {
  background: var(--white);
  padding: 2.5rem 2rem;
  border: 2px solid var(--border-color);
  text-align: center;
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
@media (max-width: 768px) {
  .addons-grid {
    grid-template-columns: 1fr;
  }

  .personalization-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .image-placeholder {
    min-height: 300px;
  }

  .customization-grid,
  .payment-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>