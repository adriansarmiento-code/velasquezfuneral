<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">

        <!-- Brand column -->
        <div>
          <p class="footer__brand-name">Velasquez</p>
          <p class="footer__brand-tagline">Funeral &amp; Chapel</p>
          <p class="footer__brand-desc">
            Serving Cabiao, Nueva Ecija with compassionate funeral services
            since 1970. Trusted by generations of families.
          </p>
          <div class="footer__avail">
            <span class="footer__avail-dot"></span>
            Available 24 hours &middot; 7 days a week
          </div>
        </div>

        <!-- Quick links -->
        <div>
          <p class="footer__col-heading">Quick Links</p>
          <nav class="footer__links">
            <router-link to="/"         class="footer__link">Home</router-link>
            <router-link to="/packages" class="footer__link">Packages</router-link>
            <router-link to="/blogs"    class="footer__link">Blogs</router-link>
            <router-link to="/add-ons"  class="footer__link">Add-Ons</router-link>
            <router-link to="/about"    class="footer__link">About Us</router-link>
            <router-link to="/contact"  class="footer__link">Contact Us</router-link>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <p class="footer__col-heading">Our Services</p>
          <nav class="footer__links">
            <router-link to="/packages" class="footer__link">Funeral Services</router-link>
            <router-link to="/packages" class="footer__link">Chapel Venue</router-link>
            <router-link to="/add-ons"  class="footer__link">Burial Coordination</router-link>
            <router-link to="/contact"  class="footer__link">Pre-Planning</router-link>
            <router-link to="/packages" class="footer__link">Flexible Payment Plans</router-link>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <p class="footer__col-heading">Contact Information</p>

          <div class="footer__contact-item">
            <p class="footer__contact-label">Phone Numbers</p>
            <a href="tel:09206609999" class="footer__contact-value footer__contact-link">0920 660 9999</a>
            <a href="tel:09150980496" class="footer__contact-value footer__contact-link">0915 098 0496</a>
          </div>

          <div class="footer__contact-item">
            <p class="footer__contact-label">Address</p>
            <p class="footer__contact-value">
              7V36+M7C, Jose Abad Santos Ave<br>
              Cabiao, Nueva Ecija, Philippines
            </p>
            <a
              href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47"
              target="_blank"
              rel="noopener"
              class="footer__contact-link"
              style="color:var(--amber);font-size:0.88rem;letter-spacing:0.05em;"
            >Get Directions →</a>
          </div>

          <div class="footer__contact-item">
            <p class="footer__contact-label">Availability</p>
            <p class="footer__contact-value">24 Hours · 7 Days a Week</p>
          </div>
        </div>

      </div>

      <div class="footer__bottom">
        <p>&copy; {{ year }} Velasquez Funeral and Chapel. All rights reserved.</p>
        <div class="footer__bottom-links">
          <router-link to="/about"   class="footer__bottom-link">About</router-link>
          <router-link to="/contact" class="footer__bottom-link">Contact</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  computed: {
    year() { return new Date().getFullYear() }
  }
}
</script>