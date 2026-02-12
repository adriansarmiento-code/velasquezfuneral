<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Manage Add-Ons / Additional Services</h1>
        <button @click="showCreateModal = true" class="btn btn-primary">+ Add New Service</button>
      </div>

      <div v-if="loading" class="loading">Loading add-ons...</div>

      <div v-else class="addons-table-container">
        <table class="addons-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Title</th>
              <th>Description</th>
              <th>Icon</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="addon in addons" :key="addon._id">
              <td>
                <div class="addon-preview">
                  <img v-if="addon.image" :src="addon.image" :alt="addon.title" />
                  <div v-else class="addon-preview-icon">{{ addon.icon || '📦' }}</div>
                </div>
              </td>
              <td><strong>{{ addon.title }}</strong></td>
              <td class="description-cell">{{ truncate(addon.description, 60) }}</td>
              <td class="icon-cell">{{ addon.icon }}</td>
              <td>
                <span :class="['status-badge', addon.published ? 'status-published' : 'status-draft']">
                  {{ addon.published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td>{{ formatDate(addon.createdAt) }}</td>
              <td class="actions">
                <button @click="editAddOn(addon)" class="btn btn-sm btn-secondary">Edit</button>
                <button @click="deleteAddOnConfirm(addon._id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="addons.length === 0" class="no-data">No add-ons found. Create your first one!</p>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ showEditModal ? 'Edit Add-On' : 'Create New Add-On' }}</h2>
            <button @click="closeModals" class="modal-close">&times;</button>
          </div>
          
          <form @submit.prevent="saveAddOn" class="modal-form">
            <div class="form-group">
              <label>Service Title *</label>
              <input v-model="addonForm.title" type="text" required placeholder="e.g., Memorial Video Presentation" />
            </div>

            <div class="form-group">
              <label>Description *</label>
              <textarea v-model="addonForm.description" rows="4" required placeholder="Describe this additional service..."></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Icon (Optional)</label>
                <input v-model="addonForm.icon" type="text" placeholder="e.g., 🎥, 🎵, 💐" />
                <small>Use an emoji or leave blank</small>
              </div>

              <div class="form-group">
                <label>External Link (Optional)</label>
                <input v-model="addonForm.link" type="url" placeholder="https://example.com" />
                <small>Optional link for "Learn More"</small>
              </div>
            </div>

            <div class="form-group">
              <label>Display Order</label>
              <input v-model.number="addonForm.displayOrder" type="number" placeholder="0" />
              <small>Lower numbers appear first</small>
            </div>

            <div class="form-group">
              <label>Service Image</label>
              <div class="image-upload-area">
                <div v-if="!addonForm.image" class="upload-placeholder">
                  <input 
                    type="file" 
                    @change="handleImageUpload" 
                    accept="image/*"
                    ref="imageInput"
                    id="addonImage"
                    style="display: none;"
                  />
                  <label for="addonImage" class="upload-btn">Upload Image</label>
                  <p>Recommended size: 800x600px</p>
                </div>
                <div v-else class="image-preview-box">
                  <img :src="addonForm.image" alt="Preview" />
                  <button type="button" @click="removeImage" class="btn btn-sm btn-danger">Remove Image</button>
                </div>
              </div>
              <div v-if="uploading" class="upload-progress">
                <div class="progress-bar">
                  <div class="progress-fill"></div>
                </div>
                <p>Uploading image...</p>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="addonForm.published" type="checkbox" />
                <span>Publish immediately</span>
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : (showEditModal ? 'Update Add-On' : 'Create Add-On') }}
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
      uploading: false,
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
        displayOrder: 0,
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
        this.$toast.error('Failed to load add-ons')
      } finally {
        this.loading = false
      }
    },

    async handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      this.uploading = true
      try {
        const formData = new FormData()
        formData.append('image', file)

        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        
        const response = await fetch(`${API_URL}/upload/image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })

        const data = await response.json()
        if (data.success) {
          this.addonForm.image = data.url
        } else {
          this.$toast.error('Upload failed: ' + data.message)
        }
      } catch (error) {
        console.error('Upload error:', error)
        this.$toast.error('Failed to upload image')
      } finally {
        this.uploading = false
      }
    },

    removeImage() {
      this.addonForm.image = ''
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = ''
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
          this.$toast.success('Add-on updated successfully!')
        } else {
          await api.createAddOn(this.addonForm)
          this.$toast.success('Add-on created successfully!')
        }
        
        this.closeModals()
        this.loadAddOns()
      } catch (error) {
        console.error('Error saving add-on:', error)
        this.$toast.error('Failed to save add-on')
      } finally {
        this.saving = false
      }
    },

// Delete Add-on
async deleteAddOnConfirm(id) {
  const confirmed = await this.$confirm({
    title: 'Delete Add-on',
    message: 'Are you sure you want to delete this add-on? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (confirmed) {
    try {
      await api.deleteAddOn(id)
      this.$toast.success('Add-on deleted successfully')
      this.loadAddOns()
    } catch (error) {
      console.error('Error deleting add-on:', error)
      this.$toast.error('Failed to delete add-on')
    }
  }
},

    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.addonForm = this.getEmptyForm()
      this.editingId = null
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },

    truncate(text, length) {
      if (!text) return ''
      return text.length > length ? text.substring(0, length) + '...' : text
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

.admin-header h1 {
  margin: 0;
}

/* Table Styles */
.addons-table-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
}

.addons-table {
  width: 100%;
  border-collapse: collapse;
}

.addons-table th,
.addons-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.addons-table th {
  background: #f8f8f8;
  font-weight: 600;
  color: #333;
}

.addon-preview {
  width: 80px;
  height: 60px;
  overflow: hidden;
  border-radius: 4px;
  border: 2px solid #e0e0e0;
}

.addon-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.addon-preview-icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  font-size: 2rem;
}

.description-cell {
  max-width: 300px;
  color: #666;
  font-size: 0.95rem;
}

.icon-cell {
  font-size: 1.5rem;
  text-align: center;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-published {
  background: #d4edda;
  color: #155724;
}

.status-draft {
  background: #fff3cd;
  color: #856404;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition);
}

.btn-primary {
  background: var(--primary-gold);
  color: white;
}

.btn-primary:hover {
  background: var(--dark-gold);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
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
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.modal-close:hover {
  color: #333;
}

.modal-form {
  padding: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.form-group small {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.85rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input {
  width: auto;
  cursor: pointer;
}

.checkbox-label span {
  font-weight: 600;
}

/* Image Upload Styles */
.image-upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  background: #fafafa;
}

.upload-placeholder p {
  margin: 0.5rem 0 0 0;
  color: #999;
  font-size: 0.9rem;
}

.upload-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-gold);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition);
}

.upload-btn:hover {
  background: var(--dark-gold);
}

.image-preview-box img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.upload-progress {
  margin-top: 1rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-gold);
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.loading,
.no-data {
  text-align: center;
  padding: 3rem;
  color: #999;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 1rem;
  }

  .modal-form {
    padding: 1rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>