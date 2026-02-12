<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Dashboard</h1>
        <div class="header-actions">
          <button @click="showChangePasswordModal = true" class="btn btn-secondary">
            Change Password
          </button>
          <button @click="logout" class="btn btn-secondary">Logout</button>
        </div>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <h3>Total Contacts</h3>
          <p class="stat-number">{{ stats.contacts }}</p>
        </div>
        <div class="stat-card">
          <h3>Published Blogs</h3>
          <p class="stat-number">{{ stats.blogs }}</p>
        </div>
        <div class="stat-card">
          <h3>Packages</h3>
          <p class="stat-number">{{ stats.packages }}</p>
        </div>
        <div class="stat-card">
          <h3>Add-Ons</h3>
          <p class="stat-number">{{ stats.addons }}</p>
        </div>
      </div>

      <div class="quick-links">
        <h2>Quick Actions</h2>
        <div class="quick-links-grid">
          <router-link to="/admin/blogs" class="quick-link-card">
            <h3>📝 Manage Blogs</h3>
            <p>Create, edit, and publish blog posts</p>
          </router-link>
          <router-link to="/admin/packages" class="quick-link-card">
            <h3>📦 Manage Packages</h3>
            <p>Update funeral service packages</p>
          </router-link>
          <router-link to="/admin/addons" class="quick-link-card">
            <h3>➕ Manage Add-Ons</h3>
            <p>Edit additional services</p>
          </router-link>
          <router-link to="/admin/contacts" class="quick-link-card">
            <h3>📧 View Contacts</h3>
            <p>See contact form submissions</p>
          </router-link>
        </div>
      </div>

      <!-- Change Password Modal -->
      <div v-if="showChangePasswordModal" class="modal-overlay" @click="closePasswordModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>Change Password</h2>
            <button @click="closePasswordModal" class="modal-close">&times;</button>
          </div>
          
          <form @submit.prevent="changePassword" class="modal-form">
            <div class="form-group">
              <label>Current Password *</label>
              <input 
                v-model="passwordForm.currentPassword" 
                type="password" 
                required 
                placeholder="Enter current password"
              />
            </div>

            <div class="form-group">
              <label>New Password *</label>
              <input 
                v-model="passwordForm.newPassword" 
                type="password" 
                required 
                placeholder="Enter new password"
                minlength="6"
              />
              <small>Minimum 6 characters</small>
            </div>

            <div class="form-group">
              <label>Confirm New Password *</label>
              <input 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                required 
                placeholder="Confirm new password"
                minlength="6"
              />
            </div>

            <div class="modal-actions">
              <button type="button" @click="closePasswordModal" class="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" :disabled="changingPassword">
                {{ changingPassword ? 'Changing...' : 'Change Password' }}
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
  components: {
    AdminSidebar
  },
  data() {
    return {
      stats: {
        contacts: 0,
        blogs: 0,
        packages: 0,
        addons: 0
      },
      showChangePasswordModal: false,
      changingPassword: false,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  mounted() {
    this.loadStats()
  },
  methods: {
    async loadStats() {
      try {
        // Load contacts count
        const contactsRes = await api.getAllContactsAdmin()
        this.stats.contacts = contactsRes.data.data.length

        // Load blogs count
        const blogsRes = await api.getAllBlogsAdmin()
        this.stats.blogs = blogsRes.data.data.filter(b => b.published).length

        // Load packages count
        const packagesRes = await api.getAllPackagesAdmin()
        this.stats.packages = packagesRes.data.data.filter(p => p.published).length

        // Load add-ons count
        const addonsRes = await api.getAllAddOnsAdmin()
        this.stats.addons = addonsRes.data.data.filter(a => a.published).length

      } catch (error) {
        console.error('Error loading stats:', error)
      }
    },

    async changePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$toast.error('New passwords do not match')
        return
      }

      if (this.passwordForm.newPassword.length < 6) {
        this.$toast.error('Password must be at least 6 characters')
        return
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
        const message = error.response?.data?.message || 'Failed to change password'
        this.$toast.error(message)
      } finally {
        this.changingPassword = false
      }
    },

    closePasswordModal() {
      this.showChangePasswordModal = false
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
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
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #d4af37;
  margin: 0;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.quick-link-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-link-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.quick-link-card h3 {
  color: #d4af37;
  margin-bottom: 0.5rem;
}

.quick-link-card p {
  color: #666;
  margin: 0;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #333;
}

.modal-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #d4af37;
}

.form-group small {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.875rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #d4af37;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #c09a2e;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}
</style>