<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Contact Form Submissions</h1>
      </div>

      <div v-if="loading" class="loading">Loading contacts...</div>

      <div v-else class="contacts-table">
        <table>
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
              <td>{{ contact.name }}</td>
              <td><a :href="`mailto:${contact.email}`">{{ contact.email }}</a></td>
              <td><a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></td>
              <td class="message-cell">{{ contact.message }}</td>
              <td>{{ formatDate(contact.createdAt) }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="contacts.length === 0" class="no-data">No contact submissions yet.</p>
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
  components: {
    AdminSidebar
  },
  data() {
    return {
      contacts: [],
      loading: false
    }
  },
  mounted() {
    this.loadContacts()
  },
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
        alert('Failed to load contacts')
      } finally {
        this.loading = false
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; }
.admin-content { flex: 1; padding: 2rem; background: #f5f5f5; }
.admin-header { margin-bottom: 2rem; }
.contacts-table { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
th { background: #f8f8f8; font-weight: 600; }
.message-cell { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
a { color: #d4af37; text-decoration: none; }
a:hover { text-decoration: underline; }
.no-data, .loading { text-align: center; color: #999; padding: 2rem; }
</style>