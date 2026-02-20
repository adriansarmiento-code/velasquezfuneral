<template>
  <div>
    <Navbar />

    <!-- PAGE HERO -->
    <header class="page-hero-text" style="padding-top:calc(var(--nav-height) + var(--sp-24));padding-bottom:var(--sp-20);">
      <div class="container container--sm" style="text-align:center;">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Get In Touch</p>
        <h1 class="display-lg reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          We're Here <em class="em-gold">24/7</em>
        </h1>
        <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin:0 auto var(--sp-8);"></div>
        <p class="serif-lg reveal reveal--d3" style="color:var(--iron);font-style:italic;max-width:580px;margin-inline:auto;">
          Day or night, we're ready to provide the support and guidance you need during this difficult time.
        </p>
      </div>
    </header>

    <!-- CONTACT INFO CARDS -->
    <section class="section section--warm">
      <div class="container">
        <div class="contact-cards">

          <div class="contact-card reveal">
            <div class="contact-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.7 19.79 19.79 0 0 1 1.06 4.11 2 2 0 0 1 3 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 class="display-xs" style="margin-bottom:var(--sp-3)">Call Us Anytime</h3>
            <p class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-5)">Available 24 hours a day, 7 days a week</p>
            <a href="tel:09206609999" class="contact-card__phone">0920 660 9999</a>
            <a href="tel:09150980496" class="contact-card__phone">0915 098 0496</a>
          </div>

          <div class="contact-card reveal reveal--d1">
            <div class="contact-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 class="display-xs" style="margin-bottom:var(--sp-3)">Visit Our Chapel</h3>
            <p class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-5)">
              7V36+M7C, Jose Abad Santos Ave<br>
              Cabiao, Nueva Ecija, Philippines
            </p>
            <a href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47" target="_blank" rel="noopener" class="btn btn--ghost-dark" style="padding:0.75rem 1.75rem;font-size:var(--text-xs);">
              Get Directions ↗
            </a>
          </div>

          <div class="contact-card reveal reveal--d2">
            <div class="contact-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 class="display-xs" style="margin-bottom:var(--sp-3)">Hours of Operation</h3>
            <p class="serif-sm" style="color:var(--iron);">
              24/7 Emergency Services<br>
              Office: Monday – Sunday<br>
              Always here when you need us
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- FORM + SIDEBAR -->
    <section class="section">
      <div class="container">
        <div class="contact-layout">

          <!-- Form -->
          <div class="contact-form-wrap reveal">
            <div style="margin-bottom:var(--sp-10)">
              <p class="overline" style="margin-bottom:var(--sp-4)">Reach Out</p>
              <h2 class="display-sm" style="margin-bottom:var(--sp-4)">Send Us a Message</h2>
              <p class="serif-sm" style="color:var(--iron)">Fill out the form and we'll get back to you as soon as possible.</p>
            </div>

            <div v-if="successMessage" class="alert alert--success" style="margin-bottom:var(--sp-6)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>{{ successMessage }}</span>
            </div>
            <div v-if="errorMessage" class="alert alert--error" style="margin-bottom:var(--sp-6)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
              <span>{{ errorMessage }}</span>
            </div>

            <form @submit.prevent="submitForm" style="display:flex;flex-direction:column;gap:var(--sp-6)">
              <div class="contact-form-row">
                <div class="form-group">
                  <label class="form-label" for="name">Full Name *</label>
                  <input class="form-input" type="text" id="name" v-model="form.name" required placeholder="Juan Dela Cruz" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="phone">Phone Number *</label>
                  <input class="form-input" type="tel" id="phone" v-model="form.phone" required placeholder="0920 123 4567" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="email">Email Address *</label>
                <input class="form-input" type="email" id="email" v-model="form.email" required placeholder="juan@example.com" />
              </div>
              <div class="form-group">
                <label class="form-label" for="message">Your Message *</label>
                <textarea class="form-textarea" id="message" v-model="form.message" rows="6" required placeholder="Tell us how we can help..."></textarea>
              </div>
              <button type="submit" class="btn btn--primary btn--cta" :disabled="submitting" style="align-self:flex-start;">
                {{ submitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

          <!-- Sidebar -->
          <div class="contact-sidebar">

            <div class="contact-sidebar-card reveal reveal--d1">
              <h3 class="display-xs" style="margin-bottom:var(--sp-4)">Need Immediate Help?</h3>
              <p class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-6)">
                Call us right now. We're available 24/7 to help you during this difficult time.
              </p>
              <div style="display:flex;flex-direction:column;gap:var(--sp-3)">
                <a href="tel:09206609999" class="btn btn--secondary" style="justify-content:flex-start;gap:var(--sp-3)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.7 19.79 19.79 0 0 1 1.06 4.11 2 2 0 0 1 3 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  0920 660 9999
                </a>
                <a href="tel:09150980496" class="btn btn--secondary" style="justify-content:flex-start;gap:var(--sp-3)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.7 19.79 19.79 0 0 1 1.06 4.11 2 2 0 0 1 3 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  0915 098 0496
                </a>
              </div>
            </div>

            <div class="contact-sidebar-card reveal reveal--d2">
              <h3 class="display-xs" style="margin-bottom:var(--sp-6)">What Happens Next?</h3>
              <div v-for="(step, i) in steps" :key="i" class="contact-step">
                <div class="contact-step__num">{{ i + 1 }}</div>
                <div>
                  <p class="serif-sm" style="font-weight:600;color:var(--onyx);margin-bottom:var(--sp-1)">{{ step.title }}</p>
                  <p class="serif-sm" style="color:var(--iron);">{{ step.text }}</p>
                </div>
              </div>
            </div>

            <div class="contact-sidebar-card reveal reveal--d3">
              <h3 class="display-xs" style="margin-bottom:var(--sp-6)">Why Choose Us?</h3>
              <ul style="display:flex;flex-direction:column;gap:var(--sp-4)">
                <li v-for="b in benefits" :key="b" style="display:flex;align-items:center;gap:var(--sp-3)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--amber);flex-shrink:0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span class="serif-sm" style="color:var(--iron)">{{ b }}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- MAP -->
    <section class="section section--warm" style="padding-block:var(--sp-24);">
      <div class="container container--sm" style="text-align:center;">
        <h2 class="display-sm reveal" style="margin-bottom:var(--sp-12)">Find Us Here</h2>
        <div class="contact-map reveal reveal--d1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3852.4708486732843!2d120.8602!3d15.2544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDE1JzE1LjgiTiAxMjDCsDUxJzM2LjciRQ!5e0!3m2!1sen!2sph!4v1234567890"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style="margin-top:var(--sp-8)">
          <a href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47" target="_blank" rel="noopener" class="btn btn--ghost-dark btn--cta">
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </section>

    <!-- EMERGENCY BAND -->
    <section class="section section--midnight" style="text-align:center;">
      <div class="container container--xs">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Available Now</p>
        <h2 class="display-md c-ivory reveal reveal--d1" style="margin-bottom:var(--sp-6)">Need Help Right Now?</h2>
        <p class="serif-lg reveal reveal--d2" style="color:rgba(248,244,239,0.82);margin-bottom:var(--sp-12)">
          We're available 24/7 for immediate assistance.
        </p>
        <div class="reveal reveal--d3" style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap;">
          <a href="tel:09206609999" class="btn btn--ghost">Call 0920 660 9999</a>
          <a href="tel:09150980496" class="btn btn--ghost">Call 0915 098 0496</a>
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
  name: 'ContactPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      form: { name: '', email: '', phone: '', message: '' },
      submitting: false,
      successMessage: '',
      errorMessage: '',
      seoTitle:       'Contact Us - 24/7 Funeral Services in Cabiao',
      seoDescription: 'Contact Velasquez Funeral and Chapel anytime. Call 0920 660 9999 or 0915 098 0496. Available 24 hours a day, 7 days a week.',
      seoKeywords:    'contact funeral home Cabiao, 24/7 funeral services, emergency funeral Cabiao, funeral hotline Nueva Ecija',
      seoImage:       'https://velasquezfuneral.com/images/velasquez-contact.jpg',

      steps: [
        { title: 'We Respond Quickly',      text: "We'll get back to you within 24 hours (usually much sooner)" },
        { title: 'Personal Consultation',   text: "We'll discuss your needs and answer all your questions" },
        { title: 'Tailored Solutions',      text: "We'll help you find the right services for your family" },
      ],

      benefits: [
        '50+ years serving Cabiao families',
        'Only chapel facility in the area',
        'Flexible payment plans available',
        'Compassionate, experienced staff',
      ]
    }
  },
  mounted() {
    this.initScrollAnimations()
  },
  methods: {
    async submitForm() {
      this.submitting = true
      this.successMessage = ''
      this.errorMessage   = ''
      try {
        const response = await api.submitContact(this.form)
        if (response.data.success) {
          this.successMessage = response.data.message
          this.form = { name: '', email: '', phone: '', message: '' }
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (error) {
        console.error('Contact form error:', error)
        this.errorMessage = error.response?.data?.message || 'Something went wrong. Please try calling us instead.'
      } finally {
        this.submitting = false
      }
    },
    initScrollAnimations() {
      const reveals = document.querySelectorAll('.reveal')
      const run = () => {
        reveals.forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('is-visible')
        })
      }
      window.addEventListener('scroll', run, { passive: true })
      run(); setTimeout(run, 100); setTimeout(run, 400)
    }
  }
}
</script>

<style scoped>
/* Contact info cards */
.contact-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-6);
}
.contact-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-top: 3px solid var(--amber);
  padding: var(--sp-10) var(--sp-8);
  text-align: center;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.contact-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.contact-card__icon {
  width: 64px; height: 64px;
  margin: 0 auto var(--sp-6);
  border: 1px solid var(--border-accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--amber);
  background: rgba(196,148,74,0.06);
}
.contact-card__phone {
  display: block;
  font-family: var(--font-display); font-size: var(--text-xl);
  color: var(--amber); margin-bottom: var(--sp-2);
  transition: color var(--dur-fast) var(--ease-out);
}
.contact-card__phone:hover { color: var(--amber-deep); }

/* Main layout */
.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--sp-16);
  align-items: start;
}
.contact-form-wrap {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: var(--sp-12) var(--sp-10);
}
.contact-form-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-6);
}

/* Sidebar */
.contact-sidebar { display: flex; flex-direction: column; gap: var(--sp-6); }
.contact-sidebar-card {
  background: var(--bg-warm);
  border: 1px solid var(--border);
  padding: var(--sp-8);
}
.contact-step {
  display: flex; gap: var(--sp-5); align-items: flex-start;
  padding-bottom: var(--sp-6); margin-bottom: var(--sp-6);
  border-bottom: 1px solid var(--border);
}
.contact-step:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.contact-step__num {
  width: 36px; height: 36px; flex-shrink: 0;
  border: 1px solid var(--amber); border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 1.1rem; color: var(--amber);
}

/* Map */
.contact-map {
  border: 3px solid var(--vellum);
  overflow: hidden; height: 420px;
}
.contact-map iframe { width: 100%; height: 100%; border: none; }

@media (max-width: 1024px) {
  .contact-cards  { grid-template-columns: 1fr; }
  .contact-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .contact-form-row { grid-template-columns: 1fr; }
  .contact-form-wrap { padding: var(--sp-8) var(--sp-6); }
}
</style>