<template>
  <div>
    <Navbar />

    <!-- PAGE HERO -->
    <header class="page-hero-text" style="padding-top:calc(var(--nav-height) + var(--sp-24));padding-bottom:var(--sp-20);">
      <div class="container container--sm">
        <p class="overline reveal" style="margin-bottom:var(--sp-6)">Our Story</p>
        <h1 class="display-lg reveal reveal--d1" style="line-height:var(--lh-tight);margin-bottom:var(--sp-8)">
          Five Decades of<br>
          <em class="em-gold">Compassionate Service</em>
        </h1>
        <div class="rule rule--amber rule--medium reveal reveal--d2" style="margin-bottom:var(--sp-8)"></div>
        <p class="serif-lg reveal reveal--d3" style="color:var(--iron);max-width:680px;font-style:italic;">
          Since 1970, we've been honored to walk alongside Cabiao families through life's most profound moments,
          offering not just professional services, but genuine human connection when it matters most.
        </p>
      </div>
    </header>

    <!-- STORY CHAPTERS -->
    <section class="section section--warm">
      <div class="container container--sm">

        <article class="about-chapter reveal" style="margin-bottom:var(--sp-24);padding-bottom:var(--sp-20);border-bottom:1px solid var(--border);">
          <p class="about-chapter__num">I</p>
          <h2 class="display-sm" style="margin-bottom:var(--sp-8)">A Legacy of Compassionate Care</h2>
          <p class="serif-body" style="color:var(--iron);margin-bottom:var(--sp-6);">
            Since our establishment in 1970, Velasquez Funeral and Chapel has been the trusted name in funeral
            services throughout Cabiao, Nueva Ecija. For over fifty years, we've had the honor of serving
            countless families during their most difficult moments, providing not just professional services,
            but genuine care and emotional support.
          </p>
          <p class="serif-sm" style="color:var(--iron);">
            What began as a modest funeral service has grown into the longest-standing funeral business in
            Cabiao, yet our core values remain unchanged: to treat every family with the dignity, respect,
            and compassion they deserve while honoring the memory of their loved ones with the utmost care.
          </p>
        </article>

        <article class="about-chapter reveal" style="margin-bottom:var(--sp-24);padding-bottom:var(--sp-20);border-bottom:1px solid var(--border);">
          <p class="about-chapter__num">II</p>
          <h2 class="display-sm" style="margin-bottom:var(--sp-8)">What Sets Us Apart</h2>
          <p class="serif-body" style="color:var(--iron);margin-bottom:var(--sp-6);">
            Velasquez Funeral and Chapel holds a unique distinction in Cabiao — we are the only funeral
            service provider with our own dedicated chapel facilities.
          </p>
          <p class="serif-sm" style="color:var(--iron);">
            This allows us to offer families a peaceful, dignified alternative to traditional home-based
            wake arrangements. Our chapel provides a serene environment where loved ones can gather, reflect,
            and celebrate the life of the deceased in comfort. With two conveniently located branches in
            Cabiao, we're always accessible to the families we serve.
          </p>
        </article>

        <article class="about-chapter reveal">
          <p class="about-chapter__num">III</p>
          <h2 class="display-sm" style="margin-bottom:var(--sp-10)">Leadership &amp; Vision</h2>
          <div class="about-leaders">
            <div class="about-leader reveal reveal--d1">
              <div class="about-leader__initial">MV</div>
              <h3 class="display-xs" style="margin-bottom:var(--sp-2);">Mario F. Velasquez Jr.</h3>
              <p class="label c-amber" style="margin-bottom:var(--sp-4);">Owner</p>
              <p class="serif-sm" style="color:var(--iron);">
                Carrying forward the family's commitment to excellence in funeral service with unwavering
                dedication to our community.
              </p>
            </div>
            <div class="about-leader reveal reveal--d2">
              <div class="about-leader__initial">MS</div>
              <h3 class="display-xs" style="margin-bottom:var(--sp-2);">Michael C. Soriano</h3>
              <p class="label c-amber" style="margin-bottom:var(--sp-4);">Manager</p>
              <p class="serif-sm" style="color:var(--iron);">
                Ensuring every member of our team provides professional expertise and emotional sensitivity
                that families need.
              </p>
            </div>
          </div>
          <p class="serif-sm" style="color:var(--iron);margin-top:var(--sp-10);">
            Under their guidance, we continue to uphold traditions of quality care while embracing modern
            improvements that better serve our community.
          </p>
        </article>

      </div>
    </section>

    <!-- SERVICES LIST -->
    <section class="section">
      <div class="container container--sm">
        <div class="reveal" style="margin-bottom:var(--sp-16)">
          <p class="overline" style="margin-bottom:var(--sp-4)">Everything We Offer</p>
          <h2 class="display-md" style="margin-bottom:var(--sp-6)">Complete, Comprehensive Care</h2>
          <p class="serif-lg" style="color:var(--iron);font-style:italic;">
            From the moment you first contact us through the final burial, our team handles every detail.
          </p>
        </div>

        <div class="about-services reveal">
          <div v-for="item in services" :key="item" class="about-service-item">
            <svg class="about-service-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="serif-sm" style="color:var(--iron);">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE VALUES -->
    <section class="section section--deep">
      <div class="container">
        <div class="reveal" style="text-align:center;margin-bottom:var(--sp-20)">
          <p class="overline" style="margin-bottom:var(--sp-4)">What Guides Us</p>
          <h2 class="display-md">Our Core Values</h2>
        </div>
        <div class="about-values">
          <div v-for="v in values" :key="v.title" class="about-value reveal">
            <div class="about-value__icon" v-html="v.icon"></div>
            <h3 class="display-xs" style="margin-bottom:var(--sp-4)">{{ v.title }}</h3>
            <p class="serif-sm" style="color:var(--iron);">{{ v.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TIMELINE — replaced with new design -->
    <section class="section timeline">
      <div class="container container--tight">
        <div class="reveal" style="margin-bottom:var(--sp-16)">
          <p class="label c-amber" style="margin-bottom:var(--sp-4)">Our Journey</p>
          <h2 class="display-sm">Milestones</h2>
        </div>
        <div class="timeline__track">
          <div class="timeline__item reveal" v-for="(m, i) in milestones" :key="i" :class="`reveal--d${(i % 3) + 1}`">
            <div class="timeline__year">{{ m.year }}</div>
            <div class="timeline__bar"></div>
            <div class="timeline__content">
              <h4 class="timeline__title">{{ m.title }}</h4>
              <p class="timeline__text">{{ m.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--deep about-cta">
      <div class="container about-cta__inner reveal">
        <div>
          <h2 class="display-sm">Ready to Talk?</h2>
          <p class="serif-sm" style="color:var(--text-muted);margin-top:var(--sp-4)">We're available 24/7. No pressure, no obligation — just compassionate support.</p>
        </div>
        <div style="display:flex;gap:var(--sp-4);flex-wrap:wrap">
          <router-link to="/contact" class="btn btn--primary btn--cta">Contact Us</router-link>
          <router-link to="/packages" class="btn btn--secondary btn--cta">View Packages</router-link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import seoMeta from '@/mixins/seoMeta'
import { useReveal, useParallax } from '@/mixins/animations'

export default {
  name: 'AboutPage',
  mixins: [seoMeta],
  components: { Navbar, Footer },
  data() {
    return {
      seoTitle: 'About Us — Five Decades of Compassionate Service',
      seoDescription: "Learn about Velasquez Funeral and Chapel's 50-year history of serving Cabiao, Nueva Ecija families with dignity, compassion, and professional excellence.",
      seoKeywords: 'about Velasquez funeral Cabiao, funeral home history Nueva Ecija, funeral services Philippines',
      seoImage: 'https://velasquezfuneral.com/images/velasquez-about-og.jpg',
      cleanupParallax: null,

      services: [
        '24/7 availability for immediate assistance',
        'Professional transportation and delivery to our facility',
        'Expert embalming and preparation services',
        'Thoughtfully curated casket selection for every budget',
        'Complete venue preparation and decoration',
        'Comprehensive wake coordination',
        'Full burial arrangement and coordination',
        'Flexible payment options with installment plans',
      ],

      values: [
        {
          title: 'Compassion',
          text:  'We approach every family with empathy, kindness, and genuine care for their emotional wellbeing during their time of grief.',
          icon:  '<svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
        },
        {
          title: 'Integrity',
          text:  'We conduct our business with honesty, transparency, and ethical practices in all interactions and decisions.',
          icon:  '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'
        },
        {
          title: 'Excellence',
          text:  'We maintain the highest professional standards in every service we provide, constantly improving our practices.',
          icon:  '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>'
        },
        {
          title: 'Respect',
          text:  'We treat every person with dignity and honor the memory of each life we help celebrate with utmost reverence.',
          icon:  '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
        },
      ],

      milestones: [
        { year: '1970', title: 'Founded', text: 'Velasquez Funeral and Chapel opens its doors in Cabiao, Nueva Ecija, beginning a legacy of compassionate service.' },
        { year: '1985', title: 'Chapel Established', text: 'We become the first and only funeral home in Cabiao to open dedicated chapel facilities for wake services.' },
        { year: '2000', title: 'Second Branch', text: 'Growing community trust leads us to open a second branch to better serve families across Cabiao.' },
        { year: '2010', title: 'Expanding Services', text: 'Introduction of comprehensive add-on services including memorial videos, floral arrangements, and custom tributes.' },
        { year: '2020', title: '50 Years of Service', text: 'Celebrating five decades of serving Cabiao families with dignity, compassion, and professional excellence.' },
        { year: 'Today', title: 'Still Here for You', text: '24 hours a day, 7 days a week, our compassionate team continues to walk alongside Cabiao families in their time of need.' }
      ]
    }
  },
  mounted() {
    useReveal()
    this.cleanupParallax = useParallax()
  },
  beforeUnmount() {
    if (this.cleanupParallax) this.cleanupParallax()
  }
}
</script>

<style scoped>
/* ── About-specific layout components ───────────────── */

.about-chapter { position: relative; }
.about-chapter:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

.about-chapter__num {
  font-family: var(--font-display);
  font-size: clamp(4rem, 8vw, 6rem);
  color: var(--amber); opacity: 0.12;
  font-style: italic; line-height: 1;
  margin-bottom: var(--sp-4);
  pointer-events: none; user-select: none;
}

.about-leaders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-8);
}

.about-leader {
  padding: var(--sp-10) var(--sp-8);
  border: 1px solid var(--border);
  background: var(--bg-warm);
  text-align: center;
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.about-leader:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-md);
  border-color: var(--amber);
}

.about-leader__initial {
  width: 72px; height: 72px;
  margin: 0 auto var(--sp-6);
  border: 2px solid var(--amber);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 1.6rem;
  font-weight: 600; color: var(--amber);
}

/* Services checklist */
.about-services {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--sp-4) var(--sp-8);
}
.about-service-item {
  display: flex; align-items: flex-start; gap: var(--sp-4);
  padding: var(--sp-5);
  border-left: 2px solid var(--amber);
  background: var(--bg-warm);
  transition: background var(--dur-fast) var(--ease-out);
}
.about-service-item:hover { background: var(--bg-deep); }
.about-service-check { color: var(--amber); flex-shrink: 0; margin-top: 0.2rem; }

/* Values grid */
.about-values {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-8);
}
.about-value {
  padding: var(--sp-10) var(--sp-8);
  border: 1px solid var(--border);
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
}
.about-value:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: var(--amber); }
.about-value__icon { color: var(--amber); margin-bottom: var(--sp-6); }

/* ── TIMELINE — new design ───────────────────────────── */
.container--tight { max-width: 900px; }

.timeline__track {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
}
.timeline__track::before {
  content: '';
  position: absolute;
  left: 120px;
  top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--amber), transparent);
}

.timeline__item {
  display: grid;
  grid-template-columns: 120px 1px 1fr;
  gap: 0 var(--sp-8);
  align-items: flex-start;
  padding-bottom: var(--sp-12);
  position: relative;
}
.timeline__item:last-child { padding-bottom: 0; }

.timeline__year {
  font-family: var(--font-elegant);
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: var(--ls-wider);
  color: var(--amber);
  text-align: right;
  padding-top: 0.2rem;
  padding-right: var(--sp-6);
}

.timeline__bar {
  width: 1px;
  background: var(--amber);
  position: relative;
  align-self: stretch;
}
.timeline__bar::before {
  content: '';
  position: absolute;
  top: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
  width: 10px; height: 10px;
  background: var(--amber);
  border-radius: 50%;
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 2px var(--amber);
}

.timeline__content {
  padding-left: var(--sp-6);
  padding-bottom: var(--sp-8);
  border-bottom: 1px solid var(--border);
}
.timeline__item:last-child .timeline__content { border-bottom: none; padding-bottom: 0; }

.timeline__title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--sp-3);
  line-height: var(--lh-snug);
}
.timeline__text {
  font-family: var(--font-serif);
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  line-height: 1.8;
  color: var(--text-body);
}

/* CTA section */
.about-cta__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--sp-12);
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .about-leaders { grid-template-columns: 1fr; }
  .about-services { grid-template-columns: 1fr; }
  .about-values   { grid-template-columns: 1fr; }
  .timeline__track::before { left: 80px; }
  .timeline__item { grid-template-columns: 80px 1px 1fr; }
  .about-cta__inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .timeline__track::before { display: none; }
  .timeline__item { grid-template-columns: 1fr; gap: var(--sp-2); }
  .timeline__bar { display: none; }
  .timeline__year { text-align: left; padding-right: 0; }
  .timeline__content { padding-left: 0; }
}
</style>