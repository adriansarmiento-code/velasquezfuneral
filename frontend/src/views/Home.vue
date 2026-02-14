<template>
  <div>
    <Navbar />
    
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Honoring Life, Celebrating Memories</h1>
          <p class="hero-subtitle">Compassionate funeral services for families in Cabiao, Nueva Ecija since 1970</p>
          <p class="hero-description">We understand that saying goodbye is never easy. Our caring team is here to guide you with gentle support, helping you create a meaningful tribute that celebrates the life of your loved one.</p>
          <div class="hero-buttons">
            <router-link to="/packages" class="btn btn-primary">View Our Services</router-link>
            <router-link to="/contact" class="btn btn-secondary">Speak With Us</router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Statistics Section -->
    <section class="stats-section">
      <div class="container-fluid">
        <div class="stats-grid">
          <div class="stat-item scroll-reveal">
            <div class="stat-number">50+</div>
            <div class="stat-label">Years of Service</div>
          </div>
          <div class="stat-item scroll-reveal">
            <div class="stat-number">2</div>
            <div class="stat-label">Branches in Cabiao</div>
          </div>
          <div class="stat-item scroll-reveal">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Available Support</div>
          </div>
          <div class="stat-item scroll-reveal">
            <div class="stat-number">100%</div>
            <div class="stat-label">Compassionate Care</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Welcome Section -->
    <section class="welcome-section">
      <div class="container">
        <div class="section-intro scroll-reveal">
          <h2 class="section-title">We're Here to Support You</h2>
          <p class="section-description">For over five decades, we've had the privilege of serving families in Cabiao with dignity, respect, and heartfelt care. We believe every life deserves to be honored in a way that brings comfort and peace to those left behind.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card scroll-reveal">
            <div class="feature-icon">🕊</div>
            <h3>Compassionate Care</h3>
            <p>Our experienced team provides gentle guidance and emotional support throughout every step of the journey.</p>
          </div>
          <div class="feature-card scroll-reveal">
            <div class="feature-icon">🏛</div>
            <h3>Beautiful Chapel</h3>
            <p>A serene and peaceful space where families can gather, reflect, and celebrate cherished memories together.</p>
          </div>
          <div class="feature-card scroll-reveal">
            <div class="feature-icon">💐</div>
            <h3>Personalized Service</h3>
            <p>We help you create a unique and meaningful tribute that reflects your loved one's life and legacy.</p>
          </div>
          <div class="feature-card scroll-reveal">
            <div class="feature-icon">🤝</div>
            <h3>Flexible Options</h3>
            <p>Thoughtfully designed packages with flexible payment plans to accommodate every family's needs and budget.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-grid">
          <div class="trust-content scroll-reveal">
            <h2 class="trust-title">Trusted by Cabiao Families Since 1970</h2>
            <p class="trust-text">For over five decades, Velasquez Funeral and Chapel has been a pillar of support for families during their most difficult times. As Cabiao's longest-standing funeral service provider, we understand the importance of compassionate, dignified care.</p>
            <p class="trust-text">We're the only funeral home in Cabiao with our own chapel facilities, offering families a peaceful alternative to traditional home-based arrangements. Our commitment to excellence ensures that every family receives the support they deserve.</p>
            <router-link to="/about" class="btn btn-primary">Learn More About Us</router-link>
          </div>
          <div class="trust-image scroll-reveal">
            <div class="trust-image-container">
              <img src="@/assets/chapel-placeholder.png" alt="Velasquez Funeral Chapel" @error="handleImageError">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="services-overview">
      <div class="container">
        <div class="section-intro scroll-reveal">
          <h2 class="section-title">How We Can Help</h2>
          <p class="section-description">From the moment you reach out to us, we're here to handle every detail with care and professionalism.</p>
        </div>
        
        <div class="services-list">
          <div class="service-item">
            <div class="service-number">01</div>
            <div class="service-content">
              <h3>Initial Consultation</h3>
              <p>We listen to your needs and help you understand all available options in a comfortable, unhurried environment.</p>
            </div>
          </div>
          <div class="service-item">
            <div class="service-number">02</div>
            <div class="service-content">
              <h3>Complete Arrangements</h3>
              <p>From embalming and casket selection to venue preparation, we handle every detail with the utmost respect.</p>
            </div>
          </div>
          <div class="service-item">
            <div class="service-number">03</div>
            <div class="service-content">
              <h3>Wake Coordination</h3>
              <p>Our chapel provides a peaceful setting, or we can assist with arrangements at your preferred venue.</p>
            </div>
          </div>
          <div class="service-item">
            <div class="service-number">04</div>
            <div class="service-content">
              <h3>Burial Services</h3>
              <p>We coordinate all aspects of the burial with professionalism and sensitivity, ensuring everything proceeds smoothly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="testimonial-section">
      <div class="container">
        <div class="testimonial-content scroll-reveal">
          <div class="quote-icon">"</div>
          <blockquote>
            <p class="testimonial-text">The staff made such a difficult time more bearable with their kindness and attention to detail. Everything was handled with such care and respect. We're forever grateful.</p>
            <cite class="testimonial-author">— A Family We've Served</cite>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content scroll-reveal">
          <h2>We're Here When You Need Us</h2>
          <p>Whether you're planning ahead or need immediate assistance, our compassionate team is ready to help. Reach out anytime—we're always here to listen and support you.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Get In Touch</router-link>
            <router-link to="/packages" class="btn btn-outline">Explore Our Packages</router-link>
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
import seoMeta from '@/mixins/seoMeta'

export default {
  name: 'HomePage',
  mixins: [seoMeta],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      seoTitle: 'Home - Compassionate Funeral Services in Cabiao Since 1970',
      seoDescription: 'Velasquez Funeral and Chapel has served Cabiao, Nueva Ecija with dignity and compassion since 1970. We offer complete funeral packages, chapel services, burial coordination, and flexible payment plans. Available 24/7.',
      seoKeywords: 'funeral services Cabiao, funeral home Nueva Ecija, burial services Cabiao, chapel funeral services, affordable funeral packages Philippines, cremation services Cabiao, funeral planning Nueva Ecija',
      seoImage: 'https://velasquezfuneral.com/images/velasquez-funeral-home.jpg'
    }
  },
  mounted() {
    this.initScrollAnimations()
    this.addStructuredData()
  },
  methods: {
    initScrollAnimations() {
      const reveals = document.querySelectorAll('.scroll-reveal')
      
      const revealOnScroll = () => {
        reveals.forEach(element => {
          const elementTop = element.getBoundingClientRect().top
          const windowHeight = window.innerHeight
          
          if (elementTop < windowHeight - 100) {
            element.classList.add('revealed')
          }
        })
      }
      
      window.addEventListener('scroll', revealOnScroll)
      revealOnScroll() // Initial check
    },
     addStructuredData() {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FuneralHome",
        "name": "Velasquez Funeral and Chapel",
        "image": "https://velasquezfuneral.com/images/velasquez-funeral-logo.jpg",
        "description": "Compassionate funeral services in Cabiao, Nueva Ecija since 1970. Complete funeral packages, chapel services, and flexible payment plans.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "7V36+M7C, Jose Abad Santos Ave",
          "addressLocality": "Cabiao",
          "addressRegion": "Nueva Ecija",
          "addressCountry": "PH"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 15.2544,
          "longitude": 120.8602
        },
        "url": "https://velasquezfuneral.com",
        "telephone": ["+639206609999", "+639150980496"],
        "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
        "priceRange": "$$",
        "areaServed": {
          "@type": "City",
          "name": "Cabiao, Nueva Ecija"
        },
        "foundingDate": "1970"
      })
      document.head.appendChild(script)
    },

    handleImageError(e) {
      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect fill="%23f0f0f0" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-size="24" font-family="Arial"%3EChapel Image%3C/text%3E%3C/svg%3E'
    }
  }
}
</script>