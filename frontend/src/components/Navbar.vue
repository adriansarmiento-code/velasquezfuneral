<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="logo">
          <span class="logo-text">Velasquez</span>
          <span class="logo-subtitle">Funeral & Chapel</span>
        </router-link>
        <button 
          class="mobile-menu-toggle" 
          :class="{ active: menuOpen }"
          @click="toggleMenu" 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><router-link to="/" @click="closeMenu">Home</router-link></li>
          <li><router-link to="/packages" @click="closeMenu">Packages</router-link></li>
          <li><router-link to="/blogs" @click="closeMenu">Blogs</router-link></li>
          <li><router-link to="/add-ons" @click="closeMenu">Add-Ons</router-link></li>
          <li><router-link to="/about" @click="closeMenu">About Us</router-link></li>
          <li><router-link to="/contact" @click="closeMenu">Contact Us</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      menuOpen: false,
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      if (this.menuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMenu() {
      this.menuOpen = false
      document.body.style.overflow = ''
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.nav-phone {
  display: none;
}

.nav-phone a {
  background: #d4af37;
  color: #0a0a0a;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-phone a:hover {
  background: #b8962e;
}

@media (max-width: 768px) {
  .nav-phone {
    display: block;
    margin-top: 1rem;
  }

  .mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
}
</style>