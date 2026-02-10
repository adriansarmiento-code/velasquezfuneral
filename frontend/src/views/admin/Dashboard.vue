<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Dashboard</h1>
        <button @click="logout" class="btn btn-secondary">Logout</button>
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

    logout() {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      this.$router.push('/admin/login');
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
</style>