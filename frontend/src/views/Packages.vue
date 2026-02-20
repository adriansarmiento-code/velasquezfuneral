<template>
  <div>
    <Navbar />

    <!-- PAGE HERO -->
    <header class="page-hero-text" style="padding-top:calc(var(--nav-height) + var(--sp-24));padding-bottom:var(--sp-20);">
      <div class="container container--sm" style="text-align:center;">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Service Offerings</p>
        <h1 class="display-lg reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Dignified Service,<br>
          <em class="em-gold">Personalized Care</em>
        </h1>
        <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin:0 auto var(--sp-8);"></div>
        <p class="serif-lg reveal reveal--d3" style="color:var(--iron);font-style:italic;max-width:640px;margin-inline:auto;">
          Each package has been thoughtfully curated to provide families with comprehensive,
          dignified services. We believe honoring a life should never be complicated — only meaningful.
        </p>
      </div>
    </header>

    <!-- PACKAGES LIST -->
    <section class="section">
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="page-loader">
          <div class="page-loader__ring"></div>
          <p class="page-loader__text">Loading our service packages...</p>
        </div>

        <!-- Magazine layout -->
        <div v-else-if="packages.length > 0" class="packages-list">
          <article
            v-for="(pkg, index) in packages"
            :key="pkg._id"
            class="pkg-feature reveal"
            :class="{ 'pkg-feature--reverse': index % 2 !== 0 }"
          >
            <!-- Visual -->
            <div class="pkg-feature__visual">
              <div class="pkg-frame">
                <span class="pkg-frame__corner pkg-frame__corner--tl"></span>
                <span class="pkg-frame__corner pkg-frame__corner--tr"></span>
                <span class="pkg-frame__corner pkg-frame__corner--bl"></span>
                <span class="pkg-frame__corner pkg-frame__corner--br"></span>
                <div class="pkg-frame__img">
                  <img v-if="pkg.image" :src="pkg.image" :alt="pkg.name" class="pkg-img" />
                  <div v-else class="img-ph" style="width:100%;aspect-ratio:4/5;min-height:400px;">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    <span>{{ pkg.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="pkg-feature__body">
              <span class="label c-amber" style="margin-bottom:var(--sp-4);display:block;">Package {{ index + 1 }}</span>
              <h2 class="display-sm" style="margin-bottom:var(--sp-3)">{{ pkg.name }}</h2>
              <p class="serif-sm" style="color:var(--amber);font-style:italic;margin-bottom:var(--sp-8)">{{ pkg.tagline }}</p>
              <p class="serif-body" style="color:var(--iron);margin-bottom:var(--sp-10)">{{ pkg.description }}</p>

              <div style="margin-bottom:var(--sp-10)">
                <p class="label" style="margin-bottom:var(--sp-6)">What's Included</p>
                <ul class="pkg-features">
                  <li v-for="(feat, fi) in pkg.features" :key="fi" class="pkg-feature-item">
                    <span class="pkg-feature-item__dot"></span>
                    <span class="serif-sm" style="color:var(--iron)">{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <router-link :to="`/packages/${pkg._id}/caskets`" class="btn btn--primary btn--cta">
                View Casket Selection
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <h3 style="margin-bottom:var(--sp-4)">No Packages Available</h3>
          <p style="margin-bottom:var(--sp-8)">Please contact us directly for personalized service arrangements.</p>
          <router-link to="/contact" class="btn btn--primary btn--cta">Contact Our Team</router-link>
        </div>

      </div>
    </section>

    <!-- PAYMENT ASSURANCE -->
    <section class="section section--deep">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--sp-20)" class="reveal">
          <p class="overline" style="margin-bottom:var(--sp-4)">Transparent &amp; Flexible</p>
          <h2 class="display-md" style="margin-bottom:var(--sp-6)">Financial Clarity &amp; Flexibility</h2>
          <p class="serif-lg" style="color:var(--iron);font-style:italic;max-width:640px;margin-inline:auto;">
            We believe cost should never be a barrier to honoring your loved one with dignity.
          </p>
        </div>

        <div class="assurance-grid">
          <div v-for="(a, i) in assurance" :key="i" class="assurance-card reveal" :class="`reveal--d${i+1}`">
            <span class="assurance-card__num">0{{ i + 1 }}</span>
            <h3 class="display-xs" style="margin-bottom:var(--sp-4)">{{ a.title }}</h3>
            <p class="serif-sm" style="color:var(--iron)">{{ a.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GUIDANCE CTA -->
    <section class="section" style="text-align:center;">
      <div class="container container--xs">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Need Assistance?</p>
        <h2 class="display-md reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Let Us <em class="em-gold">Guide You</em>
        </h2>
        <p class="serif-lg reveal reveal--d2" style="color:var(--iron);font-style:italic;margin-bottom:var(--sp-12)">
          Choosing the right service can feel overwhelming. Our compassionate advisors are here
          to answer questions and help you make the choice that feels right for your family.
        </p>
        <div class="reveal reveal--d3" style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap;">
          <router-link to="/contact" class="btn btn--primary btn--cta">Speak With Our Team</router-link>
          <router-link to="/add-ons" class="btn btn--ghost-dark btn--cta">Explore Add-On Services</router-link>
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
  name: 'PackagesPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      packages: [],
      loading:  false,
      seoTitle:       'Funeral Service Packages - Basic, Semi-Elegant & Elegant Options',
      seoDescription: 'Affordable funeral service packages in Cabiao, Nueva Ecija. Choose from Basic, Semi-Elegant, or Elegant packages with flexible payment plans.',
      seoKeywords:    'funeral packages Cabiao, affordable funeral services Nueva Ecija, funeral payment plans, basic funeral package, elegant funeral service',
      seoImage:       'https://velasquezfuneral.com/images/funeral-packages.jpg',

      assurance: [
        { title: 'Flexible Installments',    text: 'Begin with a 30% down payment and arrange comfortable monthly installments tailored to your family\'s financial situation.' },
        { title: 'Transparent Pricing',      text: 'Every cost is explained clearly and upfront. No hidden fees, no surprises — just honest, straightforward pricing.' },
        { title: 'Personal Consultation',    text: 'Our team works closely with you to find a package and payment plan that respects both your loved one and your budget.' },
      ]
    }
  },
  mounted() {
    this.loadPackages()
  },
  methods: {
    async loadPackages() {
      this.loading = true
      try {
        const response = await api.getPackages()
        this.packages = response.data.data
      } catch (error) {
        console.error('Error loading packages:', error)
      } finally {
        this.loading = false
        this.$nextTick(() => this.initScrollAnimations())
      }
    },
    initScrollAnimations() {
      const reveals = document.querySelectorAll('.reveal')
      const run = () => { reveals.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('is-visible') }) }
      window.addEventListener('scroll', run, { passive: true })
      run()
    },
    handleIconError(e) {
      const svg = `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#c4944a" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      e.target.parentElement.innerHTML = svg
    }
  }
}
</script>

<style scoped>
/* Magazine alternating layout */
.packages-list { display: flex; flex-direction: column; gap: var(--sp-32); }

.pkg-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-20);
  align-items: center;
}
.pkg-feature--reverse { direction: rtl; }
.pkg-feature--reverse > * { direction: ltr; }

/* Gold corner frame */
.pkg-frame { position: relative; padding: var(--sp-6); }
.pkg-frame__corner {
  position: absolute;
  width: 36px; height: 36px;
  border: 2px solid var(--amber);
}
.pkg-frame__corner--tl { top:0; left:0; border-right:none; border-bottom:none; }
.pkg-frame__corner--tr { top:0; right:0; border-left:none; border-bottom:none; }
.pkg-frame__corner--bl { bottom:0; left:0; border-right:none; border-top:none; }
.pkg-frame__corner--br { bottom:0; right:0; border-left:none; border-top:none; }

.pkg-frame__img { overflow: hidden; }
.pkg-img { width:100%; aspect-ratio:4/5; object-fit:cover; display:block; transition: transform 0.8s var(--ease-out); }
.pkg-feature:hover .pkg-img { transform: scale(1.04); }

/* Features list */
.pkg-features { list-style: none; padding: 0; }
.pkg-feature-item {
  display: flex; align-items: flex-start; gap: var(--sp-4);
  padding: var(--sp-4) 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left var(--dur-fast) var(--ease-out);
}
.pkg-feature-item:hover { padding-left: var(--sp-2); }
.pkg-feature-item:last-child { border-bottom: none; }
.pkg-feature-item__dot {
  width: 18px; height: 18px; flex-shrink: 0; margin-top: 0.25rem;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C4944A' stroke-width='3' stroke-linecap='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-size: contain; background-repeat: no-repeat;
}

/* Assurance cards */
.assurance-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--sp-8); }
.assurance-card {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: var(--sp-10) var(--sp-8);
  position: relative;
  overflow: hidden;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.assurance-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--amber), var(--amber-deep));
  transform: scaleX(0); transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}
.assurance-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.assurance-card:hover::before { transform: scaleX(1); }
.assurance-card__num {
  position: absolute; top: var(--sp-6); right: var(--sp-6);
  font-family: var(--font-display); font-size: 5rem;
  color: var(--amber); opacity: 0.07; font-weight: 300; line-height: 1;
}

@media (max-width: 1024px) {
  .pkg-feature { grid-template-columns: 1fr; gap: var(--sp-10); }
  .pkg-feature--reverse { direction: ltr; }
  .assurance-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .packages-list { gap: var(--sp-20); }
}
</style>