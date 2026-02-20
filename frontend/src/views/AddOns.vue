<template>
  <div>
    <Navbar />

    <!-- PAGE HERO -->
    <header class="page-hero-text" style="padding-top:calc(var(--nav-height) + var(--sp-24));padding-bottom:var(--sp-20);">
      <div class="container container--sm" style="text-align:center;">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Personalization Services</p>
        <h1 class="display-lg reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Make It<br>
          <em class="em-gold">Uniquely Theirs</em>
        </h1>
        <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin:0 auto var(--sp-8);"></div>
        <p class="serif-lg reveal reveal--d3" style="color:var(--iron);font-style:italic;max-width:600px;margin-inline:auto;">
          Every life tells a different story. Our additional services help you craft a tribute that captures
          the essence of who they were — their passions, personality, and legacy.
        </p>
      </div>
    </header>

    <!-- ADD-ONS CATALOG -->
    <section class="section section--warm">
      <div class="container">

        <div v-if="loading" class="page-loader">
          <div class="page-loader__ring"></div>
          <p class="page-loader__text">Loading personalization options...</p>
        </div>

        <div v-else-if="addons.length > 0" class="addons-grid">
          <article v-for="addon in addons" :key="addon._id" class="addon-card reveal">
            <div class="addon-card__visual">
              <img v-if="addon.image" :src="addon.image" :alt="addon.title" class="addon-card__img" />
              <div v-else class="img-ph" style="width:100%;aspect-ratio:16/10;min-height:200px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
              <div class="addon-card__overlay"></div>
            </div>
            <div class="addon-card__body">
              <h3 class="display-xs" style="margin-bottom:var(--sp-4)">{{ addon.title }}</h3>
              <p class="serif-sm" style="color:var(--iron);margin-bottom:var(--sp-6);flex:1">{{ addon.description }}</p>
              <a v-if="addon.link" :href="addon.link" class="btn btn--secondary" target="_blank" rel="noopener" style="align-self:flex-start">
                Learn More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
              <router-link v-else to="/contact" class="btn btn--secondary" style="align-self:flex-start">
                Inquire Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </router-link>
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <h3 style="margin-bottom:var(--sp-4)">Services Available Upon Request</h3>
          <p style="margin-bottom:var(--sp-8)">Contact us to discuss how we can create a meaningful tribute.</p>
          <router-link to="/contact" class="btn btn--primary btn--cta">Contact Our Team</router-link>
        </div>

      </div>
    </section>

    <!-- WAYS TO PERSONALIZE -->
    <section class="section">
      <div class="container">
        <div style="text-align:center;margin-bottom:var(--sp-20)" class="reveal">
          <p class="overline" style="margin-bottom:var(--sp-4)">Creative Possibilities</p>
          <h2 class="display-md" style="margin-bottom:var(--sp-6)">Ways to Personalize</h2>
          <p class="serif-lg" style="color:var(--iron);font-style:italic;max-width:560px;margin-inline:auto;">
            Small details create powerful memories. Here are ways we can honor their unique story.
          </p>
        </div>
        <div class="personalize-grid">
          <div v-for="(p, i) in personalizations" :key="i" class="personalize-card reveal" :class="`reveal--d${(i%4)+1}`">
            <div class="personalize-card__icon" v-html="p.icon"></div>
            <h3 class="display-xs" style="margin-bottom:var(--sp-3)">{{ p.title }}</h3>
            <p class="serif-sm" style="color:var(--iron)">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY IT MATTERS — SPLIT -->
    <section class="section section--deep">
      <div class="container">
        <div class="matters-layout">
          <div class="matters-content">
            <p class="overline reveal" style="margin-bottom:var(--sp-6)">The Impact of Personalization</p>
            <h2 class="display-md reveal reveal--d1" style="margin-bottom:var(--sp-8)">
              Why These<br><em class="em-gold">Details Matter</em>
            </h2>
            <p class="serif-body reveal reveal--d2" style="color:var(--iron);margin-bottom:var(--sp-8)">
              A personalized service transforms a somber occasion into a celebration of life. When every
              detail reflects who they truly were, you create healing moments that last long after the
              service ends.
            </p>
            <ul style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-10)">
              <li v-for="r in reasons" :key="r" class="reveal" style="display:flex;align-items:flex-start;gap:var(--sp-4)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color:var(--amber);flex-shrink:0;margin-top:0.25rem"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span class="serif-sm" style="color:var(--iron)">{{ r }}</span>
              </li>
            </ul>
            <p class="serif-sm reveal" style="color:var(--iron);font-style:italic;padding:var(--sp-6);border-left:2px solid var(--amber);">
              Our experienced team guides you through every decision, offering thoughtful suggestions
              while honoring your wishes and celebrating your loved one's unique story.
            </p>
          </div>

          <div class="matters-quote reveal reveal--right reveal--d2">
            <span class="matters-quote__mark">"</span>
            <p class="serif-xl" style="color:var(--onyx);margin-bottom:var(--sp-6)">
              Every life deserves a unique celebration that captures who they truly were.
            </p>
            <div class="rule rule--amber rule--short"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="section section--midnight" style="text-align:center;">
      <div class="container container--xs">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Let's Create Together</p>
        <h2 class="display-md c-ivory reveal reveal--d1" style="margin-bottom:var(--sp-6)">
          Let's Create Something<br>
          <em class="em-gold">Meaningful Together</em>
        </h2>
        <p class="serif-lg reveal reveal--d2" style="color:rgba(248,244,239,0.82);margin-bottom:var(--sp-12)">
          Our compassionate team is ready to help you design a personalized service that authentically
          celebrates your loved one's life, passions, and legacy.
        </p>
        <div class="reveal reveal--d3" style="display:flex;gap:var(--sp-4);justify-content:center;flex-wrap:wrap;">
          <router-link to="/contact"  class="btn btn--ghost btn--cta">Start Planning</router-link>
          <router-link to="/packages" class="btn btn--ghost btn--cta">View Our Packages</router-link>
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
  name: 'AddOnsPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      addons:  [],
      loading: false,
      seoTitle:       'Additional Funeral Services - Personalize Your Tribute',
      seoDescription: 'Enhance your funeral service with memorial videos, photography, floral arrangements, custom programs, and more.',
      seoKeywords:    'memorial video, funeral photography, floral arrangements funeral, memorial programs, personalized funeral services',
      seoImage:       'https://velasquezfuneral.com/images/funeral-addons.jpg',

      personalizations: [
        { title: 'Music Selection',        text: 'From classical hymns to contemporary favorites, choose songs that reflect their spirit and bring comfort.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>' },
        { title: 'Photo & Video Tributes', text: 'Celebrate their journey through visual storytelling — photo displays, memorial videos, and slideshows.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>' },
        { title: 'Floral Arrangements',    text: 'Beautiful tributes coordinated with local florists — elegant bouquets to custom arrangements featuring their favorite flowers.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 12h10a10 10 0 0 1-10 10"></path></svg>' },
        { title: 'Memorial Programs',      text: 'Professionally printed keepsakes featuring photos, life stories, and service details — treasured mementos for attendees.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
        { title: 'Ceremonial Elements',    text: 'Incorporate meaningful rituals — religious customs, cultural practices, or personal ceremonies honoring their beliefs.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg>' },
        { title: 'Personalized Themes',    text: 'Create an atmosphere reflecting their personality — from military honors to themed decorations celebrating their passions.',
          icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6m5.2-14.8l-4.3 4.3m0 5l4.3 4.3M23 12h-6m-6 0H1m14.8 5.2l-4.3-4.3m0-5l-4.3-4.3"></path></svg>' },
      ],

      reasons: [
        'Provides genuine comfort and closure for grieving families',
        'Creates a lasting tribute that truly honors their memory',
        'Gives attendees a deeper connection to the person being remembered',
        'Turns grief into a celebration of life and legacy',
        'Offers healing through shared memories and stories',
        'Creates meaningful keepsakes treasured for generations',
      ]
    }
  },
  mounted() {
    this.loadAddOns()
  },
  methods: {
    async loadAddOns() {
      this.loading = true
      try {
        const response = await api.getAddOns()
        this.addons = response.data.data
      } catch (error) {
        console.error('Error loading add-ons:', error)
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
    }
  }
}
</script>

<style scoped>
/* Add-ons catalog grid */
.addons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-8);
}
.addon-card {
  border: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow: hidden;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.addon-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-md); border-color: var(--amber); }
.addon-card__visual { position: relative; overflow: hidden; }
.addon-card__img { width:100%; aspect-ratio:16/10; object-fit:cover; display:block; transition: transform 0.7s var(--ease-out); }
.addon-card:hover .addon-card__img { transform: scale(1.05); }
.addon-card__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(15,14,12,0.25));
}
.addon-card__body {
  padding: var(--sp-8);
  display: flex; flex-direction: column; flex: 1;
}

/* Personalize grid */
.personalize-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-6);
}
.personalize-card {
  padding: var(--sp-8);
  border: 1px solid var(--border);
  background: var(--bg-warm);
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.personalize-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: var(--amber); }
.personalize-card__icon { color: var(--amber); margin-bottom: var(--sp-5); }

/* Why it matters split */
.matters-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(4rem, 9vw, 10rem);
  align-items: center;
}
.matters-quote {
  padding: var(--sp-12) var(--sp-10);
  border: 1px solid var(--border);
  background: var(--bg);
  position: relative;
}
.matters-quote__mark {
  display: block;
  font-family: var(--font-display);
  font-size: 8rem; line-height: 0.7;
  color: var(--amber); opacity: 0.15;
  margin-bottom: var(--sp-4);
}

@media (max-width: 1024px) {
  .addons-grid       { grid-template-columns: 1fr 1fr; }
  .personalize-grid  { grid-template-columns: 1fr 1fr; }
  .matters-layout    { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .addons-grid      { grid-template-columns: 1fr; }
  .personalize-grid { grid-template-columns: 1fr; }
}
</style>