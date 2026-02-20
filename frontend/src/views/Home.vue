<template>
  <div class="home">
    <Navbar />

    <!-- ══════════════════════════════════════════════════════════
         §1  CINEMATIC HERO
         Architecture: Full-viewport photo, text anchored bottom-left,
         enormous display type breaking past container edge,
         film-grain texture overlay, animated scroll cue.
    ══════════════════════════════════════════════════════════ -->
    <section class="hero">

      <!-- Background photo layer -->
      <div class="hero__canvas parallax-wrap">
        <div class="img-ph img-ph--dark hero__canvas-img parallax-img">
          <img src="/images/interior.jpg" alt="Chapel interior" class="hero__canvas-img parallax-img" />
        </div>
        <!-- Gradient: heavy bottom, lighter top -->
        <div class="hero__veil"></div>
        <!-- Film grain texture -->
        <div class="hero__grain" aria-hidden="true"></div>
      </div>

      <!-- Vertical eyebrow — rotated label on far left -->
      <div class="hero__aside" aria-hidden="true">
        <span class="hero__aside-text">Cabiao, Nueva Ecija — Est. 1970</span>
      </div>

      <!-- Main content — bottom anchored -->
      <div class="hero__stage">
        <div class="hero__meta reveal reveal--fade">
          <span class="hero__meta-rule"></span>
          <span class="label--sm" style="color:rgba(248,244,239,0.75)">Since 1970</span>
          <span class="hero__meta-dot" aria-hidden="true">·</span>
          <span class="label--sm" style="color:rgba(248,244,239,0.75)">Available 24 / 7</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__title-line reveal reveal--d1">Every Life</span>
          <em class="hero__title-em reveal reveal--d2">Tells&nbsp;a&nbsp;Story</em>
          <span class="hero__title-line reveal reveal--d3">Worth Honoring</span>
        </h1>

        <div class="hero__footer">
          <p class="hero__lead reveal reveal--d3">
            In your darkest hour, you do not walk alone. For over fifty years,
            we have stood beside families throughout Cabiao — holding space for grief,
            celebrating cherished memories, and creating farewells that bring lasting comfort.
          </p>
          <div class="hero__actions reveal reveal--d4">
            <router-link to="/contact" class="btn btn--ghost btn--cta">
              We're Here for You
            </router-link>
            <router-link to="/packages" class="btn btn--link" style="color:rgba(248,244,239,0.88)">
              View Services
            </router-link>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="hero__scroll-cue" aria-hidden="true">
        <div class="hero__scroll-line"></div>
        <span class="label--sm" style="color:rgba(248,244,239,0.58)">Scroll</span>
      </div>

    </section>


    <!-- ══════════════════════════════════════════════════════════
         §2  MARQUEE BAND
         Thin dark band with scrolling service promises.
         Creates visual pause between hero and content.
    ══════════════════════════════════════════════════════════ -->
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <span v-for="n in 12" :key="n" class="marquee__item">
          <span class="marquee__gem">✦</span>
          Compassionate Care
          <span class="marquee__gem">✦</span>
          24 / 7 Availability
          <span class="marquee__gem">✦</span>
          Chapel Facilities
          <span class="marquee__gem">✦</span>
          Dignified Service
        </span>
      </div>
    </div>


    <!-- ══════════════════════════════════════════════════════════
         §3  EMOTIONAL OVERTURE
         Architecture: Full-bleed section, massively oversized
         background numeral "01", emotional text left,
         portrait image right with gold border offset.
         Background: warm linen.
    ══════════════════════════════════════════════════════════ -->
    <section class="section section--warm overture">

      <!-- Ghost chapter numeral backdrop -->
      <span class="overture__ghost-num" aria-hidden="true">01</span>

      <div class="container overture__inner">

        <div class="overture__text">
          <p class="overture__eyebrow overline reveal">We Understand</p>
          <h2 class="overture__heading display-md reveal reveal--d1">
            This Moment<br>is Overwhelming.
          </h2>

          <div class="overture__body">
            <p class="serif-body overture__para reveal reveal--d2">
              The weight of loss is something no one should carry alone. We know the tears
              that fall in quiet moments, the memories that flood back, the impossible
              decisions that need to be made.
            </p>
            <p class="serif-lg overture__emphasis reveal reveal--d3">
              <em>You are not alone in this.</em>
            </p>
          </div>

          <div class="overture__promise reveal reveal--d4">
            <span class="rule rule--amber rule--short" style="flex-shrink:0;margin-top:0.5rem"></span>
            <p class="serif-sm">
              From the first phone call to the final goodbye, we handle every detail with
              tender care — so you can focus on what matters most: being with family,
              remembering, and healing.
            </p>
          </div>
        </div>

        <div class="overture__visual">
          <!-- Gold border offset image frame -->
          <div class="overture__frame reveal reveal--right reveal--d2">
            <div class="overture__frame-border" aria-hidden="true"></div>
            <div class="img-ph overture__img">
              <img src="/images/moment.jpg" alt="A moment of gentle farewell" class="overture__img-img" />
            </div>
          </div>
          <p class="caption overture__caption reveal reveal--d3">
            A moment of gentle farewell
          </p>
        </div>

      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §4  FULL-SCREEN QUOTE PANEL
         Architecture: 100vh photo section. Quotation rendered
         at large scale, vertically centered right side.
         Left side: dark overlay. Right: lighter.
    ══════════════════════════════════════════════════════════ -->
    <section class="testimony">
      <div class="testimony__bg parallax-wrap">
<img src="/images/testimony.jpeg" alt="Testimonial of a family's experience with Velasquez Funeral Home" class="testimony__bg-img" />
        <div class="testimony__veil"></div>
      </div>

      <div class="container testimony__body">
        <div class="testimony__card reveal reveal--scale">
          <span class="testimony__mark" aria-hidden="true">"</span>
          <blockquote class="testimony__quote serif-xl">
            When we lost Papa, the world felt impossible. But from the moment we called
            Velasquez, we felt held. They didn't just arrange a funeral — they helped us
            create a celebration of his life that brought our whole family peace.
          </blockquote>
          <footer class="testimony__cite">
            <span class="rule rule--amber rule--short" style="display:inline-block;vertical-align:middle;margin-right:1rem"></span>
            The Santos Family, Cabiao
          </footer>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §5  SERVICE PILLARS — FOUR COMMITMENTS
         Architecture: Asymmetric horizontal layout. Left column
         = headline + intro text. Right = 2×2 pillar grid.
         Numbers rendered massive in background of each cell.
    ══════════════════════════════════════════════════════════ -->
    <section class="section pillars">

      <span class="pillars__ghost-num" aria-hidden="true">02</span>

      <div class="container pillars__inner">

        <div class="pillars__intro">
          <p class="overline reveal" style="margin-bottom:var(--sp-6)">Our Promise</p>
          <h2 class="display-md pillars__heading reveal reveal--d1">
            Four Ways<br>We Walk<br><em class="em-gold">With You</em>
          </h2>
          <p class="serif-sm pillars__sub reveal reveal--d2" style="color:var(--text-body)">
            Every family we serve receives more than a service — they receive our
            complete, unwavering presence.
          </p>
        </div>

        <div class="pillars__grid">
          <div
            v-for="(p, i) in pillars"
            :key="i"
            class="pillar reveal"
            :class="`reveal--d${i+1}`"
          >
            <span class="pillar__ghost" aria-hidden="true">0{{ i+1 }}</span>
            <div class="pillar__content">
              <h3 class="pillar__title display-xs">{{ p.title }}</h3>
              <p class="pillar__text">{{ p.text }}</p>
            </div>
            <div class="pillar__rule" aria-hidden="true"></div>
          </div>
        </div>

      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §6  HERITAGE — ASYMMETRIC STACKED LAYOUT
         Architecture: Grid-breaking. Left: stacked duo of images
         (large + small offset). Right: text with year badge
         extending OUTSIDE the column. Stats rendered inline.
         Background: deep ivory.
    ══════════════════════════════════════════════════════════ -->
    <section class="section section--deep heritage">

      <div class="container heritage__inner">

        <div class="heritage__visuals">

          <!-- Primary large image -->
          <div class="heritage__img-a parallax-wrap reveal reveal--left">
            <div class="img-ph heritage__ph-a parallax-img">
              <img src="/images/front.jpg" alt="Front view of the funeral home" class="heritage__img-a-img" />
            </div>
          </div>

          <!-- Secondary offset image, overlapping primary -->
          <div class="heritage__img-b reveal reveal--scale reveal--d2">
            <div class="img-ph heritage__ph-b">
              <img src="/images/flower.jpg" alt="Flower arrangement" class="heritage__img-b-img" />
            
            </div>
          </div>

          <!-- Year badge floats between images -->
          <div class="heritage__badge reveal reveal--fade reveal--d3">
            <span class="heritage__badge-year">1970</span>
            <span class="heritage__badge-label">Founded</span>
          </div>

        </div>

        <div class="heritage__content">
          <p class="overline reveal" style="margin-bottom:var(--sp-8)">Trusted Since 1970</p>
          <h2 class="display-md reveal reveal--d1" style="line-height:var(--lh-tight)">
            Five Decades of<br>
            <em class="em-gold">Compassionate Care</em>
          </h2>
          <p class="serif-body heritage__body reveal reveal--d2">
            For half a century, we've been more than a funeral home — we've been neighbors,
            friends, and steadfast companions in life's most difficult moments. Generation
            after generation of Cabiao families have trusted us, and we've never taken that
            sacred responsibility lightly.
          </p>
          <p class="serif-sm heritage__body heritage__body--em reveal reveal--d3">
            We are the <strong>only funeral home in Cabiao</strong> with our own dedicated
            chapel facilities, offering families a serene, dignified space to gather,
            reflect, and say goodbye.
          </p>

          <div class="heritage__stats reveal reveal--d3">
            <div v-for="s in stats" :key="s.value" class="hstat">
              <span class="hstat__val">{{ s.value }}</span>
              <span class="hstat__lbl">{{ s.label }}</span>
            </div>
          </div>

          <router-link to="/about" class="btn btn--ghost-dark btn--cta reveal reveal--d4">
            Our Full Story
          </router-link>
        </div>

      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §7  CASKET SHOWCASE
         Architecture: Magazine-style asymmetric grid.
         Left: dominant tall portrait image with caption overlay.
         Right: two stacked landscape images.
         Header text breaks grid upward.
    ══════════════════════════════════════════════════════════ -->
    <section class="section section--midnight showcase">

      <span class="showcase__ghost-num" aria-hidden="true">03</span>

      <div class="container">
        <div class="showcase__header reveal">
          <p class="overline" style="color:rgba(196,148,74,0.7);margin-bottom:var(--sp-4)">Thoughtfully Curated</p>
          <h2 class="display-md c-ivory">Our Casket Collection</h2>
          <p class="serif-sm showcase__sub reveal reveal--d1">
            Every selection reflects our commitment to dignity. Each casket is chosen
            for its beauty, quality, and the comfort it offers families.
          </p>
        </div>

        <div class="showcase__grid">
          <!-- Main tall image -->
          <div class="showcase__main reveal reveal--left reveal--d1">
            <div class="img-ph img-ph--stone showcase__main-img">
              <img src="/images/showcase.png" alt="Premium casket showcase" class="showcase__main-img-img" />
            </div>
            <div class="showcase__main-caption">
              <span class="label--sm c-amber" style="margin-bottom:0.25rem;display:block">Featured</span>
              <span class="display-xs c-ivory">Premium Selection</span>
            </div>
          </div>

          <!-- Stack of two images -->
          <div class="showcase__stack">
            <div class="showcase__stack-item reveal reveal--right reveal--d2">
              <div class="img-ph img-ph--stone showcase__stack-img">
                <img src="/images/detail.png" alt="Casket detail view" class="showcase__stack-img-img" />
              </div>
            </div>
            <div class="showcase__stack-item reveal reveal--right reveal--d3">
              <div class="img-ph img-ph--stone showcase__stack-img">
                <img src="/images/casketinterior.png" alt="Casket interior view" class="showcase__stack-img-img" />
              </div>
            </div>
          </div>
        </div>

        <div class="showcase__cta reveal reveal--d4">
          <router-link to="/packages" class="btn btn--secondary btn--cta">
            Explore All Packages
          </router-link>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §8  SPLIT PANEL — HEARSE / TRANSPORT
         Architecture: Edge-to-edge two-column split. Left = full-
         bleed dark photo, right = dark panel with content.
         No container wrapper — truly full-width.
    ══════════════════════════════════════════════════════════ -->
    <div class="split">

      <div class="split__photo parallax-wrap">
<img src="/images/hearse.jpg" alt="Professional hearse transport vehicle" class="split__photo-img" />
      </div>

      <div class="split__panel">
        <div class="split__body">
          <p class="overline reveal" style="color:rgba(196,148,74,0.92);margin-bottom:var(--sp-6)">Transport Services</p>
          <h2 class="display-sm c-ivory reveal reveal--d1">
            Every Journey<br>
            <em class="em-light">Handled with Grace</em>
          </h2>
          <p class="serif-sm reveal reveal--d2" style="color:rgba(248,244,239,0.84);margin-block:var(--sp-8)">
            Our dedicated hearse fleet and professional transport team ensure your loved
            one is moved with the utmost care, dignity, and respect at every step — from
            place of rest to final farewell.
          </p>
          <router-link to="/packages" class="btn btn--ghost reveal reveal--d3">
            View Transport Options
          </router-link>
        </div>
      </div>

    </div>


    <!-- ══════════════════════════════════════════════════════════
         §9  ADD-ONS — PERSONALIZATION
         Architecture: Reversed split with warm background.
         Image on right; large text quote in serif floating
         decoratively on left side.
    ══════════════════════════════════════════════════════════ -->
    <section class="section section--warm addons-promo">

      <span class="addons-promo__ghost-num" aria-hidden="true">04</span>

      <div class="container addons-promo__inner">

        <div class="addons-promo__text">
          <p class="overline reveal" style="margin-bottom:var(--sp-6)">Personalization</p>
          <h2 class="display-md reveal reveal--d1">
            Make It<br>
            <em class="em-gold">Uniquely Theirs</em>
          </h2>
          <p class="serif-body addons-promo__body reveal reveal--d2">
            Every life tells a different story. Our additional services — from memorial
            videos and floral arrangements to custom programs and ceremonial elements —
            help you craft a tribute that truly captures who they were.
          </p>
          <p class="serif-lg addons-promo__pull reveal reveal--d3">
            <em>"They were laughter in a room, warmth in an embrace, love in action."</em>
          </p>
          <router-link to="/add-ons" class="btn btn--secondary btn--cta reveal reveal--d4">
            Explore Add-On Services
          </router-link>
        </div>

        <div class="addons-promo__visual">
          <div class="addons-promo__frame reveal reveal--right reveal--d2">
            <div class="img-ph addons-promo__img">
                <img src="/images/flower-arrangement.png" alt="Flower arrangement" class="addons-promo__img-img" />
              [FLOWER ARRANGEMENT]
            </div>
          </div>
        </div>

      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §10  DARK TESTIMONIAL / PROMISE
         Architecture: Full viewport height section.
         Background: midnight. Content: centered glass card.
         Large decorative quote mark bleeds behind card.
    ══════════════════════════════════════════════════════════ -->
    <section class="promise">
      <div class="promise__bg parallax-wrap">
        <div class="img-ph img-ph--dark promise__img parallax-img">
          [FUNERAL SERVICE MOMENT IMAGE — ATMOSPHERIC]
        </div>
        <div class="promise__veil"></div>
      </div>

      <div class="container promise__stage">
        <div class="promise__decoration" aria-hidden="true">"</div>
        <div class="promise__card reveal reveal--scale">
          <p class="promise__text serif-xl">
            Even after the service ends, we're here. Questions at midnight? Overwhelming
            emotions weeks later? Call us. This journey doesn't end in a day, and neither
            does our support.
          </p>
          <div class="promise__footer">
            <span class="promise__hearts c-amber">♥ ♥ ♥ ♥ ♥</span>
            <span class="label--sm" style="color:rgba(248,244,239,0.65)">Our Promise to Every Family</span>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════════════════════
         §11  FINAL CTA BAND
         Architecture: Warm ivory section.
         Left: bold emotional headline, max contrast.
         Right: phone number at large scale, CTA button.
         Bottom: fine print "no pressure" note.
    ══════════════════════════════════════════════════════════ -->
    <section class="section cta-final">
      <div class="container cta-final__inner">

        <div class="cta-final__left">
          <p class="overline reveal" style="margin-bottom:var(--sp-6)">Ready When You Are</p>
          <h2 class="display-lg cta-final__heading reveal reveal--d1">
            You Don't Have to<br>
            <em class="em-gold">Face This Alone</em>
          </h2>
          <p class="serif-body cta-final__sub reveal reveal--d2">
            Day or night, rain or shine — we are ready to listen, to support,
            and to walk this path with you.
          </p>
        </div>

        <div class="cta-final__right reveal reveal--d2">
          <a href="tel:09206609999" class="cta-final__phone">
            <span class="label--sm" style="color:var(--text-muted)">Call us now</span>
            <span class="cta-final__num">0920 660 9999</span>
            <span class="cta-final__num">0915 098 0496</span>
          </a>
          <router-link to="/contact" class="btn btn--primary btn--cta-xl">
            Get in Touch
          </router-link>
          <p class="cta-final__note caption">
            No pressure. No obligation. Just compassion.
          </p>
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
  name: 'HomePage',
  mixins: [seoMeta],
  components: { Navbar, Footer },

  data() {
    return {
      seoTitle: 'Compassionate Funeral Services in Cabiao Since 1970',
      seoDescription: 'Velasquez Funeral and Chapel has served Cabiao, Nueva Ecija with dignity and compassion since 1970. Complete funeral packages, chapel services, and flexible payment plans. Available 24/7.',
      seoKeywords: 'funeral services Cabiao, funeral home Nueva Ecija, burial services, chapel funeral, affordable funeral packages Philippines',
      seoImage: 'https://velasquezfuneral.com/images/velasquez-funeral-og.jpg',
      _cleanupParallax: null,

      pillars: [
        {
          title: 'We Hold Space for Your Grief',
          text: 'There is no rush. No judgment. No right way to grieve. We create a sanctuary where every emotion is honored.'
        },
        {
          title: 'We Lighten Your Burden',
          text: 'From first call to final goodbye, we handle every detail with tender care. You focus on family — we carry the weight.'
        },
        {
          title: 'We Celebrate Their Light',
          text: 'Your loved one was laughter in a room, warmth in an embrace, love in action. Together we create a tribute that captures their essence.'
        },
        {
          title: 'We Walk With You',
          text: 'Even after the service ends, we are here. Questions at midnight. Overwhelming emotions weeks later. Call us anytime.'
        }
      ],

      stats: [
        { value: '24/7', label: 'Always available'  },
        { value: '2',    label: 'Chapel branches'   },
        { value: '50+',  label: 'Years of service'  }
      ]
    }
  },

  mounted() {
    useReveal()
    this._cleanupParallax = useParallax()
    this._addStructuredData()
  },

  beforeUnmount() {
    if (this._cleanupParallax) this._cleanupParallax()
  },

  methods: {
    _addStructuredData() {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FuneralHome',
        name: 'Velasquez Funeral and Chapel',
        description: 'Compassionate funeral services in Cabiao, Nueva Ecija since 1970.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '7V36+M7C, Jose Abad Santos Ave',
          addressLocality: 'Cabiao',
          addressRegion: 'Nueva Ecija',
          addressCountry: 'PH'
        },
        telephone: ['+639206609999', '+639150980496'],
        openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59',
        foundingDate: '1970'
      })
      document.head.appendChild(s)
    }
  }
}
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════
   §1  HERO
═══════════════════════════════════════════════════════════ */
.hero {
  position: relative;
  height: 100vh; min-height: 700px;
  display: flex; flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

/* Background layers */
.hero__canvas {
  position: absolute; inset: 0; z-index: 0;
}
.hero__canvas-img {
  width: 100%; height: 100%; min-height: 700px;
}
/* Gradient: heavy at bottom for readability, thin at top */
.hero__veil {
  position: absolute; inset: 0;
  background:
    linear-gradient(to top,  rgba(15,14,12,0.95) 0%, rgba(15,14,12,0.65) 35%, rgba(15,14,12,0.2) 70%, transparent 100%),
    linear-gradient(to right, rgba(15,14,12,0.4) 0%, transparent 60%);
}
/* CSS film grain */
.hero__grain {
  position: absolute; inset: 0; z-index: 1; pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

/* Rotated aside label */
.hero__aside {
  position: absolute; left: 0; top: 50%; z-index: 3;
  transform: translateY(-50%) translateX(-50%) rotate(-90deg);
  transform-origin: center center;
  pointer-events: none;
}
.hero__aside-text {
  font-family: var(--font-sans); font-size: 0.8rem;
  font-weight: 400; letter-spacing: var(--ls-ultra); text-transform: uppercase;
  color: rgba(248,244,239,0.25); white-space: nowrap;
}

/* Main stage — all content */
.hero__stage {
  position: relative; z-index: 3;
  padding-top: calc(var(--nav-height) + clamp(2rem, 6vh, 5rem));
  padding-bottom: clamp(4rem, 8vh, 7rem);
  padding-inline: clamp(1.25rem, 5vw, 3.5rem);
  max-width: var(--container);
  margin-inline: auto;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* Meta bar */
.hero__meta {
  display: flex; align-items: center; gap: var(--sp-4);
  margin-bottom: var(--sp-6);
}
.hero__meta-rule {
  display: block; width: 40px; height: 1px;
  background: rgba(196,148,74,0.6);
}
.hero__meta-dot { color: rgba(248,244,239,0.2); }

/* Hero title — three clean lines, consistent scale */
.hero__title {
  display: flex; flex-direction: column; gap: 0;
  font-family: var(--font-display); font-weight: 400;
  line-height: 1.0; letter-spacing: -0.02em;
  margin-bottom: var(--sp-10);
}
.hero__title-line {
  display: block;
  font-size: clamp(3.5rem, 9vw, 8rem);
  color: var(--linen);
}
.hero__title-em {
  display: block;
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-style: italic;
  color: var(--amber);
  line-height: 1.0;
}

/* Bottom footer row */
.hero__footer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--sp-16);
  align-items: flex-end;
}
.hero__lead {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 1.8vw, 1.45rem);
  line-height: var(--lh-loose);
  color: rgba(248,244,239,0.92);
  max-width: 580px;
}
.hero__actions {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: var(--sp-4);
  flex-shrink: 0;
}

/* Scroll cue */
.hero__scroll-cue {
  position: absolute; bottom: var(--sp-6); right: clamp(1.25rem, 5vw, 3.5rem);
  display: flex; flex-direction: column; align-items: center; gap: var(--sp-2);
  z-index: 3; animation: float 2.8s ease-in-out infinite;
}
.hero__scroll-line {
  width: 1px; height: 52px;
  background: linear-gradient(to bottom, rgba(196,148,74,0.7), transparent);
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(10px); }
}


/* ═══════════════════════════════════════════════════════════
   §2  MARQUEE
═══════════════════════════════════════════════════════════ */
.marquee {
  background: var(--onyx); overflow: hidden;
  padding-block: var(--sp-4);
  border-top: 1px solid rgba(196,148,74,0.1);
  border-bottom: 1px solid rgba(196,148,74,0.1);
}
.marquee__track {
  display: flex; white-space: nowrap;
  animation: marquee-scroll 40s linear infinite;
}
.marquee__item {
  display: inline-flex; align-items: center; gap: var(--sp-4);
  font-size: 0.82rem; letter-spacing: var(--ls-ultra); text-transform: uppercase;
  color: rgba(196,148,74,0.72); padding-right: var(--sp-6); flex-shrink: 0;
}
.marquee__gem { color: var(--amber); font-size: 0.4rem; }
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}


/* ═══════════════════════════════════════════════════════════
   §3  EMOTIONAL OVERTURE
═══════════════════════════════════════════════════════════ */
.overture { overflow: hidden; }

/* Ghost numeral backdrop */
.overture__ghost-num {
  position: absolute; right: -0.05em; top: -0.2em;
  font-family: var(--font-display); font-size: clamp(18rem, 35vw, 32rem);
  font-style: italic; line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(196,148,74,0.07);
  pointer-events: none; user-select: none; z-index: 0;
}

.overture__inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(4rem, 9vw, 10rem);
  align-items: center;
}

.overture__eyebrow { margin-bottom: var(--sp-6); }
.overture__heading { margin-bottom: var(--sp-10); color: var(--text-primary); }

.overture__body { margin-bottom: var(--sp-8); }
.overture__para { color: var(--text-body); margin-bottom: var(--sp-6); }
.overture__emphasis {
  color: var(--text-body); font-style: normal;
  font-size: var(--text-xl);
  line-height: var(--lh-snug);
}
.overture__emphasis em { font-style: italic; color: var(--text-primary); }

.overture__promise {
  display: flex; gap: var(--sp-5); align-items: flex-start;
  padding: var(--sp-6);
  background: rgba(196,148,74,0.06);
  border: 1px solid rgba(196,148,74,0.12);
}
.overture__promise p { color: var(--text-body); font-style: italic; }

/* Visual column */
.overture__frame {
  position: relative;
}
/* Gold border offset — decorative element behind image */
.overture__frame-border {
  position: absolute;
  top: var(--sp-6); right: calc(-1 * var(--sp-6));
  width: 100%; height: 100%;
  border: 1px solid rgba(196,148,74,0.3);
  z-index: -1;
}
.overture__img {
  width: 100%; aspect-ratio: 3/4; min-height: 520px;
}
.overture__caption {
  margin-top: var(--sp-4); text-align: right;
}


/* ═══════════════════════════════════════════════════════════
   §4  TESTIMONY
═══════════════════════════════════════════════════════════ */
.testimony {
  position: relative; min-height: 80vh;
  display: flex; align-items: center;
  overflow: hidden;
}
.testimony__bg { position: absolute; inset: 0; }
.testimony__img { width: 100%; height: 100%; min-height: 80vh; }
.testimony__veil {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15,14,12,0.92) 0%,
    rgba(15,14,12,0.70) 50%,
    rgba(15,14,12,0.50) 100%
  );
}
.testimony__body { position: relative; z-index: 2; }
.testimony__card {
  max-width: 760px;
  padding: var(--sp-16);
  border: 1px solid rgba(196,148,74,0.15);
  background: rgba(248,244,239,0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  position: relative;
}
.testimony__mark {
  display: block;
  font-family: var(--font-display);
  font-size: 9rem; line-height: 0.6;
  color: var(--amber); opacity: 0.25;
  margin-bottom: var(--sp-6);
}
.testimony__quote {
  color: var(--linen); font-weight: 300;
  margin-bottom: var(--sp-10);
}
.testimony__cite {
  font-family: var(--font-sans); font-size: 0.9rem;
  letter-spacing: 1px; text-transform: uppercase;
  color: rgba(196,148,74,0.85); font-style: normal;
  display: flex; align-items: center; gap: var(--sp-2);
}


/* ═══════════════════════════════════════════════════════════
   §5  PILLARS
═══════════════════════════════════════════════════════════ */
.pillars { overflow: hidden; }

.pillars__ghost-num {
  position: absolute; left: -0.05em; top: -0.25em;
  font-family: var(--font-display); font-size: clamp(3rem, 7vw, 8rem);
  font-style: italic; line-height: 1; color: transparent;
  -webkit-text-stroke: 1px rgba(58,54,50,0.05);
  pointer-events: none; user-select: none; z-index: 0;
}

.pillars__inner {
  position: relative; z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: clamp(4rem, 9vw, 10rem);
  align-items: flex-start;
}

.pillars__heading { margin-bottom: var(--sp-8); }
.pillars__sub { max-width: 280px; margin-top: var(--sp-4); }

.pillars__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px; /* Grid lines via gap on dark bg */
  background: var(--border);
  border: 1px solid var(--border);
}

.pillar {
  position: relative; overflow: hidden;
  background: var(--bg);
  padding: var(--sp-10) var(--sp-8);
  transition: background var(--dur-base) var(--ease-out);
}
.pillar:hover { background: var(--bg-warm); }

.pillar__ghost {
  position: absolute; top: var(--sp-4); right: var(--sp-4);
  font-family: var(--font-display); font-size: clamp(4rem, 6vw, 6rem);
  font-style: italic; color: transparent;
  -webkit-text-stroke: 1px rgba(196,148,74,0.12);
  line-height: 1; pointer-events: none;
  transition: opacity var(--dur-base) var(--ease-out);
}
.pillar:hover .pillar__ghost { opacity: 0.5; }

.pillar__content { position: relative; z-index: 1; }
.pillar__title { margin-bottom: var(--sp-4); font-size: clamp(1.375rem, 2vw, 1.875rem); }
.pillar__text {
  font-size: 1.0625rem; line-height: 1.85;
  color: var(--text-body);
}
.pillar__rule {
  margin-top: var(--sp-8);
  width: 28px; height: 1px; background: var(--amber); opacity: 0.5;
  transition: width var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out);
}
.pillar:hover .pillar__rule { width: 48px; opacity: 1; }


/* ═══════════════════════════════════════════════════════════
   §6  HERITAGE
═══════════════════════════════════════════════════════════ */
.heritage__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(4rem, 8vw, 9rem);
  align-items: center;
}

.heritage__visuals { position: relative; padding-bottom: var(--sp-16); }

.heritage__img-a { width: 80%; }
.heritage__ph-a  { aspect-ratio: 3/4; min-height: 520px; }

/* Overlapping second image — bottom right of main */
.heritage__img-b {
  position: absolute; bottom: 0; right: 0;
  width: 48%;
  border: 5px solid var(--bg-deep);
  box-shadow: var(--shadow-lg);
}
.heritage__ph-b { aspect-ratio: 1; min-height: 180px; }

/* Badge — floats over intersection */
.heritage__badge {
  position: absolute; top: var(--sp-8); right: var(--sp-8);
  background: var(--amber); color: var(--midnight);
  padding: var(--sp-5) var(--sp-6);
  display: flex; flex-direction: column; align-items: center;
  gap: var(--sp-1); text-align: center;
}
.heritage__badge-year {
  font-family: var(--font-display); font-size: var(--text-3xl); line-height: 1;
}
.heritage__badge-label {
  font-size: 0.8rem; letter-spacing: 2px;
  text-transform: uppercase; line-height: 1.4;
}

.heritage__body { color: var(--text-body); margin-bottom: var(--sp-6); }
.heritage__body--em strong { color: var(--onyx); }

.heritage__stats {
  display: flex; gap: var(--sp-10);
  padding-block: var(--sp-8);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  margin-bottom: var(--sp-10);
}
.hstat { display: flex; flex-direction: column; gap: 3px; }
.hstat__val {
  font-family: var(--font-display); font-size: var(--text-3xl);
  color: var(--amber); line-height: 1;
}
.hstat__lbl {
  font-size: 0.85rem; letter-spacing: 1px;
  text-transform: uppercase; color: var(--text-muted);
}


/* ═══════════════════════════════════════════════════════════
   §7  SHOWCASE
═══════════════════════════════════════════════════════════ */
.showcase { overflow: hidden; }

.showcase__ghost-num {
  position: absolute; right: -0.05em; bottom: -0.3em;
  font-family: var(--font-display); font-size: clamp(16rem, 30vw, 28rem);
  font-style: italic; line-height: 1; color: transparent;
  -webkit-text-stroke: 1px rgba(248,244,239,0.04);
  pointer-events: none; user-select: none; z-index: 0;
}

.showcase__header { margin-bottom: var(--sp-16); position: relative; z-index: 1; }
.showcase__sub { color: rgba(248,244,239,0.78); margin-top: var(--sp-6); max-width: 540px; }

.showcase__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--sp-4);
  position: relative; z-index: 1;
}

/* Main portrait image */
.showcase__main { position: relative; }
.showcase__main-img { width: 100%; aspect-ratio: 3/4; min-height: 500px; }
.showcase__main-caption {
  position: absolute; bottom: var(--sp-8); left: var(--sp-8);
  padding: var(--sp-5) var(--sp-6);
  background: rgba(15,14,12,0.6);
  backdrop-filter: blur(8px);
}

.showcase__stack { display: flex; flex-direction: column; gap: var(--sp-4); }
.showcase__stack-item { flex: 1; }
.showcase__stack-img { width: 100%; aspect-ratio: 4/3; min-height: 140px; }

.showcase__cta { margin-top: var(--sp-16); text-align: center; position: relative; z-index: 1; }


/* ═══════════════════════════════════════════════════════════
   §8  SPLIT PANEL (full bleed — no .container)
═══════════════════════════════════════════════════════════ */
.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 620px;
}
.split__photo { position: relative; overflow: hidden; }
.split__photo-img { width: 100%; height: 100%; min-height: 620px; }
.split__panel {
  background: var(--onyx);
  display: flex; align-items: center;
  padding: clamp(3rem, 7vw, 7rem);
}
.split__body { max-width: 480px; }


/* ═══════════════════════════════════════════════════════════
   §9  ADD-ONS PROMO
═══════════════════════════════════════════════════════════ */
.addons-promo { overflow: hidden; }

.addons-promo__ghost-num {
  position: absolute; left: -0.05em; bottom: -0.2em;
  font-family: var(--font-display); font-size: clamp(16rem, 30vw, 28rem);
  font-style: italic; line-height: 1; color: transparent;
  -webkit-text-stroke: 1px rgba(196,148,74,0.06);
  pointer-events: none; user-select: none; z-index: 0;
}

.addons-promo__inner {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: clamp(4rem, 9vw, 10rem); align-items: center;
  position: relative; z-index: 1;
}

.addons-promo__body { color: var(--text-body); margin-bottom: var(--sp-8); }
.addons-promo__pull {
  color: var(--text-body); margin-bottom: var(--sp-10);
  padding-left: var(--sp-6);
  border-left: 2px solid rgba(196,148,74,0.4);
}

.addons-promo__frame { position: relative; }
.addons-promo__img { width: 100%; aspect-ratio: 3/4; min-height: 520px; }


/* ═══════════════════════════════════════════════════════════
   §10  PROMISE
═══════════════════════════════════════════════════════════ */
.promise {
  position: relative; min-height: 70vh;
  display: flex; align-items: center; overflow: hidden;
}
.promise__bg { position: absolute; inset: 0; }
.promise__img { width: 100%; height: 100%; min-height: 70vh; }
.promise__veil {
  position: absolute; inset: 0;
  background: rgba(15,14,12,0.82);
}
.promise__stage {
  position: relative; z-index: 2;
  display: flex; align-items: center; justify-content: center;
}
.promise__decoration {
  position: absolute; top: -0.5em; left: 0;
  font-family: var(--font-display); font-size: clamp(14rem, 28vw, 26rem);
  font-style: normal; line-height: 0.8;
  color: rgba(196,148,74,0.05); pointer-events: none; user-select: none;
}
.promise__card {
  position: relative; z-index: 1;
  max-width: 820px; padding: var(--sp-20);
  border: 1px solid rgba(196,148,74,0.12);
  background: rgba(248,244,239,0.03);
  backdrop-filter: blur(12px);
}
.promise__text { color: var(--linen); font-weight: 300; text-align: center; }
.promise__footer {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--sp-3); margin-top: var(--sp-10);
}
.promise__hearts { letter-spacing: 0.3em; font-size: 1rem; }


/* ═══════════════════════════════════════════════════════════
   §11  CTA FINAL
═══════════════════════════════════════════════════════════ */
.cta-final__inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--sp-16);
  align-items: center;
}
.cta-final__heading { margin-bottom: var(--sp-6); }
.cta-final__sub { color: var(--text-body); max-width: 420px; }
.cta-final__right {
  display: flex; flex-direction: column;
  align-items: flex-end; gap: var(--sp-6);
}
.cta-final__phone {
  display: flex; flex-direction: column; align-items: flex-end; gap: var(--sp-1);
  text-decoration: none;
}
.cta-final__num {
  font-family: var(--font-display);
  font-size: var(--display-sm); color: var(--amber);
  letter-spacing: 0.02em; line-height: 1;
  transition: color var(--dur-fast) var(--ease-out);
}
.cta-final__phone:hover .cta-final__num { color: var(--amber-deep); }
.cta-final__note { color: var(--text-muted); }


/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════════════════ */
@media (max-width: 1200px) {
  .pillars__inner { grid-template-columns: 1fr; }
  .pillars__sub   { max-width: none; }
  .pillars__grid  { grid-template-columns: repeat(2, 1fr); }
  .heritage__inner { grid-template-columns: 1fr; gap: var(--sp-24); }
  .heritage__visuals { order: 2; }
  .showcase__grid { grid-template-columns: 1fr; }
  .showcase__stack {
    flex-direction: row;
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .overture__inner    { grid-template-columns: 1fr; }
  .overture__visual   { order: -1; }
  .overture__frame-border { display: none; }
  .addons-promo__inner { grid-template-columns: 1fr; }
  .addons-promo__visual { order: -1; }
  .split { grid-template-columns: 1fr; }
  .split__photo { min-height: 360px; }
  .split__photo-img { min-height: 360px; }
  .cta-final__inner { grid-template-columns: 1fr; }
  .cta-final__right { align-items: flex-start; }
  .cta-final__phone { align-items: flex-start; }
}
@media (max-width: 768px) {
  .hero__title-line  { font-size: clamp(2.8rem, 11vw, 5rem); }
  .hero__title-em    { font-size: clamp(2.8rem, 11vw, 5rem); }
  .hero__footer      { grid-template-columns: 1fr; gap: var(--sp-8); }
  .hero__actions     { align-items: flex-start; }
  .pillars__grid     { grid-template-columns: 1fr; }
  .heritage__img-b   { display: none; }
  .heritage__badge   { display: none; }
  .showcase__stack   { flex-direction: column; }
  .testimony__card   { padding: var(--sp-8); }
  .promise__card     { padding: var(--sp-12) var(--sp-8); }
}
</style>