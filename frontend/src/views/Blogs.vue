<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Our Blog</h1>
        <p>Helpful resources and stories from our community.</p>
      </div>
    </header>

    <section class="addons-section">
      <div class="container">
        <div class="addons-grid">
          <!-- Blog cards will go here -->
          <p>Blogs content coming soon...</p>
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
  name: 'BlogsPage',
  components: {
    Navbar,
    Footer
  }
}
</script>