<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Manage Packages & Caskets</h1>
        <button @click="showCreatePackageModal = true" class="btn btn-primary">+ Create Package</button>
      </div>

      <div v-if="loading" class="loading">Loading packages...</div>

      <!-- Packages List -->
      <div v-else class="packages-container">
        <div v-for="pkg in packages" :key="pkg._id" class="package-section">
          <div class="package-header-card">
            <div class="package-info">
              <div class="package-image-thumb" v-if="pkg.image">
                <img :src="pkg.image" :alt="pkg.name" />
              </div>
              <div class="package-details">
                <h2>{{ pkg.name }}</h2>
                <span class="package-category">{{ pkg.category }}</span>
                <p class="package-tagline">{{ pkg.tagline }}</p>
              </div>
            </div>
            <div class="package-actions">
              <button @click="editPackage(pkg)" class="btn btn-sm btn-secondary">Edit Package</button>
              <button @click="deletePackageConfirm(pkg._id)" class="btn btn-sm btn-danger">Delete</button>
              <button @click="toggleCaskets(pkg._id)" class="btn btn-sm btn-outline">
                {{ expandedPackage === pkg._id ? 'Hide Caskets' : 'Show Caskets' }}
              </button>
            </div>
          </div>

          <!-- Caskets List (Expandable) -->
          <div v-if="expandedPackage === pkg._id" class="caskets-section">
            <div class="caskets-header">
              <h3>Caskets for {{ pkg.name }}</h3>
              <button @click="openCreateCasket(pkg)" class="btn btn-sm btn-primary">+ Add Casket</button>
            </div>

            <div v-if="loadingCaskets" class="loading">Loading caskets...</div>

            <div v-else-if="currentCaskets.length > 0" class="caskets-grid">
              <div v-for="casket in currentCaskets" :key="casket._id" class="casket-card">
                <div class="casket-image" v-if="casket.image">
                  <img :src="casket.image" :alt="casket.name" />
                </div>
                <div class="casket-image placeholder" v-else>No Image</div>
                
                <div class="casket-details">
                  <h4>{{ casket.name }}</h4>
                  <span class="casket-material">{{ casket.material }}</span>
                  <div class="casket-pricing">
                    <span v-if="casket.discountedPrice" class="price-regular">₱{{ casket.regularPrice.toLocaleString() }}</span>
                    <span class="price-current">₱{{ (casket.discountedPrice || casket.regularPrice).toLocaleString() }}</span>
                  </div>
                  <p class="casket-specs" v-if="casket.specifications">{{ casket.specifications }}</p>
                </div>
                
                <div class="casket-actions">
                  <button @click="editCasket(casket)" class="btn btn-sm btn-secondary">Edit</button>
                  <button @click="deleteCasketConfirm(casket._id)" class="btn btn-sm btn-danger">Delete</button>
                </div>
              </div>
            </div>

            <div v-else class="no-caskets">
              <p>No caskets added yet.</p>
              <button @click="openCreateCasket(pkg)" class="btn btn-primary">Add First Casket</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Create/Edit Package Modal -->
      <div v-if="showCreatePackageModal || showEditPackageModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ showEditPackageModal ? 'Edit Package' : 'Create New Package' }}</h2>
            <button @click="closeModals" class="modal-close">&times;</button>
          </div>
          
          <form @submit.prevent="savePackage" class="modal-form">
            <div class="form-group">
              <label>Package Name *</label>
              <input v-model="packageForm.name" type="text" required placeholder="e.g., Basic Package" />
            </div>

            <div class="form-group">
              <label>Category *</label>
              <select v-model="packageForm.category" required>
                <option value="">Select Category</option>
                <option value="Basic">Basic</option>
                <option value="Semi-Elegant">Semi-Elegant</option>
                <option value="Elegant">Elegant</option>
              </select>
            </div>

            <div class="form-group">
              <label>Tagline *</label>
              <input v-model="packageForm.tagline" type="text" required placeholder="e.g., Essential Services with Dignity" />
            </div>

            <div class="form-group">
              <label>Description *</label>
              <textarea v-model="packageForm.description" rows="4" required></textarea>
            </div>

            <div class="form-group">
              <label>Package Image</label>
              <div class="image-upload-area">
                <div v-if="!packageForm.image" class="upload-placeholder">
                  <input type="file" @change="handlePackageImageUpload" accept="image/*" ref="packageImageInput" id="packageImage" style="display: none;" />
                  <label for="packageImage" class="upload-btn">Upload Image</label>
                </div>
                <div v-else class="image-preview-box">
                  <img :src="packageForm.image" alt="Preview" />
                  <button type="button" @click="removePackageImage" class="btn btn-sm btn-danger">Remove</button>
                </div>
              </div>
              <div v-if="uploadingPackageImage" class="upload-progress">Uploading...</div>
            </div>

            <div class="form-group">
              <label>Features/Inclusions (one per line)</label>
              <textarea v-model="featuresText" rows="8" placeholder="Professional embalming services&#10;Transfer to funeral home&#10;Basic venue preparation"></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="packageForm.published" type="checkbox" />
                <span>Publish immediately</span>
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : (showEditPackageModal ? 'Update Package' : 'Create Package') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Create/Edit Casket Modal -->
      <div v-if="showCreateCasketModal || showEditCasketModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>{{ showEditCasketModal ? 'Edit Casket' : 'Add New Casket' }}</h2>
            <button @click="closeModals" class="modal-close">&times;</button>
          </div>
          
          <form @submit.prevent="saveCasket" class="modal-form">
            <div class="form-group">
              <label>Casket Name *</label>
              <input v-model="casketForm.name" type="text" required placeholder="e.g., OMS, Tapiada, Full Glass" />
            </div>

            <div class="form-group">
              <label>Material *</label>
              <select v-model="casketForm.material" required>
                <option value="">Select Material</option>
                <option value="Wood">Wood</option>
                <option value="Metal">Metal</option>
                <option value="Imported">Imported</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Regular Price (₱) *</label>
                <input v-model.number="casketForm.regularPrice" type="number" required placeholder="95000" />
              </div>

              <div class="form-group">
                <label>Discounted Price (₱)</label>
                <input v-model.number="casketForm.discountedPrice" type="number" placeholder="70000" />
              </div>
            </div>

            <div class="form-group">
              <label>Specifications</label>
              <input v-model="casketForm.specifications" type="text" placeholder="e.g., 27''/190cm, Standard Size" />
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea v-model="casketForm.description" rows="3" placeholder="Brief description of the casket"></textarea>
            </div>

            <div class="form-group">
              <label>Casket Image</label>
              <div class="image-upload-area">
                <div v-if="!casketForm.image" class="upload-placeholder">
                  <input type="file" @change="handleCasketImageUpload" accept="image/*" ref="casketImageInput" id="casketImage" style="display: none;" />
                  <label for="casketImage" class="upload-btn">Upload Image</label>
                </div>
                <div v-else class="image-preview-box">
                  <img :src="casketForm.image" alt="Preview" />
                  <button type="button" @click="removeCasketImage" class="btn btn-sm btn-danger">Remove</button>
                </div>
              </div>
              <div v-if="uploadingCasketImage" class="upload-progress">Uploading...</div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="casketForm.published" type="checkbox" />
                <span>Publish immediately</span>
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : (showEditCasketModal ? 'Update Casket' : 'Add Casket') }}
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
  name: 'AdminPackagesCasketsPage',
  components: {
    AdminSidebar
  },
  data() {
    return {
      packages: [],
      currentCaskets: [],
      loading: false,
      loadingCaskets: false,
      saving: false,
      uploadingPackageImage: false,
      uploadingCasketImage: false,
      expandedPackage: null,
      
      showCreatePackageModal: false,
      showEditPackageModal: false,
      showCreateCasketModal: false,
      showEditCasketModal: false,
      
      packageForm: this.getEmptyPackageForm(),
      casketForm: this.getEmptyCasketForm(),
      featuresText: '',
      
      editingPackageId: null,
      editingCasketId: null,
      currentPackage: null
    }
  },
  mounted() {
    this.loadPackages()
  },
  methods: {
    getEmptyPackageForm() {
      return {
        name: '',
        category: '',
        tagline: '',
        description: '',
        image: '',
        features: [],
        published: true
      }
    },
    
    getEmptyCasketForm() {
      return {
        packageId: '',
        name: '',
        material: '',
        regularPrice: 0,
        discountedPrice: null,
        description: '',
        specifications: '',
        image: '',
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
        this.$toast.error('Failed to load packages')
      } finally {
        this.loading = false
      }
    },
    
    async toggleCaskets(packageId) {
      if (this.expandedPackage === packageId) {
        this.expandedPackage = null
        this.currentCaskets = []
      } else {
        this.expandedPackage = packageId
        await this.loadCaskets(packageId)
      }
    },
    
    async loadCaskets(packageId) {
      this.loadingCaskets = true
      try {
        const response = await api.getCasketsByPackageAdmin(packageId)
        this.currentCaskets = response.data.data
      } catch (error) {
        console.error('Error loading caskets:', error)
        this.$toast.error('Failed to load caskets')
      } finally {
        this.loadingCaskets = false
      }
    },
    
    // Package Image Upload
    async handlePackageImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      this.uploadingPackageImage = true
      try {
        const formData = new FormData()
        formData.append('image', file)

        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        
        const response = await fetch(`${API_URL}/upload/image`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        })

        const data = await response.json()
        if (data.success) {
          this.packageForm.image = data.url
        } else {
          this.$toast.error('Upload failed: ' + data.message)
        }
      } catch (error) {
        console.error('Upload error:', error)
        this.$toast.error('Failed to upload image')
      } finally {
        this.uploadingPackageImage = false
      }
    },

    removePackageImage() {
      this.packageForm.image = ''
      if (this.$refs.packageImageInput) {
        this.$refs.packageImageInput.value = ''
      }
    },
    
    // Casket Image Upload
    async handleCasketImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      this.uploadingCasketImage = true
      try {
        const formData = new FormData()
        formData.append('image', file)

        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        
        const response = await fetch(`${API_URL}/upload/image`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        })

        const data = await response.json()
        if (data.success) {
          this.casketForm.image = data.url
        } else {
          this.$toast.error('Upload failed: ' + data.message)
        }
      } catch (error) {
        console.error('Upload error:', error)
        this.$toast.error('Failed to upload image')
      } finally {
        this.uploadingCasketImage = false
      }
    },

    removeCasketImage() {
      this.casketForm.image = ''
      if (this.$refs.casketImageInput) {
        this.$refs.casketImageInput.value = ''
      }
    },
    
    // Package CRUD
    editPackage(pkg) {
      this.packageForm = { ...pkg }
      this.featuresText = pkg.features.join('\n')
      this.editingPackageId = pkg._id
      this.showEditPackageModal = true
    },
    
async savePackage() {
  this.packageForm.features = this.featuresText.split('\n').filter(f => f.trim())
  
  this.saving = true
  try {
    let response
    
    if (this.showEditPackageModal) {
      response = await api.updatePackage(this.editingPackageId, this.packageForm)
      this.$toast.success('Package updated successfully!')
    } else {
      response = await api.createPackage(this.packageForm)
      this.$toast.success('Package created successfully!')
    }
    
    console.log('API Response:', response) // Debug log
    
    this.closeModals()
    await this.loadPackages() // Make sure this completes
    
  } catch (error) {
    console.error('Error saving package:', error)
    
    // Better error message extraction
    const errorMsg = error?.response?.data?.message 
                  || error?.response?.data?.error
                  || error?.message 
                  || 'Failed to save package'
    
    this.$toast.error(errorMsg)
  } finally {
    this.saving = false
  }
},
    
async deletePackageConfirm(id) {
  const confirmed = await this.$confirm({
    title: 'Delete Package',
    message: 'Are you sure you want to delete this package? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (confirmed) {
    try {
      await api.deletePackage(id)
      this.$toast.success('Package deleted successfully')
      this.loadPackages()
    } catch (error) {
      console.error('Error deleting package:', error)
      this.$toast.error('Failed to delete package')
    }
  }
},
    
    // Casket CRUD
    openCreateCasket(pkg) {
      this.currentPackage = pkg
      this.casketForm.packageId = pkg._id
      this.showCreateCasketModal = true
    },
    
    editCasket(casket) {
      this.casketForm = { ...casket }
      this.editingCasketId = casket._id
      this.showEditCasketModal = true
    },
    
async savePackage() {
  this.packageForm.features = this.featuresText.split('\n').filter(f => f.trim())
  
  this.saving = true
  try {
    if (this.showEditPackageModal) {
      await api.updatePackage(this.editingPackageId, this.packageForm)
      this.$toast.success('Package updated successfully!')
    } else {
      await api.createPackage(this.packageForm)
      this.$toast.success('Package created successfully!')
    }
    
    this.closeModals()
    this.loadPackages()
  } catch (error) {
    console.error('Error saving package:', error)
    this.$toast.error('Failed to save package')
  } finally {
    this.saving = false
  }
},
    
async deleteCasketConfirm(id) {
  const confirmed = await this.$confirm({
    title: 'Delete Casket',
    message: 'Are you sure you want to delete this casket? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (confirmed) {
    try {
      await api.deleteCasket(id)
      this.$toast.success('Casket deleted successfully')
      if (this.expandedPackage) {
        await this.loadCaskets(this.expandedPackage)
      }
    } catch (error) {
      console.error('Error deleting casket:', error)
      this.$toast.error('Failed to delete casket')
    }
  }
},
    
    closeModals() {
      this.showCreatePackageModal = false
      this.showEditPackageModal = false
      this.showCreateCasketModal = false
      this.showEditCasketModal = false
      this.packageForm = this.getEmptyPackageForm()
      this.casketForm = this.getEmptyCasketForm()
      this.featuresText = ''
      this.editingPackageId = null
      this.editingCasketId = null
    },
    // Inside PackagesCaskets.vue
created() {
  if (this.$toast) {
    console.log("✅ Toast plugin is ready!");
  } else {
    console.error("❌ Toast plugin is still undefined. Check main.js");
  }
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

.packages-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.package-section {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.package-header-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.package-info {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.package-image-thumb {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--primary-gold);
}

.package-image-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.package-details h2 {
  margin: 0 0 0.5rem 0;
  color: var(--rich-black);
}

.package-category {
  background: var(--primary-gold);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
}

.package-tagline {
  margin: 0.5rem 0 0 0;
  color: var(--text-medium);
}

.package-actions {
  display: flex;
  gap: 0.75rem;
}

/* Caskets Section */
.caskets-section {
  padding: 2rem;
  background: #fafafa;
}

.caskets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.caskets-header h3 {
  margin: 0;
  color: var(--primary-gold);
}

.caskets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.casket-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition);
}

.casket-card:hover {
  border-color: var(--primary-gold);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.casket-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.casket-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.casket-image.placeholder {
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-weight: 600;
}

.casket-details {
  padding: 1.5rem;
}

.casket-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--rich-black);
  font-size: 1.25rem;
}

.casket-material {
  display: inline-block;
  background: var(--cream);
  color: var(--text-dark);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.casket-pricing {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin: 0.75rem 0;
}

.price-regular {
  text-decoration: line-through;
  color: #999;
  font-size: 0.95rem;
}

.price-current {
  color: var(--primary-gold);
  font-size: 1.5rem;
  font-weight: 700;
}

.casket-specs {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0.5rem 0 0 0;
}

.casket-actions {
  padding: 1rem 1.5rem;
  background: #f9f9f9;
  display: flex;
  gap: 0.75rem;
  border-top: 1px solid #e0e0e0;
}

.no-caskets {
  text-align: center;
  padding: 3rem;
  color: var(--text-medium);
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
  max-width: 600px;
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
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  cursor: pointer;
}

.image-upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  background: #fafafa;
}

.upload-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary-gold);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
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
  margin-top: 0.5rem;
  color: var(--primary-gold);
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
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

.btn-outline {
  background: transparent;
  color: var(--primary-gold);
  border: 2px solid var(--primary-gold);
}

.btn-outline:hover {
  background: var(--primary-gold);
  color: white;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #999;
}

@media (max-width: 768px) {
  .package-header-card {
    flex-direction: column;
    gap: 1.5rem;
  }

  .package-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .caskets-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>