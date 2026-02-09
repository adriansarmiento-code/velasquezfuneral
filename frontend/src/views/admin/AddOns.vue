<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Manage Add-Ons</h1>
        <button @click="showCreateModal = true" class="btn btn-primary">+ Create New Add-On</button>
      </div>

      <div v-if="loading" class="loading">Loading add-ons...</div>

      <div v-else class="addons-grid">
        <div v-for="addon in addons" :key="addon._id" class="addon-card-admin">
          <div class="addon-icon">{{ addon.icon || '📦' }}</div>
          <h3>{{ addon.title }}</h3>
          <p>{{ addon.description }}</p>

          <div class="card-actions">
            <button @click="editAddOn(addon)" class="btn btn-sm btn-secondary">Edit</button>
            <button @click="deleteAddOnConfirm(addon._id)" class="btn btn-sm btn-danger">Delete</button>
          </div>

          <span :class="['status-badge', addon.published ? 'status-published' : 'status-draft']">
            {{ addon.published ? 'Published' : 'Draft' }}
          </span>
        </div>

        <p v-if="addons.length === 0" class="no-data">No add-ons found. Create your first one!</p>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content" @click.stop>
          <h2>{{ showEditModal ? 'Edit Add-On' : 'Create New Add-On' }}</h2>
          
          <form @submit.prevent="saveAddOn">
            <div class="form-group">
              <label>Title *</label>
              <input v-model="addonForm.title" type="text" required />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea v-model="addonForm.description" rows="4"></textarea>
            </div>

            <div class="form-group">
              <label>Icon (emoji)</label>
              <input v-model="addonForm.icon" type="text" placeholder="📦" />
            </div>

            <div class="form-group">
              <label>Image URL</label>
              <input v-model="addonForm.image" type="text" placeholder="https://..." />
            </div>

            <div class="form-group">
              <label>Link</label>
              <input v-model="addonForm.link" type="text" placeholder="/packages" />
            </div>

            <div class="form-group">
              <label>Display Order</label>
              <input v-model.number="addonForm.order" type="number" min="0" />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="addonForm.published" type="checkbox" />
                Publish immediately
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Add-On' }}
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
  name: 'AdminAddOnsPage',
  components: {
    AdminSidebar
  },
  data() {
    return {
      addons: [],
      loading: false,
      saving: false,
      showCreateModal: false,
      showEditModal: false,
      addonForm: this.getEmptyForm(),
      editingId: null
    }
  },
  mounted() {
    this.loadAddOns()
  },
  methods: {
    getEmptyForm() {
      return {
        title: '',
        description: '',
        icon: '',
        image: '',
        link: '',
        order: 0,
        published: true
      }
    },
    
    async loadAddOns() {
      this.loading = true
      try {
        const response = await api.getAllAddOnsAdmin()
        this.addons = response.data.data
      } catch (error) {
        console.error('Error loading add-ons:', error)
        alert('Failed to load add-ons')
      } finally {
        this.loading = false
      }
    },

    editAddOn(addon) {
      this.addonForm = { ...addon }
      this.editingId = addon._id
      this.showEditModal = true
    },

    async saveAddOn() {
      this.saving = true
      try {
        if (this.showEditModal) {
          await api.updateAddOn(this.editingId, this.addonForm)
        } else {
          await api.createAddOn(this.addonForm)
        }
        
        alert('Add-on saved successfully!')
        this.closeModals()
        this.loadAddOns()
      } catch (error) {
        console.error('Error saving add-on:', error)
        alert('Failed to save add-on')
      } finally {
        this.saving = false
      }
    },

    async deleteAddOnConfirm(id) {
      if (confirm('Are you sure you want to delete this add-on?')) {
        try {
          await api.deleteAddOn(id)
          alert('Add-on deleted successfully')
          this.loadAddOns()
        } catch (error) {
          console.error('Error deleting add-on:', error)
          alert('Failed to delete add-on')
        }
      }
    },

    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.addonForm = this.getEmptyForm()
      this.editingId = null
    }
  }
}
</script>

<style scoped>
/* Same styles as Packages page */
.admin-layout { display: flex; min-height: 100vh; }
.admin-content { flex: 1; padding: 2rem; background: #f5f5f5; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.addons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.addon-card-admin { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative; text-align: center; }
.addon-icon { font-size: 3rem; margin-bottom: 1rem; }
.addon-card-admin h3 { color: #d4af37; margin: 0.5rem 0; }
.card-actions { display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: center; }
.status-badge { position: absolute; top: 1rem; right: 1rem; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
.status-published { background: #d4edda; color: #155724; }
.status-draft { background: #fff3cd; color: #856404; }
.btn-sm { padding: 0.5rem 1rem; font-size: 0.9rem; }
.btn-danger { background: #dc3545; color: white; }
.btn-danger:hover { background: #c82333; }
.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background: white; padding: 2rem; border-radius: 8px; max-width: 600px; width: 90%; max-height: 90vh; overflow-y: auto; }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; }
.form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 4px; }
.checkbox-label { display: flex; align-items: center; gap: 0.5rem; font-weight: normal; }
.checkbox-label input { width: auto; }
.modal-actions { display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem; }
.no-data, .loading { text-align: center; color: #999; padding: 2rem; }
</style>