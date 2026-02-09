<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Manage Packages</h1>
        <button @click="showCreateModal = true" class="btn btn-primary">+ Create New Package</button>
      </div>

      <div v-if="loading" class="loading">Loading packages...</div>

      <div v-else class="packages-grid">
        <div v-for="pkg in packages" :key="pkg._id" class="package-card-admin">
          <h3>{{ pkg.name }}</h3>
          <p class="tagline">{{ pkg.tagline }}</p>
          <p class="description">{{ pkg.description }}</p>
          
          <ul class="features-list">
            <li v-for="(feature, index) in pkg.features" :key="index">{{ feature }}</li>
          </ul>

          <div class="card-actions">
            <button @click="editPackage(pkg)" class="btn btn-sm btn-secondary">Edit</button>
            <button @click="deletePackageConfirm(pkg._id)" class="btn btn-sm btn-danger">Delete</button>
          </div>

          <span :class="['status-badge', pkg.published ? 'status-published' : 'status-draft']">
            {{ pkg.published ? 'Published' : 'Draft' }}
          </span>
        </div>

        <p v-if="packages.length === 0" class="no-data">No packages found. Create your first one!</p>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content" @click.stop>
          <h2>{{ showEditModal ? 'Edit Package' : 'Create New Package' }}</h2>
          
          <form @submit.prevent="savePackage">
            <div class="form-group">
              <label>Package Name *</label>
              <input v-model="packageForm.name" type="text" required placeholder="e.g., Basic Package" />
            </div>

            <div class="form-group">
              <label>Tagline</label>
              <input v-model="packageForm.tagline" type="text" placeholder="Short description" />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea v-model="packageForm.description" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label>Features (one per line)</label>
              <textarea v-model="featuresText" rows="6" placeholder="Feature 1&#10;Feature 2&#10;Feature 3"></textarea>
            </div>

            <div class="form-group">
              <label>Display Order</label>
              <input v-model.number="packageForm.order" type="number" min="0" />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="packageForm.published" type="checkbox" />
                Publish immediately
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Package' }}
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
  name: 'AdminPackagesPage',
  components: {
    AdminSidebar
  },
  data() {
    return {
      packages: [],
      loading: false,
      saving: false,
      showCreateModal: false,
      showEditModal: false,
      packageForm: this.getEmptyForm(),
      featuresText: '',
      editingId: null
    }
  },
  mounted() {
    this.loadPackages()
  },
  methods: {
    getEmptyForm() {
      return {
        name: '',
        tagline: '',
        description: '',
        features: [],
        order: 0,
        published: true
      }
    },
    
    async loadPackages() {
      this.loading = true
      try {
        const response = await api.getAllPackagesAdmin()
        this.packages = response.data.data
      } catch (error) {
        console.error('Error loading packages:', error)
        alert('Failed to load packages')
      } finally {
        this.loading = false
      }
    },

    editPackage(pkg) {
      this.packageForm = { ...pkg }
      this.featuresText = pkg.features.join('\n')
      this.editingId = pkg._id
      this.showEditModal = true
    },

    async savePackage() {
      this.saving = true
      
      // Convert features text to array
      this.packageForm.features = this.featuresText
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0)

      try {
        if (this.showEditModal) {
          await api.updatePackage(this.editingId, this.packageForm)
        } else {
          await api.createPackage(this.packageForm)
        }
        
        alert('Package saved successfully!')
        this.closeModals()
        this.loadPackages()
      } catch (error) {
        console.error('Error saving package:', error)
        alert('Failed to save package')
      } finally {
        this.saving = false
      }
    },

    async deletePackageConfirm(id) {
      if (confirm('Are you sure you want to delete this package?')) {
        try {
          await api.deletePackage(id)
          alert('Package deleted successfully')
          this.loadPackages()
        } catch (error) {
          console.error('Error deleting package:', error)
          alert('Failed to delete package')
        }
      }
    },

    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.packageForm = this.getEmptyForm()
      this.featuresText = ''
      this.editingId = null
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

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.package-card-admin {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
}

.package-card-admin h3 {
  color: #d4af37;
  margin: 0 0 0.5rem 0;
}

.tagline {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.description {
  color: #444;
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.features-list li {
  padding: 0.25rem 0;
  font-size: 0.9rem;
  color: #666;
}

.features-list li:before {
  content: "✓ ";
  color: #d4af37;
  font-weight: bold;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
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

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

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
  padding: 2rem;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.checkbox-label input {
  width: auto;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.no-data, .loading {
  text-align: center;
  color: #999;
  padding: 2rem;
}
</style>