<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Our Story</h1>
        <p>Over five decades of serving families in Cabiao, Nueva Ecija with dignity, compassion, and unwavering commitment to excellence.</p>
      </div>
    </header>

    <section class="about-main-section" style="padding: 5rem 0;">
      <div class="container">
        <div class="about-content">
          <p>About content coming soon...</p>
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
  name: 'AboutPage',
  components: {
    Navbar,
    Footer
  }
}
</script>