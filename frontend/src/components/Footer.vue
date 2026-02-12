<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>Velasquez Funeral & Chapel</h3>
          <p>Serving Cabiao, Nueva Ecija with compassionate funeral services since 1970. We're here for you 24 hours a day, 7 days a week.</p>
          
          <div class="footer-social" style="margin-top: 1.5rem;">
            <p style="font-weight: 600; color: #d4af37; margin-bottom: 0.5rem;">Available 24/7</p>
          </div>
        </div>

        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/packages">Packages</router-link></li>
            <li><router-link to="/blogs">Blogs</router-link></li>
            <li><router-link to="/add-ons">Add-Ons</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Our Services</h4>
          <ul>
            <li><router-link to="/packages">Funeral Services</router-link></li>
            <li><router-link to="/packages">Chapel Venue</router-link></li>
            <li><router-link to="/add-ons">Burial Coordination</router-link></li>
            <li><router-link to="/contact">Pre-Planning</router-link></li>
            <li><router-link to="/packages">Flexible Payment Plans</router-link></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contact Information</h4>
          <div class="contact-details">
            <div class="contact-item">
              <strong>📞 Phone Numbers:</strong>
              <a href="tel:09206609999">0920 660 9999</a>
              <a href="tel:09150980496">0915 098 0496</a>
            </div>

            <div class="contact-item">
              <strong>📍 Address:</strong>
              <p>7V36+M7C, Jose Abad Santos Ave<br>Cabiao, Nueva Ecija<br>Philippines</p>
              <a href="https://maps.app.goo.gl/6CYf6HWiwwE6gju47" target="_blank" rel="noopener" class="footer-link">Get Directions →</a>
            </div>

            <div class="contact-item">
              <strong>🕐 Availability:</strong>
              <p>24 Hours a Day<br>7 Days a Week<br>Always Here for You</p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2025 Velasquez Funeral and Chapel. All rights reserved.</p>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">Serving Cabiao families with dignity and compassion since 1970</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
}
</script>

<style scoped>
.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.contact-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.contact-item strong {
  display: block;
  color: #d4af37;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.contact-item a {
  display: block;
  color: rgba(255,255,255,0.8);
  padding: 0.25rem 0;
  transition: all 0.3s ease;
}

.contact-item a:hover {
  color: #d4af37;
  padding-left: 5px;
}

.contact-item p {
  margin: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.footer-bottom-content {
  text-align: center;
}

@media (max-width: 768px) {
  .contact-details {
    gap: 1rem;
  }
}
</style>