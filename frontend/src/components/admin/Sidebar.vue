<template>
  <div class="admin-sidebar">
    <div class="sidebar-header">
      <h2>Admin Panel</h2>
      <p>{{ adminUser.username }}</p>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/admin/dashboard" class="sidebar-link">
        📊 Dashboard
      </router-link>
      <router-link to="/admin/blogs" class="sidebar-link">
        📝 Blogs
      </router-link>
      <router-link to="/admin/packages" class="sidebar-link">
        📦 Packages
      </router-link>
      <router-link to="/admin/addons" class="sidebar-link">
        ➕ Add-Ons
      </router-link>
      <router-link to="/admin/contacts" class="sidebar-link">
        📧 Contacts
      </router-link>
      <a href="/" class="sidebar-link" target="_blank">
        🌐 View Website
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminSidebarComponent',
  computed: {
    adminUser() {
      const user = localStorage.getItem('adminUser');
      return user ? JSON.parse(user) : { username: 'Admin' };
    }
  }
}
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background: #1a1a1a;
  color: white;
  padding: 2rem 0;
}

.sidebar-header {
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid #333;
}

.sidebar-header h2 {
  color: #d4af37;
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.sidebar-header p {
  margin: 0;
  color: #999;
  font-size: 0.9rem;
}

.sidebar-nav {
  padding: 1.5rem 0;
}

.sidebar-link {
  display: block;
  padding: 1rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background 0.2s;
}

.sidebar-link:hover {
  background: #2d2d2d;
}

.sidebar-link.router-link-active {
  background: #d4af37;
  color: #1a1a1a;
  font-weight: 600;
}
</style>