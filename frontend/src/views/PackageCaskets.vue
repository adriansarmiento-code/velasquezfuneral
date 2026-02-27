<template>
  <div>
    <Navbar />

    <!-- SUB-HEADER (crumb + title) -->
    <header class="pkg-caskets-header">
      <div class="container container--sm">
        <router-link to="/packages" class="pkg-caskets-back reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Packages
        </router-link>

        <p class="overline reveal reveal--d1" style="margin-bottom:var(--sp-4)">Casket Selection</p>
        <h1 class="display-md reveal reveal--d2" style="margin-bottom:var(--sp-6)">
          {{ packageName || 'Available Caskets' }}
        </h1>
        <p v-if="packageInfo?.description" class="serif-lg reveal reveal--d3" style="color:var(--iron);font-style:italic;max-width:640px;">
          {{ packageInfo.description }}
        </p>
      </div>
    </header>

    <!-- MAIN -->
    <section class="section">
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="page-loader">
          <div class="page-loader__ring"></div>
          <p class="page-loader__text">Loading casket options...</p>
        </div>

        <div v-else-if="caskets.length > 0">

          <!-- Package info summary card -->
          <div v-if="packageInfo" class="pkg-summary reveal">
            <div class="pkg-summary__header">
              <h2 class="display-xs" style="margin:0">{{ packageInfo.name }}</h2>
              <span v-if="packageInfo.category" class="pkg-summary__badge">{{ packageInfo.category }}</span>
            </div>
            <p v-if="packageInfo.tagline" class="serif-sm" style="color:var(--amber);font-style:italic;margin-bottom:var(--sp-6)">
              {{ packageInfo.tagline }}
            </p>
            <div v-if="packageInfo.features?.length">
              <p class="label" style="margin-bottom:var(--sp-4)">Package Includes</p>
              <ul class="pkg-summary__features">
                <li v-for="(feat, i) in packageInfo.features.slice(0, 5)" :key="i">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--amber);flex-shrink:0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span class="serif-sm" style="color:var(--iron)">{{ feat }}</span>
                </li>
                <li v-if="packageInfo.features.length > 5" style="color:var(--stone);font-style:italic;font-size:0.9rem;list-style:none;padding-left:0;">
                  + {{ packageInfo.features.length - 5 }} more services included
                </li>
              </ul>
            </div>
          </div>

          <!-- Caskets grid -->
          <div class="caskets-grid">
            <div
              v-for="casket in caskets"
              :key="casket._id"
              class="casket-card reveal"
            >
              <!-- Image -->
              <div class="casket-card__img-wrap">
                <img v-if="casket.image" :src="casket.image" :alt="casket.name" class="casket-card__img" />
                <div v-else class="img-ph" style="width:100%;min-height:260px;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"></rect></svg>
                  <span>{{ casket.material }}</span>
                </div>
                <!-- Material label overlay -->
                <div class="casket-card__material-label">
                  <span class="label--sm" style="color:var(--amber);letter-spacing:0.15em">{{ casket.material }}</span>
                </div>
              </div>

              <!-- Details -->
              <div class="casket-card__body">
                <div style="margin-bottom:var(--sp-4)">
                  <h3 class="display-xs" style="margin-bottom:var(--sp-2)">{{ casket.name }}</h3>
                  <span class="casket-card__material-tag">{{ casket.material }}</span>
                </div>

                <!-- Pricing -->
                <div class="casket-card__pricing">
                  <div class="casket-card__price-row">
                    <span v-if="casket.discountedPrice" class="casket-card__original">
                      ₱{{ casket.regularPrice.toLocaleString() }}
                    </span>
                    <span class="casket-card__price">
                      ₱{{ (casket.discountedPrice || casket.regularPrice).toLocaleString() }}
                    </span>
                  </div>
                  <span v-if="casket.discountedPrice" class="casket-card__savings">
                    Save ₱{{ (casket.regularPrice - casket.discountedPrice).toLocaleString() }}
                  </span>
                </div>

                <p v-if="casket.specifications" class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-4)">
                  <span class="label--sm c-amber" style="display:block;margin-bottom:var(--sp-1)">Specifications</span>
                  {{ casket.specifications }}
                </p>

                <p v-if="casket.description" class="serif-sm" style="color:var(--iron);flex:1;margin-bottom:var(--sp-8)">
                  {{ casket.description }}
                </p>

                <router-link to="/contact" class="btn btn--primary" style="width:100%;justify-content:center;">
                  Inquire About This Casket
                </router-link>
              </div>
            </div>
          </div>

        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <h3 style="margin-bottom:var(--sp-4)">No Caskets Available</h3>
          <p style="color:var(--iron);margin-bottom:var(--sp-8)">
            We're currently updating our casket selection for this package.<br>
            Please contact us directly for available options.
          </p>
          <div style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap">
            <router-link to="/contact"  class="btn btn--primary btn--cta">Contact Us</router-link>
            <router-link to="/packages" class="btn btn--ghost-dark btn--cta">Back to Packages</router-link>
          </div>
        </div>

      </div>
    </section>

    <!-- GUIDANCE CTA -->
    <section class="section section--warm" style="text-align:center;">
      <div class="container container--xs">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Need Guidance?</p>
        <h2 class="display-md reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Need Help<br><em class="em-gold">Choosing a Casket?</em>
        </h2>
        <p class="serif-lg reveal reveal--d2" style="color:var(--iron);font-style:italic;margin-bottom:var(--sp-12)">
          Our compassionate team is here to guide you through the selection process and answer any questions.
        </p>
        <div class="reveal reveal--d3" style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap;">
          <router-link to="/contact"  class="btn btn--primary btn--cta">Contact Us Today</router-link>
          <router-link to="/packages" class="btn btn--ghost-dark btn--cta">View All Packages</router-link>
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
  name: 'PackageCasketsPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      caskets:     [],
      packageInfo: null,
      packageName: '',
      loading:     false,
      seoTitle:       'Funeral Casket Options in Cabiao, Nueva Ecija — Velasquez',
      seoDescription: 'Browse our casket selection for each funeral package. Quality caskets available in Cabiao, Nueva Ecija at Velasquez Funeral & Chapel.',
      seoKeywords:    'funeral caskets Cabiao, casket options Nueva Ecija, funeral packages Philippines'
    }
  },
  mounted() {
    this.loadPackageAndCaskets()
  },
  methods: {
    async loadPackageAndCaskets() {
      const packageId = this.$route.params.packageId
      this.loading    = true

      try {
        // Load package info
        const packagesResponse = await api.getPackages()
        const allPackages      = packagesResponse.data.data
        this.packageInfo       = allPackages.find(p => p._id === packageId)
        if (this.packageInfo) {
          this.packageName = this.packageInfo.name
          this.seoTitle = `${this.packageInfo.name} Caskets — Velasquez Funeral, Cabiao`
          this.seoDescription = `View casket options for the ${this.packageInfo.name} funeral package at Velasquez Funeral & Chapel in Cabiao, Nueva Ecija.`
        }

        // Load caskets
        const casketsResponse = await api.getCasketsByPackage(packageId)
        this.caskets          = casketsResponse.data.data
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        this.loading = false
        this.$nextTick(() => this.initScrollAnimations())
      }
    },

    initScrollAnimations() {
      const reveals = document.querySelectorAll('.reveal')
      const run = () => {
        reveals.forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight - 80) el.classList.add('is-visible')
        })
      }
      window.addEventListener('scroll', run, { passive: true })
      run()
    }
  }
}
</script>

<style scoped>
/* Sub-header */
.pkg-caskets-header {
  background: linear-gradient(to bottom, var(--bg-warm), var(--bg));
  padding: calc(73px + var(--sp-16)) 0 var(--sp-16);
}
.pkg-caskets-back {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: var(--amber);
  text-decoration: none;
  margin-bottom: var(--sp-10);
  transition: gap var(--dur-fast) ease, color var(--dur-fast) ease;
}
.pkg-caskets-back:hover { gap: var(--sp-3); color: var(--amber-deep); }

/* Package summary card */
.pkg-summary {
  background: var(--bg-warm);
  border: 1px solid var(--border);
  border-top: 3px solid var(--amber);
  padding: var(--sp-10) var(--sp-10);
  margin-bottom: var(--sp-16);
}
.pkg-summary__header {
  display: flex;
  align-items: center;
  gap: var(--sp-6);
  flex-wrap: wrap;
  margin-bottom: var(--sp-4);
}
.pkg-summary__badge {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  background: var(--amber);
  color: var(--onyx);
  padding: 0.35rem 1rem;
}
.pkg-summary__features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--sp-3);
  list-style: none;
  padding: 0;
}
.pkg-summary__features li {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-3);
}

/* Casket grid */
.caskets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: var(--sp-8);
}

.casket-card {
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  transition: transform var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}
.casket-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.10);
  border-color: var(--amber);
}

.casket-card__img-wrap { position: relative; overflow: hidden; background: var(--bg-warm); }
.casket-card__img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  transition: transform 0.7s var(--ease-out);
}
.casket-card:hover .casket-card__img { transform: scale(1.05); }
.casket-card__material-label {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 1.5rem 1rem 0.75rem;
  background: linear-gradient(to top, rgba(31,29,26,0.9), transparent);
  text-align: center;
}

.casket-card__body {
  padding: var(--sp-8);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.casket-card__material-tag {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  background: var(--bg-deep);
  color: var(--stone);
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border);
}

.casket-card__pricing {
  padding: var(--sp-6) 0;
  margin-bottom: var(--sp-6);
  border-bottom: 1px solid var(--border);
}
.casket-card__price-row {
  display: flex;
  align-items: baseline;
  gap: var(--sp-4);
  flex-wrap: wrap;
  margin-bottom: var(--sp-2);
}
.casket-card__original {
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--mist);
  text-decoration: line-through;
}
.casket-card__price {
  font-family: var(--font-display);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--amber);
  line-height: 1;
}
.casket-card__savings {
  display: inline-block;
  background: #d4edda;
  color: #155724;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .caskets-grid { grid-template-columns: 1fr; }
  .pkg-summary__features { grid-template-columns: 1fr; }
}
</style>