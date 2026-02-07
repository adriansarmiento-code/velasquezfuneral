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
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">50+</div>
            <div class="stat-label">Years of Service</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">2</div>
            <div class="stat-label">Branches in Cabiao</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Available Support</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Compassionate Care</div>
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

export default {
  name: 'HomePage',
  components: {
    Navbar,
    Footer
  }
}
</script>