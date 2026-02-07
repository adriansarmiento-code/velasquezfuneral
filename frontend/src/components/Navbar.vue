<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-wrapper">
        <router-link to="/" class="logo">
          <span class="logo-text">Velasquez</span>
          <span class="logo-subtitle">Funeral & Chapel</span>
        </router-link>
        <button class="mobile-menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
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
  name: 'Navbar',
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    }
  }
}
</script>