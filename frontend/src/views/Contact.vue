<template>
  <div>
    <Navbar />
    
    <header class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <p>We're here to help 24/7</p>
      </div>
    </header>

    <section class="contact-section" style="padding: 5rem 0;">
      <div class="container">
        <form @submit.prevent="submitForm" class="contact-form" style="max-width: 600px; margin: 0 auto;">
          
          <div v-if="successMessage" class="alert alert-success" style="padding: 1rem; background: #d4edda; color: #155724; border-radius: 4px; margin-bottom: 1.5rem;">
            ✓ {{ successMessage }}
          </div>
          
          <div v-if="errorMessage" class="alert alert-error" style="padding: 1rem; background: #f8d7da; color: #721c24; border-radius: 4px; margin-bottom: 1.5rem;">
            ✗ {{ errorMessage }}
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name *</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email *</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="phone" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone *</label>
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone" 
              required
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px;"
            />
          </div>

          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5"
              required
              style="width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="submitting"
            style="width: 100%; padding: 1rem; background: #d4af37; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;"
          >
            {{ submitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
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
  name: 'Contact',
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
          
          // Scroll to top to see success message
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Contact form error:', error);
        this.errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      } finally {
        this.submitting = false;
      }
    }
  }
}
</script>