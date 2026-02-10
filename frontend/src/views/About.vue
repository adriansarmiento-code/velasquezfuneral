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
          
          <div class="about-section">
            <h2>A Legacy of Compassionate Care</h2>
            <p>Since our establishment in 1970, Velasquez Funeral and Chapel has been the trusted name in funeral services throughout Cabiao, Nueva Ecija. For over fifty years, we've had the honor of serving countless families during their most difficult moments, providing not just professional services, but genuine care and emotional support.</p>
            <p>What began as a modest funeral service has grown into the longest-standing funeral business in Cabiao, yet our core values remain unchanged: to treat every family with the dignity, respect, and compassion they deserve while honoring the memory of their loved ones with the utmost care.</p>
          </div>

          <div class="about-section">
            <h2>What Makes Us Different</h2>
            <p>Velasquez Funeral and Chapel holds a unique distinction in Cabiao - we are the only funeral service provider with our own dedicated chapel facilities. This allows us to offer families a peaceful, dignified alternative to traditional home-based wake arrangements. Our chapel provides a serene environment where loved ones can gather, reflect, and celebrate the life of the deceased in comfort.</p>
            <p>With two conveniently located branches in Cabiao, we're always accessible to the families we serve, ensuring that help is never far away when you need it most.</p>
          </div>

          <div class="about-section">
            <h2>Our Leadership</h2>
            <p>Velasquez Funeral and Chapel is owned by Mario F. Velasquez Jr., who carries forward the family's commitment to excellence in funeral service. Under his ownership and the capable management of Michael C. Soriano, we continue to uphold the traditions of quality care while embracing modern improvements that better serve our community.</p>
          </div>

          <div class="about-section">
            <h2>Our Core Values</h2>
            <div class="features-grid" style="margin-top: 2rem;">
              <div class="feature-card" v-for="value in coreValues" :key="value.title">
                <div class="feature-icon">{{ value.icon }}</div>
                <h3>{{ value.title }}</h3>
                <p>{{ value.description }}</p>
              </div>
            </div>
          </div>

          <div class="about-section">
            <h2>Our Journey</h2>
            <div class="timeline">
              <div class="timeline-item" v-for="event in timelineEvents" :key="event.year">
                <h3>{{ event.year }}</h3>
                <p>{{ event.text }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Experience the Velasquez Difference</h2>
          <p>Let our decades of experience and commitment to compassionate care serve your family. We're here 24/7 to provide the support and guidance you need.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="btn btn-primary">Contact Us Today</router-link>
            <router-link to="/packages" class="btn btn-outline">View Our Services</router-link>
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
  name: 'AboutPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      coreValues: [
        { icon: '❤️', title: 'Compassion', description: 'We approach every family with empathy, kindness, and genuine care for their emotional wellbeing.' },
        { icon: '⚖️', title: 'Integrity', description: 'We conduct our business with honesty, transparency, and ethical practices in all we do.' },
        { icon: '🌟', title: 'Excellence', description: 'We maintain the highest professional standards in every service we provide.' },
        { icon: '🙏', title: 'Respect', description: 'We treat every person with dignity and honor the memory of each life we help celebrate.' }
      ],
      timelineEvents: [
        { year: '1970', text: 'Velasquez Funeral and Chapel was established in Cabiao, Nueva Ecija, beginning our journey.' },
        { year: '1980s-1990s', text: 'Became known throughout the region as a trusted provider of funeral services.' },
        { year: '2000s', text: 'Expanded to a second location and introduced our own dedicated chapel facilities.' },
        { year: '2010s', text: 'Under current leadership, modernized operations while maintaining core values.' },
        { year: '2020-Present', text: 'Implementing flexible payment options and enhanced service offerings.' }
      ]
    }
  }
}
</script>

<style scoped>
/* Scoped styles to ensure About page specific layouts look correct */
.about-section {
  margin-bottom: 4rem;
}
.about-section h2 {
  color: var(--gold-primary);
  margin-bottom: 1.5rem;
}
/* Features grid styling inherits from your style.css, but we ensure it spaces correctly */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}
</style>