<template>
  <div class="adm-layout">
    <AdminSidebar />

    <div class="adm-main">
      <header class="adm-topbar">
        <div>
          <h1 class="adm-topbar__title">Contact Submissions</h1>
          <p class="adm-topbar__sub">{{ contacts.length }} total inquiries received</p>
        </div>
      </header>

      <div v-if="loading" class="page-loader">
        <div class="page-loader__ring"></div>
        <p class="page-loader__text">Loading contacts…</p>
      </div>

      <div v-else-if="contacts.length === 0" class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <h3>No contact submissions yet</h3>
        <p>Messages submitted through the contact form will appear here.</p>
      </div>

      <div v-else class="adm-table-wrap">
        <table class="adm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact._id">
              <td class="adm-table__name">{{ contact.name }}</td>
              <td><a :href="`mailto:${contact.email}`" class="adm-table__link">{{ contact.email }}</a></td>
              <td><a :href="`tel:${contact.phone}`" class="adm-table__link">{{ contact.phone }}</a></td>
              <td class="adm-table__msg">{{ contact.message }}</td>
              <td class="adm-table__date">{{ formatDate(contact.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/Sidebar.vue'
import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'

export default {
  name: 'AdminContactsPage',
  components: { AdminSidebar },
  data() {
    return { contacts: [], loading: false }
  },
  mounted() { this.loadContacts() },
  methods: {
    async loadContacts() {
      this.loading = true
      try {
        const token = localStorage.getItem('adminToken')
        const response = await axios.get(`${API_URL}/contact`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.contacts = response.data.data
      } catch (error) {
        console.error('Error loading contacts:', error)
        this.$toast.error('Failed to load contacts')
      } finally {
        this.loading = false
      }
    },
    formatDate(date) { return new Date(date).toLocaleString() }
  }
}
</script>

<style scoped>
.adm-layout { display: flex; min-height: 100vh; background: var(--linen); }
.adm-main   { flex: 1; padding: var(--sp-8) var(--sp-10); overflow-y: auto; }

.adm-topbar {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: var(--sp-6); margin-bottom: var(--sp-8);
  padding-bottom: var(--sp-8); border-bottom: 1px solid var(--border); flex-wrap: wrap;
}
.adm-topbar__title {
  font-family: var(--font-display); font-size: var(--display-xs);
  color: var(--onyx); margin: 0 0 var(--sp-1); font-weight: 600;
}
.adm-topbar__sub {
  font-family: var(--font-serif); font-size: var(--text-base);
  font-style: italic; color: var(--stone); margin: 0;
}

.adm-table-wrap {
  background: white; border: 1px solid var(--border); overflow-x: auto;
}
.adm-table {
  width: 100%; border-collapse: collapse;
  font-family: var(--font-sans); font-size: var(--text-sm);
}
.adm-table th {
  padding: var(--sp-4) var(--sp-5);
  background: var(--linen); text-align: left;
  font-size: var(--text-xs); letter-spacing: var(--ls-wider);
  text-transform: uppercase; color: var(--stone); font-weight: 600;
  border-bottom: 1px solid var(--border);
}
.adm-table td {
  padding: var(--sp-4) var(--sp-5);
  border-bottom: 1px solid var(--linen-warm);
  color: var(--iron); vertical-align: top;
}
.adm-table tbody tr:last-child td { border-bottom: none; }
.adm-table tbody tr:hover td { background: var(--linen); }
.adm-table__name { font-weight: 600; color: var(--onyx); white-space: nowrap; }
.adm-table__link { color: var(--amber); text-decoration: none; white-space: nowrap; }
.adm-table__link:hover { text-decoration: underline; }
.adm-table__msg { max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--stone); }
.adm-table__date { white-space: nowrap; color: var(--stone); font-size: var(--text-xs); }

@media (max-width: 768px) { .adm-main { padding: var(--sp-6); } }
</style>