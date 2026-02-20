<template>
  <div class="adm-layout">
    <AdminSidebar />

    <div class="adm-main">
      <!-- Top bar -->
      <header class="adm-topbar">
        <div>
          <h1 class="adm-topbar__title">Dashboard</h1>
          <p class="adm-topbar__sub">Welcome back, {{ adminName }}</p>
        </div>
        <div class="adm-topbar__actions">
          <button class="adm-btn adm-btn--ghost" @click="showChangePasswordModal = true">Change Password</button>
          <button class="adm-btn adm-btn--danger-ghost" @click="logout">Sign Out</button>
        </div>
      </header>

      <!-- Stats row -->
      <div class="adm-stats">
        <div class="adm-stat">
          <span class="adm-stat__label">Contact Submissions</span>
          <span class="adm-stat__value">{{ stats.contacts }}</span>
          <router-link to="/admin/contacts" class="adm-stat__link">View all →</router-link>
        </div>
        <div class="adm-stat">
          <span class="adm-stat__label">Published Blogs</span>
          <span class="adm-stat__value">{{ stats.blogs }}</span>
          <router-link to="/admin/blogs" class="adm-stat__link">Manage →</router-link>
        </div>
        <div class="adm-stat">
          <span class="adm-stat__label">Active Packages</span>
          <span class="adm-stat__value">{{ stats.packages }}</span>
          <router-link to="/admin/packages" class="adm-stat__link">Manage →</router-link>
        </div>
        <div class="adm-stat">
          <span class="adm-stat__label">Published Add-Ons</span>
          <span class="adm-stat__value">{{ stats.addons }}</span>
          <router-link to="/admin/addons" class="adm-stat__link">Manage →</router-link>
        </div>
      </div>

      <!-- Quick actions -->
      <section class="adm-section">
        <h2 class="adm-section__title">Quick Actions</h2>
        <div class="adm-cards">
          <router-link to="/admin/blogs" class="adm-card">
            <div class="adm-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            </div>
            <h3 class="adm-card__title">Manage Blogs</h3>
            <p class="adm-card__desc">Create, edit, and publish blog posts</p>
          </router-link>
          <router-link to="/admin/packages" class="adm-card">
            <div class="adm-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <h3 class="adm-card__title">Packages &amp; Caskets</h3>
            <p class="adm-card__desc">Update funeral service packages and casket listings</p>
          </router-link>
          <router-link to="/admin/addons" class="adm-card">
            <div class="adm-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <h3 class="adm-card__title">Add-Ons</h3>
            <p class="adm-card__desc">Manage additional services offered to families</p>
          </router-link>
          <router-link to="/admin/contacts" class="adm-card">
            <div class="adm-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h3 class="adm-card__title">Contact Submissions</h3>
            <p class="adm-card__desc">Review messages sent through the contact form</p>
          </router-link>
        </div>
      </section>

      <!-- Change Password Modal -->
      <div v-if="showChangePasswordModal" class="adm-modal-overlay" @click="closePasswordModal">
        <div class="adm-modal" @click.stop>
          <div class="adm-modal__header">
            <h2 class="adm-modal__title">Change Password</h2>
            <button class="adm-modal__close" @click="closePasswordModal" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="changePassword" class="adm-modal__body">
            <div class="form-group">
              <label class="form-label">Current Password *</label>
              <input class="form-input" v-model="passwordForm.currentPassword" type="password" required placeholder="Enter current password" />
            </div>
            <div class="form-group">
              <label class="form-label">New Password *</label>
              <input class="form-input" v-model="passwordForm.newPassword" type="password" required placeholder="Minimum 6 characters" minlength="6" />
            </div>
            <div class="form-group">
              <label class="form-label">Confirm New Password *</label>
              <input class="form-input" v-model="passwordForm.confirmPassword" type="password" required placeholder="Repeat new password" minlength="6" />
            </div>
            <div class="adm-modal__footer">
              <button type="button" class="adm-btn adm-btn--ghost" @click="closePasswordModal">Cancel</button>
              <button type="submit" class="adm-btn adm-btn--primary" :disabled="changingPassword">
                {{ changingPassword ? 'Changing…' : 'Change Password' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/Sidebar.vue'
import api from '@/services/api'

export default {
  name: 'AdminDashboardPage',
  components: { AdminSidebar },
  data() {
    return {
      stats: { contacts: 0, blogs: 0, packages: 0, addons: 0 },
      showChangePasswordModal: false,
      changingPassword: false,
      passwordForm: { currentPassword: '', newPassword: '', confirmPassword: '' }
    }
  },
  computed: {
    adminName() {
      const user = localStorage.getItem('adminUser')
      return user ? JSON.parse(user).username : 'Admin'
    }
  },
  mounted() { this.loadStats() },
  methods: {
    async loadStats() {
      try {
        const [contactsRes, blogsRes, packagesRes, addonsRes] = await Promise.all([
          api.getAllContactsAdmin(),
          api.getAllBlogsAdmin(),
          api.getAllPackagesAdmin(),
          api.getAllAddOnsAdmin()
        ])
        this.stats.contacts = contactsRes.data.data.length
        this.stats.blogs    = blogsRes.data.data.filter(b => b.published).length
        this.stats.packages = packagesRes.data.data.filter(p => p.published).length
        this.stats.addons   = addonsRes.data.data.filter(a => a.published).length
      } catch (error) {
        console.error('Error loading stats:', error)
      }
    },
    async changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$toast.error('New passwords do not match'); return
      }
      if (this.passwordForm.newPassword.length < 6) {
        this.$toast.error('Password must be at least 6 characters'); return
      }
      this.changingPassword = true
      try {
        const response = await api.changePassword({
          currentPassword: this.passwordForm.currentPassword,
          newPassword: this.passwordForm.newPassword
        })
        if (response.data.success) {
          this.$toast.success('Password changed successfully!')
          this.closePasswordModal()
        }
      } catch (error) {
        console.error('Error changing password:', error)
        this.$toast.error(error.response?.data?.message || 'Failed to change password')
      } finally {
        this.changingPassword = false
      }
    },
    closePasswordModal() {
      this.showChangePasswordModal = false
      this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' }
    },
    logout() {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style scoped>
/* ── Layout shell ────────────────────────────────────────── */
.adm-layout { display: flex; min-height: 100vh; background: var(--linen); }
.adm-main   { flex: 1; padding: var(--sp-8) var(--sp-10); overflow-y: auto; }

/* ── Top bar ─────────────────────────────────────────────── */
.adm-topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--sp-6);
  margin-bottom: var(--sp-10);
  padding-bottom: var(--sp-8);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.adm-topbar__title {
  font-family: var(--font-display);
  font-size: var(--display-xs);
  color: var(--onyx);
  margin: 0 0 var(--sp-1);
  font-weight: 600;
}
.adm-topbar__sub {
  font-family: var(--font-serif);
  font-size: var(--text-base);
  font-style: italic;
  color: var(--stone);
  margin: 0;
}
.adm-topbar__actions { display: flex; gap: var(--sp-3); flex-wrap: wrap; }

/* ── Buttons ─────────────────────────────────────────────── */
.adm-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  padding: 0.6rem 1.25rem;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}
.adm-btn--primary      { background: var(--amber); color: var(--onyx); border-color: var(--amber); }
.adm-btn--primary:hover:not(:disabled) { background: var(--amber-deep); border-color: var(--amber-deep); }
.adm-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.adm-btn--ghost        { background: transparent; color: var(--iron); border-color: var(--border); }
.adm-btn--ghost:hover  { border-color: var(--amber); color: var(--amber); }
.adm-btn--danger-ghost { background: transparent; color: #b91c1c; border-color: rgba(185,28,28,0.25); }
.adm-btn--danger-ghost:hover { background: rgba(185,28,28,0.06); border-color: #b91c1c; }
.adm-btn--sm { padding: 0.45rem 0.9rem; font-size: 0.7rem; }
.adm-btn--danger { background: #dc2626; color: white; border-color: #dc2626; }
.adm-btn--danger:hover { background: #b91c1c; }

/* ── Stats ───────────────────────────────────────────────── */
.adm-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-5);
  margin-bottom: var(--sp-12);
}
.adm-stat {
  background: white;
  border: 1px solid var(--border);
  border-top: 2px solid var(--amber);
  padding: var(--sp-6) var(--sp-6) var(--sp-5);
  display: flex;
  flex-direction: column;
}
.adm-stat__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: var(--sp-3);
}
.adm-stat__value {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 600;
  color: var(--amber);
  line-height: 1;
  margin-bottom: var(--sp-4);
}
.adm-stat__link {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wide);
  color: var(--stone);
  text-decoration: none;
  margin-top: auto;
  transition: color 0.2s ease;
}
.adm-stat__link:hover { color: var(--amber); }

/* ── Section ─────────────────────────────────────────────── */
.adm-section { margin-bottom: var(--sp-12); }
.adm-section__title {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  color: var(--stone);
  margin-bottom: var(--sp-5);
}

/* ── Quick action cards ──────────────────────────────────── */
.adm-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--sp-5);
}
.adm-card {
  background: white;
  border: 1px solid var(--border);
  padding: var(--sp-6);
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}
.adm-card:hover {
  border-color: var(--amber);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}
.adm-card__icon {
  width: 40px; height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(196,148,74,0.08);
  color: var(--amber);
  margin-bottom: var(--sp-4);
}
.adm-card__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  color: var(--onyx);
  margin: 0 0 var(--sp-2);
  font-weight: 600;
}
.adm-card__desc {
  font-family: var(--font-serif);
  font-size: var(--text-sm);
  color: var(--stone);
  margin: 0;
  line-height: var(--lh-relaxed);
}

/* ── Modal ───────────────────────────────────────────────── */
.adm-modal-overlay {
  position: fixed; inset: 0;
  background: rgba(15,14,12,0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: var(--sp-8);
  backdrop-filter: blur(3px);
}
.adm-modal {
  background: var(--linen);
  border: 1px solid var(--border);
  width: 100%; max-width: 500px;
  max-height: 90vh; overflow-y: auto;
}
.adm-modal__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--sp-6) var(--sp-8);
  border-bottom: 1px solid var(--border);
  position: sticky; top: 0; background: var(--linen); z-index: 2;
}
.adm-modal__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--onyx); margin: 0; font-weight: 600;
}
.adm-modal__close {
  background: none; border: none; cursor: pointer;
  color: var(--stone); padding: var(--sp-1);
  transition: color 0.2s ease;
}
.adm-modal__close:hover { color: var(--onyx); }
.adm-modal__body  { padding: var(--sp-8); }
.adm-modal__footer {
  display: flex; gap: var(--sp-3); justify-content: flex-end;
  padding-top: var(--sp-6); margin-top: var(--sp-6);
  border-top: 1px solid var(--border);
}

/* ── Responsive ──────────────────────────────────────────── */
@media (max-width: 1200px) {
  .adm-stats { grid-template-columns: repeat(2, 1fr); }
  .adm-cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .adm-main { padding: var(--sp-6); }
  .adm-stats { grid-template-columns: 1fr 1fr; }
  .adm-cards { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .adm-stats { grid-template-columns: 1fr; }
}
</style>