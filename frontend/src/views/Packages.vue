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
        <div class="packages-grid">
          <!-- Add your package cards here -->
          <p>Packages content coming soon...</p>
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
  name: 'PackagesPage',
  components: {
    Navbar,
    Footer
  }
}
</script>