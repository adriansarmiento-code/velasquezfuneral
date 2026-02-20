<template>
  <div class="nav-wrap">

    <!-- 1. Fixed nav bar -->
    <nav class="nav" :class="navClass">
      <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
      <div class="nav__inner">

        <router-link to="/" class="nav__logo" @click="closeMenu">
          <span class="nav__logo-name">Velasquez</span>
          <span class="nav__logo-sub">Funeral &amp; Chapel</span>
        </router-link>

        <ul class="nav__links">
          <li v-for="link in links" :key="link.to">
            <router-link :to="link.to" class="nav__link">{{ link.label }}</router-link>
          </li>
        </ul>

        <a href="tel:09206609999" class="nav__emergency">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12.7 19.79 19.79 0 0 1 1.06 4.11 2 2 0 0 1 3 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          0920 660 9999
        </a>

      </div>
    </nav>

    <!-- 2. Hamburger — fixed sibling, z-index 9999, never covered by anything -->
    <button
      class="nav__hamburger"
      :class="{ 'is-open': menuOpen }"
      @click="toggleMenu"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- 3. Full-screen mobile overlay -->
    <div class="nav-mobile" :class="{ 'is-open': menuOpen }">
      <p class="nav-mobile__eyebrow">Velasquez Funeral &amp; Chapel</p>
      <nav class="nav-mobile__links">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-mobile__link"
          @click="closeMenu"
        >{{ link.label }}</router-link>
      </nav>
      <div class="nav-mobile__footer">
        <a href="tel:09206609999" class="nav-mobile__phone">0920 660 9999</a>
        <span class="nav-mobile__note">Available 24 hours &middot; 7 days</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      menuOpen: false,
      scrolled: false,
      scrollProgress: 0,
      isHeroPage: false,
      savedScrollY: 0,
      links: [
        { to: '/',         label: 'Home'       },
        { to: '/packages', label: 'Packages'   },
        { to: '/blogs',    label: 'Blogs'      },
        { to: '/add-ons',  label: 'Add-Ons'    },
        { to: '/about',    label: 'About Us'   },
        { to: '/contact',  label: 'Contact Us' },
      ]
    }
  },
  computed: {
    navClass() {
      return {
        'nav--clear':    !this.scrolled && this.isHeroPage && !this.menuOpen,
        'nav--scrolled':  this.scrolled || this.menuOpen,
      }
    }
  },
  watch: {
    $route() {
      this.closeMenu()
      this.checkRoute()
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
    this.checkRoute()
    this.handleScroll()
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    // Clean up scroll lock if menu was open during navigation
    this.closeMenu()
  },
  methods: {
    handleScroll() {
      if (!this.menuOpen) {
        const scrollY = window.scrollY
        const docH = document.documentElement.scrollHeight - window.innerHeight
        this.scrolled = scrollY > 60
        this.scrollProgress = docH > 0 ? scrollY / docH : 0
      }
    },
    checkRoute() {
      this.isHeroPage = this.$route.path === '/'
    },
    toggleMenu() {
      this.menuOpen ? this.closeMenu() : this.openMenu()
    },
    openMenu() {
      this.savedScrollY = window.scrollY
      this.menuOpen = true
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${this.savedScrollY}px`
      document.body.style.left      = '0'
      document.body.style.right     = '0'
      document.body.style.overflowY = 'scroll'
    },
    closeMenu() {
      this.menuOpen = false
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.left      = ''
      document.body.style.right     = ''
      document.body.style.overflowY = ''
      if (this.savedScrollY > 0) {
        window.scrollTo(0, this.savedScrollY)
        this.savedScrollY = 0
      }
    }
  }
}
</script>