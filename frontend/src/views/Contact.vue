<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>We're here to help 24/7. Reach out anytime for compassionate support and guidance.</p>
      </div>
    </header>

    <!-- Contact Info Cards -->
    <section style="padding: 5rem 0 3rem; background: #f8f8f8;">
      <div class="container">
        <div class="contact-info-grid">
          <div class="contact-info-card scroll-reveal">
            <div class="contact-icon">📞</div>
            <h3>Call Us Anytime</h3>
            <p>Available 24 hours a day, 7 days a week</p>
            <a href="tel:09206609999">0920 660 9999</a>
            <a href="tel:09150980496">0915 098 0496</a>
          </div>

          <div class="contact-info-card scroll-reveal">
            <div class="contact-icon">📍</div>
            <h3>Visit Our Chapel</h3>
            <p>7V36+M7C, Jose Abad Santos Ave</p>
            <p>Cabiao, Nueva Ecija, Philippines</p>
            <a href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47" target="_blank" rel="noopener">Get Directions</a>
          </div>

          <div class="contact-info-card scroll-reveal">
            <div class="contact-icon">🕐</div>
            <h3>Hours of Operation</h3>
            <p>24/7 Emergency Services</p>
            <p>Office Hours: Monday - Sunday</p>
            <p>Always available when you need us</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form & Map Section -->
    <section style="padding: 3rem 0 5rem;">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper scroll-reveal">
            <h2 style="margin-bottom: 1.5rem; font-size: 2rem;">Send Us a Message</h2>
            <p style="margin-bottom: 2rem; color: #666;">Fill out the form below and we'll get back to you as soon as possible.</p>

            <div v-if="successMessage" class="alert alert-success">
              ✓ {{ successMessage }}
            </div>
            
            <div v-if="errorMessage" class="alert alert-error">
              ✗ {{ errorMessage }}
            </div>

            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    placeholder="Juan Dela Cruz"
                  />
                </div>

                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    required
                    placeholder="0920 123 4567"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  required
                  placeholder="juan@example.com"
                />
              </div>

              <div class="form-group">
                <label for="message">Your Message *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="6"
                  required
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-full" 
                :disabled="submitting"
              >
                {{ submitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Quick Contact Info -->
          <div class="quick-contact-info scroll-reveal">
            <div class="info-box">
              <h3>Need Immediate Assistance?</h3>
              <p>Call us right now. We're available 24/7 to help you during this difficult time.</p>
              
              <div class="phone-numbers">
                <a href="tel:09206609999" class="phone-btn">
                  <span class="phone-icon">📞</span>
                  <span class="phone-number">0920 660 9999</span>
                </a>
                <a href="tel:09150980496" class="phone-btn">
                  <span class="phone-icon">📞</span>
                  <span class="phone-number">0915 098 0496</span>
                </a>
              </div>
            </div>

            <div class="info-box">
              <h3>What Happens Next?</h3>
              <ul class="process-list">
                <li>
                  <strong>1. We Respond Quickly</strong>
                  <p>We'll get back to you within 24 hours (usually much sooner)</p>
                </li>
                <li>
                  <strong>2. Personal Consultation</strong>
                  <p>We'll discuss your needs and answer all your questions</p>
                </li>
                <li>
                  <strong>3. Tailored Solutions</strong>
                  <p>We'll help you find the right services for your family</p>
                </li>
              </ul>
            </div>

            <div class="info-box">
              <h3>Why Choose Us?</h3>
              <ul class="benefits-list">
                <li>50+ years serving Cabiao families</li>
                <li>Only chapel facility in the area</li>
                <li>Flexible payment plans available</li>
                <li>Compassionate, experienced staff</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Google Maps Section -->
    <section style="padding: 0; background: #f8f8f8;">
      <div class="container">
        <div class="map-section scroll-reveal">
          <h2 style="text-align: center; margin-bottom: 2rem; font-size: 2.5rem;">Find Us Here</h2>
          <div class="map-container">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3852.4708486732843!2d120.8602!3d15.2544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDE1JzE1LjgiTiAxMjDCsDUxJzM2LjciRQ!5e0!3m2!1sen!2sph!4v1234567890"
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47" target="_blank" rel="noopener" class="btn btn-outline">
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Emergency Contact Banner -->
    <section class="emergency-banner">
      <div class="container">
        <div class="emergency-content">
          <h2>Need Help Right Now?</h2>
          <p>We're available 24/7 for immediate assistance</p>
          <div class="emergency-buttons">
            <a href="tel:09206609999" class="btn btn-primary btn-large">Call 0920 660 9999</a>
            <a href="tel:09150980496" class="btn btn-secondary btn-large">Call 0915 098 0496</a>
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
  name: 'ContactPage',
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      submitting: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  mounted() {
    this.initScrollAnimations()
  },
  methods: {
    async submitForm() {
      this.submitting = true;
      this.successMessage = '';
      this.errorMessage = '';

      try {
        const response = await api.submitContact(this.form);
        
        if (response.data.success) {
          this.successMessage = response.data.message;
          this.form = { name: '', email: '', phone: '', message: '' };
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Contact form error:', error);
        this.errorMessage = error.response?.data?.message || 'Something went wrong. Please try calling us instead.';
      } finally {
        this.submitting = false;
      }
    },

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
      revealOnScroll()
    }
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-form-wrapper {
  background: white;
  padding: 3rem;
  border: 1px solid #e0e0e0;
}

.contact-form {
  margin-top: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
}

.btn-full {
  width: 100%;
  padding: 1.25rem;
  font-size: 1.1rem;
}

.alert {
  padding: 1rem 1.5rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Quick Contact Info */
.quick-contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-box {
  background: white;
  padding: 2rem;
  border: 1px solid #e0e0e0;
}

.info-box h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #d4af37;
}

.phone-numbers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.phone-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f8f8f8;
  border: 2px solid #d4af37;
  text-decoration: none;
  color: #1a1a1a;
  transition: all 0.3s ease;
}

.phone-btn:hover {
  background: #d4af37;
  color: white;
  transform: translateX(5px);
}

.phone-icon {
  font-size: 1.5rem;
}

.phone-number {
  font-size: 1.2rem;
  font-weight: 600;
}

.process-list,
.benefits-list {
  list-style: none;
  padding: 0;
}

.process-list li {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.process-list li:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.process-list strong {
  display: block;
  color: #d4af37;
  margin-bottom: 0.5rem;
  font-size: 1.05rem;
}

.process-list p {
  margin: 0;
  color: #666;
}

.benefits-list li {
  padding: 0.75rem 0;
  padding-left: 2rem;
  position: relative;
  color: #333;
}

.benefits-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #d4af37;
  font-weight: bold;
  font-size: 1.3rem;
}

/* Map Section */
.map-section {
  padding: 4rem 0;
}

/* Emergency Banner */
.emergency-banner {
  background: linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%);
  padding: 4rem 0;
}

.emergency-content {
  text-align: center;
}

.emergency-content h2 {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
}

.emergency-content p {
  font-size: 1.2rem;
  color: rgba(255,255,255,0.8);
  margin-bottom: 2rem;
}

.emergency-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1.25rem 3rem;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form-wrapper {
    padding: 2rem;
  }

  .emergency-buttons {
    flex-direction: column;
  }

  .btn-large {
    width: 100%;
  }
}
</style>