<template>
  <div class="adm-login">
    <div class="adm-login__panel">

      <div class="adm-login__brand">
        <span class="adm-login__brand-name">Velasquez</span>
        <span class="adm-login__brand-tagline">Funeral &amp; Chapel</span>
        <span class="adm-login__brand-sub">Admin Access</span>
      </div>

      <div v-if="errorMessage" class="alert alert--error" style="margin-bottom:var(--sp-6)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="adm-login__form">
        <div class="form-group">
          <label class="form-label" for="username">Username</label>
          <input
            class="form-input"
            type="text"
            id="username"
            v-model="credentials.username"
            required
            placeholder="Enter your username"
            autocomplete="username"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            class="form-input"
            type="password"
            id="password"
            v-model="credentials.password"
            required
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>

        <button type="submit" class="adm-login__submit" :disabled="loading">
          <span v-if="loading" class="adm-login__spinner"></span>
          {{ loading ? 'Signing in…' : 'Sign In' }}
        </button>
      </form>

      <p class="adm-login__back">
        <a href="/" style="color:var(--stone);font-size:var(--text-xs);letter-spacing:var(--ls-wide);text-transform:uppercase;">← Back to Website</a>
      </p>
    </div>

    <div class="adm-login__deco" aria-hidden="true">
      <div class="adm-login__deco-text">Velasquez</div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'AdminLoginPage',
  data() {
    return {
      credentials: { username: '', password: '' },
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errorMessage = ''
      try {
        const response = await api.adminLogin(this.credentials)
        if (response.data.success) {
          localStorage.setItem('adminToken', response.data.token)
          localStorage.setItem('adminUser', JSON.stringify(response.data.admin))
          this.$router.push('/admin/dashboard')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.adm-login {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 480px 1fr;
  background: var(--linen);
}

.adm-login__panel {
  background: var(--linen);
  padding: var(--sp-16) var(--sp-12);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--border);
}

/* Brand */
.adm-login__brand {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--sp-12);
}
.adm-login__brand-name {
  font-family: var(--font-elegant);
  font-size: 2rem;
  color: var(--onyx);
  letter-spacing: 3px;
  line-height: 1;
}
.adm-login__brand-tagline {
  font-family: var(--font-serif);
  font-size: var(--text-base);
  font-style: italic;
  color: var(--amber);
  margin-top: var(--sp-1);
}
.adm-login__brand-sub {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: var(--stone);
  margin-top: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--border);
}

.adm-login__form { display: flex; flex-direction: column; gap: var(--sp-2); }

.adm-login__submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-3);
  margin-top: var(--sp-4);
  padding: 1rem 2rem;
  background: var(--amber);
  color: var(--onyx);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 700;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
  width: 100%;
}
.adm-login__submit:hover:not(:disabled) {
  background: var(--amber-deep);
  transform: translateY(-1px);
}
.adm-login__submit:disabled { opacity: 0.65; cursor: not-allowed; }

.adm-login__spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(28,25,23,0.25);
  border-top-color: var(--onyx);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.adm-login__back { margin-top: var(--sp-8); text-align: center; }

/* Decorative right panel */
.adm-login__deco {
  background: var(--onyx);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.adm-login__deco::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(196,148,74,0.1) 0%, transparent 70%);
}
.adm-login__deco-text {
  font-family: var(--font-elegant);
  font-size: clamp(5rem, 12vw, 12rem);
  color: rgba(196,148,74,0.07);
  letter-spacing: 0.2em;
  user-select: none;
  position: relative;
}

@media (max-width: 768px) {
  .adm-login { grid-template-columns: 1fr; }
  .adm-login__deco { display: none; }
  .adm-login__panel { padding: var(--sp-10) var(--sp-6); }
}
</style>