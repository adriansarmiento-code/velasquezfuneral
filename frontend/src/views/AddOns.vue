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
        <div class="addons-grid">
          <!-- Add-ons content here -->
          <p>Add-ons content coming soon...</p>
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
  name: 'AddOnsPage',
  components: {
    Navbar,
    Footer
  }
}
</script>