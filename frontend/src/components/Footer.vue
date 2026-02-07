<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>Velasquez Funeral & Chapel</h3>
          <p>Serving Cabiao, Nueva Ecija with compassionate funeral services since 1970.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/packages">Packages</router-link></li>
            <li><router-link to="/blogs">Blogs</router-link></li>
            <li><router-link to="/add-ons">Add-Ons</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><router-link to="/packages">Funeral Services</router-link></li>
            <li><router-link to="/packages">Chapel Venue</router-link></li>
            <li><router-link to="/add-ons">Burial Coordination</router-link></li>
            <li><router-link to="/contact">Pre-Planning</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <p>Cabiao, Nueva Ecija<br>Philippines</p>
          <p>Available 24/7</p>
          <router-link to="/contact" class="footer-link">Contact Us</router-link>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Velasquez Funeral and Chapel. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>