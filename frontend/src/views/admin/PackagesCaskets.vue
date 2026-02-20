<template>
  <div class="adm-layout">
    <AdminSidebar />

    <div class="adm-main">
      <header class="adm-topbar">
        <div>
          <h1 class="adm-topbar__title">Packages &amp; Caskets</h1>
          <p class="adm-topbar__sub">{{ packages.length }} packages · click a package to manage its caskets</p>
        </div>
        <button class="adm-btn adm-btn--primary" @click="showCreatePackageModal = true">+ New Package</button>
      </header>

      <div v-if="loading" class="page-loader">
        <div class="page-loader__ring"></div>
        <p class="page-loader__text">Loading packages…</p>
      </div>

      <div v-else class="pkg-list">
        <div v-for="pkg in packages" :key="pkg._id" class="pkg-card">
          <!-- Package header row -->
          <div class="pkg-card__header">
            <div class="pkg-card__info">
              <div v-if="pkg.image" class="pkg-card__thumb">
                <img :src="pkg.image" :alt="pkg.name" />
              </div>
              <div>
                <h2 class="pkg-card__name">{{ pkg.name }}</h2>
                <span class="adm-badge adm-badge--cat">{{ pkg.category }}</span>
                <p class="pkg-card__tagline">{{ pkg.tagline }}</p>
              </div>
            </div>
            <div class="pkg-card__actions">
              <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="editPackage(pkg)">Edit Package</button>
              <button class="adm-btn adm-btn--outline adm-btn--sm" @click="toggleCaskets(pkg._id)">
                {{ expandedPackage === pkg._id ? 'Hide Caskets' : 'Show Caskets' }}
              </button>
              <button class="adm-btn adm-btn--danger adm-btn--sm" @click="deletePackageConfirm(pkg._id)">Delete</button>
            </div>
          </div>

          <!-- Caskets drawer -->
          <div v-if="expandedPackage === pkg._id" class="caskets-drawer">
            <div class="caskets-drawer__header">
              <h3 class="caskets-drawer__title">Caskets — {{ pkg.name }}</h3>
              <button class="adm-btn adm-btn--primary adm-btn--sm" @click="openCreateCasket(pkg)">+ Add Casket</button>
            </div>

            <div v-if="loadingCaskets" class="page-loader" style="padding:var(--sp-10) 0">
              <div class="page-loader__ring"></div>
            </div>

            <div v-else-if="currentCaskets.length === 0" class="empty-state" style="padding:var(--sp-12) var(--sp-8)">
              <h3>No caskets added yet</h3>
              <p>Add the first casket for this package.</p>
              <button class="adm-btn adm-btn--primary" @click="openCreateCasket(pkg)" style="margin-top:var(--sp-4)">Add First Casket</button>
            </div>

            <div v-else class="caskets-grid">
              <div v-for="casket in currentCaskets" :key="casket._id" class="casket-card">
                <div class="casket-card__img-wrap">
                  <img v-if="casket.image" :src="casket.image" :alt="casket.name" class="casket-card__img" />
                  <div v-else class="casket-card__img-ph">No Image</div>
                  <span class="casket-card__mat-tag">{{ casket.material }}</span>
                </div>
                <div class="casket-card__body">
                  <h4 class="casket-card__name">{{ casket.name }}</h4>
                  <div class="casket-card__pricing">
                    <span v-if="casket.discountedPrice" class="casket-card__orig">₱{{ casket.regularPrice.toLocaleString() }}</span>
                    <span class="casket-card__price">₱{{ (casket.discountedPrice || casket.regularPrice).toLocaleString() }}</span>
                  </div>
                  <p v-if="casket.specifications" class="casket-card__specs">{{ casket.specifications }}</p>
                </div>
                <div class="casket-card__footer">
                  <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="editCasket(casket)">Edit</button>
                  <button class="adm-btn adm-btn--danger adm-btn--sm" @click="deleteCasketConfirm(casket._id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="packages.length === 0" class="empty-state">
          <h3>No packages yet</h3>
          <p>Create your first funeral package to get started.</p>
        </div>
      </div>

      <!-- Package Modal -->
      <div v-if="showCreatePackageModal || showEditPackageModal" class="adm-modal-overlay" @click="closeModals">
        <div class="adm-modal" @click.stop>
          <div class="adm-modal__header">
            <h2 class="adm-modal__title">{{ showEditPackageModal ? 'Edit Package' : 'New Package' }}</h2>
            <button class="adm-modal__close" @click="closeModals" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="savePackage" class="adm-modal__body">
            <div class="adm-form-row">
              <div class="form-group">
                <label class="form-label">Package Name *</label>
                <input class="form-input" v-model="packageForm.name" type="text" required placeholder="e.g., Basic Package" />
              </div>
              <div class="form-group">
                <label class="form-label">Category *</label>
                <select class="form-select" v-model="packageForm.category" required>
                  <option value="">Select Category</option>
                  <option value="Basic">Basic</option>
                  <option value="Semi-Elegant">Semi-Elegant</option>
                  <option value="Elegant">Elegant</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Tagline *</label>
              <input class="form-input" v-model="packageForm.tagline" type="text" required placeholder="e.g., Essential Services with Dignity" />
            </div>
            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea class="form-textarea" v-model="packageForm.description" rows="4" required></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Package Image</label>
              <div class="adm-upload-zone">
                <div v-if="!packageForm.image">
                  <input type="file" @change="handlePackageImageUpload" accept="image/*" ref="packageImageInput" id="packageImage" style="display:none" />
                  <label for="packageImage" class="adm-upload-zone__label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Upload Image</span>
                  </label>
                </div>
                <div v-else class="adm-upload-zone__preview">
                  <img :src="packageForm.image" alt="Preview" />
                  <button type="button" class="adm-btn adm-btn--danger adm-btn--sm" @click="removePackageImage">Remove</button>
                </div>
              </div>
              <div v-if="uploadingPackageImage" class="adm-progress"><div class="adm-progress__bar"></div></div>
            </div>
            <div class="form-group">
              <label class="form-label">Features / Inclusions <span class="adm-hint" style="display:inline">(one per line)</span></label>
              <textarea class="form-textarea" v-model="featuresText" rows="8" placeholder="Professional embalming services&#10;Transfer to funeral home&#10;Basic venue preparation"></textarea>
            </div>
            <div class="form-group">
              <label class="adm-checkbox">
                <input type="checkbox" v-model="packageForm.published" />
                <span>Publish immediately</span>
              </label>
            </div>
            <div class="adm-modal__footer">
              <button type="button" class="adm-btn adm-btn--ghost" @click="closeModals">Cancel</button>
              <button type="submit" class="adm-btn adm-btn--primary" :disabled="saving">
                {{ saving ? 'Saving…' : (showEditPackageModal ? 'Update Package' : 'Create Package') }}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Casket Modal -->
      <div v-if="showCreateCasketModal || showEditCasketModal" class="adm-modal-overlay" @click="closeModals">
        <div class="adm-modal" @click.stop>
          <div class="adm-modal__header">
            <h2 class="adm-modal__title">{{ showEditCasketModal ? 'Edit Casket' : 'Add Casket' }}</h2>
            <button class="adm-modal__close" @click="closeModals" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="saveCasket" class="adm-modal__body">
            <div class="adm-form-row">
              <div class="form-group">
                <label class="form-label">Casket Name *</label>
                <input class="form-input" v-model="casketForm.name" type="text" required placeholder="e.g., OMS, Tapiada, Full Glass" />
              </div>
              <div class="form-group">
                <label class="form-label">Material *</label>
                <select class="form-select" v-model="casketForm.material" required>
                  <option value="">Select Material</option>
                  <option value="Wood">Wood</option>
                  <option value="Metal">Metal</option>
                  <option value="Imported">Imported</option>
                </select>
              </div>
            </div>
            <div class="adm-form-row">
              <div class="form-group">
                <label class="form-label">Regular Price (₱) *</label>
                <input class="form-input" v-model.number="casketForm.regularPrice" type="number" required placeholder="95000" />
              </div>
              <div class="form-group">
                <label class="form-label">Discounted Price (₱)</label>
                <input class="form-input" v-model.number="casketForm.discountedPrice" type="number" placeholder="70000" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Specifications</label>
              <input class="form-input" v-model="casketForm.specifications" type="text" placeholder="e.g., 27''/190cm, Standard Size" />
            </div>
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" v-model="casketForm.description" rows="3" placeholder="Brief description of the casket"></textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Casket Image</label>
              <div class="adm-upload-zone">
                <div v-if="!casketForm.image">
                  <input type="file" @change="handleCasketImageUpload" accept="image/*" ref="casketImageInput" id="casketImage" style="display:none" />
                  <label for="casketImage" class="adm-upload-zone__label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Upload Image</span>
                  </label>
                </div>
                <div v-else class="adm-upload-zone__preview">
                  <img :src="casketForm.image" alt="Preview" />
                  <button type="button" class="adm-btn adm-btn--danger adm-btn--sm" @click="removeCasketImage">Remove</button>
                </div>
              </div>
              <div v-if="uploadingCasketImage" class="adm-progress"><div class="adm-progress__bar"></div></div>
            </div>
            <div class="form-group">
              <label class="adm-checkbox">
                <input type="checkbox" v-model="casketForm.published" />
                <span>Publish immediately</span>
              </label>
            </div>
            <div class="adm-modal__footer">
              <button type="button" class="adm-btn adm-btn--ghost" @click="closeModals">Cancel</button>
              <button type="submit" class="adm-btn adm-btn--primary" :disabled="saving">
                {{ saving ? 'Saving…' : (showEditCasketModal ? 'Update Casket' : 'Add Casket') }}
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
  components: { AdminSidebar },
  data() {
    return {
      packages: [], currentCaskets: [], loading: false, loadingCaskets: false, saving: false,
      uploadingPackageImage: false, uploadingCasketImage: false, expandedPackage: null,
      showCreatePackageModal: false, showEditPackageModal: false,
      showCreateCasketModal: false, showEditCasketModal: false,
      packageForm: this.getEmptyPackageForm(), casketForm: this.getEmptyCasketForm(),
      featuresText: '', editingPackageId: null, editingCasketId: null, currentPackage: null
    }
  },
  mounted() { this.loadPackages() },
  methods: {
    getEmptyPackageForm() { return { name:'', category:'', tagline:'', description:'', image:'', features:[], published:true } },
    getEmptyCasketForm()  { return { packageId:'', name:'', material:'', regularPrice:0, discountedPrice:null, description:'', specifications:'', image:'', published:true } },
    async loadPackages() {
      this.loading = true
      try { const r = await api.getAllPackagesAdmin(); this.packages = r.data.data }
      catch (error) { console.error('Error loading packages:', error); this.$toast.error('Failed to load packages') }
      finally { this.loading = false }
    },
    async toggleCaskets(packageId) {
      if (this.expandedPackage === packageId) { this.expandedPackage = null; this.currentCaskets = [] }
      else { this.expandedPackage = packageId; await this.loadCaskets(packageId) }
    },
    async loadCaskets(packageId) {
      this.loadingCaskets = true
      try { const r = await api.getCasketsByPackageAdmin(packageId); this.currentCaskets = r.data.data }
      catch (error) { console.error('Error loading caskets:', error); this.$toast.error('Failed to load caskets') }
      finally { this.loadingCaskets = false }
    },
    async handlePackageImageUpload(event) {
      const file = event.target.files[0]; if (!file) return
      this.uploadingPackageImage = true
      try {
        const formData = new FormData(); formData.append('image', file)
        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/upload/image`, { method:'POST', headers:{'Authorization':`Bearer ${token}`}, body:formData })
        const data = await response.json()
        if (data.success) { this.packageForm.image = data.url } else { this.$toast.error('Upload failed: ' + data.message) }
      } catch (error) { console.error('Upload error:', error); this.$toast.error('Failed to upload image') }
      finally { this.uploadingPackageImage = false }
    },
    removePackageImage() { this.packageForm.image = ''; if (this.$refs.packageImageInput) this.$refs.packageImageInput.value = '' },
    async handleCasketImageUpload(event) {
      const file = event.target.files[0]; if (!file) return
      this.uploadingCasketImage = true
      try {
        const formData = new FormData(); formData.append('image', file)
        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/upload/image`, { method:'POST', headers:{'Authorization':`Bearer ${token}`}, body:formData })
        const data = await response.json()
        if (data.success) { this.casketForm.image = data.url } else { this.$toast.error('Upload failed: ' + data.message) }
      } catch (error) { console.error('Upload error:', error); this.$toast.error('Failed to upload image') }
      finally { this.uploadingCasketImage = false }
    },
    removeCasketImage() { this.casketForm.image = ''; if (this.$refs.casketImageInput) this.$refs.casketImageInput.value = '' },
    editPackage(pkg) { this.packageForm = { ...pkg }; this.featuresText = pkg.features.join('\n'); this.editingPackageId = pkg._id; this.showEditPackageModal = true },
    async savePackage() {
      this.packageForm.features = this.featuresText.split('\n').filter(f => f.trim())
      this.saving = true
      try {
        if (this.showEditPackageModal) { await api.updatePackage(this.editingPackageId, this.packageForm); this.$toast.success('Package updated successfully!') }
        else { await api.createPackage(this.packageForm); this.$toast.success('Package created successfully!') }
        this.closeModals(); await this.loadPackages()
      } catch (error) {
        console.error('Error saving package:', error)
        this.$toast.error(error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Failed to save package')
      } finally { this.saving = false }
    },
    async deletePackageConfirm(id) {
      const confirmed = await this.$confirm({ title:'Delete Package', message:'Are you sure? This action cannot be undone.', confirmText:'Delete' })
      if (confirmed) {
        try { await api.deletePackage(id); this.$toast.success('Package deleted successfully'); this.loadPackages() }
        catch (error) { console.error('Error deleting package:', error); this.$toast.error('Failed to delete package') }
      }
    },
    openCreateCasket(pkg) { this.currentPackage = pkg; this.casketForm.packageId = pkg._id; this.showCreateCasketModal = true },
    editCasket(casket) { this.casketForm = { ...casket }; this.editingCasketId = casket._id; this.showEditCasketModal = true },
    async saveCasket() {
      this.saving = true
      try {
        if (this.showEditCasketModal) { await api.updateCasket(this.editingCasketId, this.casketForm); this.$toast.success('Casket updated successfully!') }
        else { await api.createCasket(this.casketForm); this.$toast.success('Casket added successfully!') }
        this.closeModals(); if (this.expandedPackage) await this.loadCaskets(this.expandedPackage)
      } catch (error) { console.error('Error saving casket:', error); this.$toast.error('Failed to save casket') }
      finally { this.saving = false }
    },
    async deleteCasketConfirm(id) {
      const confirmed = await this.$confirm({ title:'Delete Casket', message:'Are you sure? This action cannot be undone.', confirmText:'Delete' })
      if (confirmed) {
        try { await api.deleteCasket(id); this.$toast.success('Casket deleted successfully'); if (this.expandedPackage) await this.loadCaskets(this.expandedPackage) }
        catch (error) { console.error('Error deleting casket:', error); this.$toast.error('Failed to delete casket') }
      }
    },
    closeModals() {
      this.showCreatePackageModal = false; this.showEditPackageModal = false
      this.showCreateCasketModal = false; this.showEditCasketModal = false
      this.packageForm = this.getEmptyPackageForm(); this.casketForm = this.getEmptyCasketForm()
      this.featuresText = ''; this.editingPackageId = null; this.editingCasketId = null
    },
    created() { if (this.$toast) console.log('✅ Toast plugin is ready!'); else console.error('❌ Toast plugin is undefined. Check main.js') }
  }
}
</script>

<style scoped>
.adm-layout { display: flex; min-height: 100vh; background: var(--linen); }
.adm-main   { flex: 1; padding: var(--sp-8) var(--sp-10); overflow-y: auto; }
.adm-topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-6); margin-bottom: var(--sp-8); padding-bottom: var(--sp-8); border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.adm-topbar__title { font-family: var(--font-display); font-size: var(--display-xs); color: var(--onyx); margin: 0 0 var(--sp-1); font-weight: 600; }
.adm-topbar__sub   { font-family: var(--font-serif); font-size: var(--text-base); font-style: italic; color: var(--stone); margin: 0; }

/* Package list */
.pkg-list { display: flex; flex-direction: column; gap: var(--sp-5); }
.pkg-card { background: white; border: 1px solid var(--border); overflow: hidden; }
.pkg-card__header { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-6) var(--sp-8); gap: var(--sp-6); flex-wrap: wrap; }
.pkg-card__info   { display: flex; align-items: center; gap: var(--sp-5); }
.pkg-card__thumb  { width: 88px; height: 88px; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0; }
.pkg-card__thumb img { width: 100%; height: 100%; object-fit: cover; }
.pkg-card__name   { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--onyx); margin: 0 0 var(--sp-2); font-weight: 600; }
.pkg-card__tagline { font-family: var(--font-serif); font-size: var(--text-sm); color: var(--stone); font-style: italic; margin: var(--sp-2) 0 0; }
.pkg-card__actions { display: flex; gap: var(--sp-2); flex-wrap: wrap; }

/* Badges */
.adm-badge { display: inline-block; font-family: var(--font-sans); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.7rem; }
.adm-badge--pub   { background: rgba(34,197,94,0.1);  color: #15803d; }
.adm-badge--draft { background: rgba(234,179,8,0.1);  color: #854d0e; }
.adm-badge--cat   { background: rgba(196,148,74,0.12); color: var(--amber-deep); }

/* Caskets drawer */
.caskets-drawer { background: var(--linen); border-top: 1px solid var(--border); padding: var(--sp-6) var(--sp-8); }
.caskets-drawer__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--sp-6); }
.caskets-drawer__title  { font-family: var(--font-sans); font-size: var(--text-xs); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--amber); font-weight: 700; margin: 0; }
.caskets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--sp-5); }

.casket-card { background: white; border: 1px solid var(--border); display: flex; flex-direction: column; transition: border-color 0.2s ease, transform 0.2s ease; }
.casket-card:hover { border-color: var(--amber); transform: translateY(-2px); }
.casket-card__img-wrap { position: relative; height: 180px; overflow: hidden; background: var(--linen-warm); }
.casket-card__img { width: 100%; height: 100%; object-fit: cover; }
.casket-card__img-ph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: var(--font-sans); font-size: var(--text-xs); color: var(--stone); letter-spacing: var(--ls-wide); text-transform: uppercase; }
.casket-card__mat-tag { position: absolute; bottom: var(--sp-2); left: var(--sp-2); font-family: var(--font-sans); font-size: 0.65rem; font-weight: 700; letter-spacing: var(--ls-wider); text-transform: uppercase; background: rgba(15,14,12,0.75); color: var(--amber); padding: 0.2rem 0.5rem; }
.casket-card__body { padding: var(--sp-4) var(--sp-5); flex: 1; }
.casket-card__name { font-family: var(--font-display); font-size: var(--text-xl); color: var(--onyx); margin: 0 0 var(--sp-3); font-weight: 600; }
.casket-card__pricing { display: flex; align-items: baseline; gap: var(--sp-3); margin-bottom: var(--sp-2); }
.casket-card__orig  { font-size: var(--text-sm); color: var(--stone); text-decoration: line-through; }
.casket-card__price { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 700; color: var(--amber); }
.casket-card__specs { font-family: var(--font-serif); font-size: var(--text-sm); color: var(--stone); margin: 0; font-style: italic; }
.casket-card__footer { padding: var(--sp-3) var(--sp-5); border-top: 1px solid var(--linen-warm); display: flex; gap: var(--sp-2); background: var(--linen); }

/* Buttons */
.adm-btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: 0.6rem 1.25rem; font-family: var(--font-sans); font-size: var(--text-xs); font-weight: 600; letter-spacing: var(--ls-wide); text-transform: uppercase; border: 1px solid transparent; cursor: pointer; transition: all 0.2s ease; text-decoration: none; }
.adm-btn--primary { background: var(--amber); color: var(--onyx); border-color: var(--amber); }
.adm-btn--primary:hover:not(:disabled) { background: var(--amber-deep); border-color: var(--amber-deep); }
.adm-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.adm-btn--ghost   { background: transparent; color: var(--iron); border-color: var(--border); }
.adm-btn--ghost:hover { border-color: var(--amber); color: var(--amber); }
.adm-btn--outline { background: transparent; color: var(--amber); border-color: rgba(196,148,74,0.4); }
.adm-btn--outline:hover { background: rgba(196,148,74,0.06); border-color: var(--amber); }
.adm-btn--danger  { background: #dc2626; color: white; border-color: #dc2626; }
.adm-btn--danger:hover { background: #b91c1c; }
.adm-btn--sm { padding: 0.4rem 0.85rem; font-size: 0.68rem; }

/* Modal */
.adm-modal-overlay { position: fixed; inset: 0; background: rgba(15,14,12,0.65); display: flex; align-items: flex-start; justify-content: center; z-index: 1000; padding: var(--sp-8); overflow-y: auto; backdrop-filter: blur(3px); }
.adm-modal { background: var(--linen); border: 1px solid var(--border); width: 100%; max-width: 640px; margin: auto; }
.adm-modal__header { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-6) var(--sp-8); border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--linen); z-index: 2; }
.adm-modal__title  { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--onyx); margin: 0; font-weight: 600; }
.adm-modal__close  { background: none; border: none; cursor: pointer; color: var(--stone); padding: var(--sp-1); transition: color 0.2s ease; }
.adm-modal__close:hover { color: var(--onyx); }
.adm-modal__body   { padding: var(--sp-8); }
.adm-modal__footer { display: flex; gap: var(--sp-3); justify-content: flex-end; padding-top: var(--sp-6); border-top: 1px solid var(--border); margin-top: var(--sp-6); }
.adm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); }
.adm-hint { font-family: var(--font-sans); font-size: var(--text-xs); color: var(--stone); display: block; margin-top: var(--sp-2); }
.adm-checkbox { display: flex; align-items: center; gap: var(--sp-3); cursor: pointer; font-family: var(--font-sans); font-size: var(--text-sm); color: var(--iron); font-weight: 600; }
.adm-checkbox input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--amber); cursor: pointer; }
.adm-upload-zone { border: 1px dashed var(--vellum); background: var(--linen-warm); padding: var(--sp-6); text-align: center; }
.adm-upload-zone__label { display: flex; flex-direction: column; align-items: center; gap: var(--sp-3); cursor: pointer; color: var(--stone); transition: color 0.2s ease; }
.adm-upload-zone__label:hover { color: var(--amber); }
.adm-upload-zone__label span { font-family: var(--font-sans); font-size: var(--text-sm); font-weight: 600; color: var(--amber); letter-spacing: var(--ls-wide); text-transform: uppercase; }
.adm-upload-zone__preview { display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
.adm-upload-zone__preview img { max-width: 100%; max-height: 240px; border: 1px solid var(--border); display: block; }
.adm-progress { margin-top: var(--sp-3); }
.adm-progress__bar { width: 100%; height: 2px; background: var(--border); overflow: hidden; }
.adm-progress__bar::after { content: ''; display: block; height: 100%; background: var(--amber); animation: progress-anim 1.5s ease-in-out infinite; }
@keyframes progress-anim { 0%{width:0%;margin-left:0} 50%{width:100%;margin-left:0} 100%{width:0%;margin-left:100%} }

@media (max-width: 1024px) { .caskets-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .adm-main { padding: var(--sp-6); }
  .pkg-card__header { flex-direction: column; align-items: flex-start; }
  .caskets-grid { grid-template-columns: 1fr; }
  .adm-form-row { grid-template-columns: 1fr; }
  .adm-modal__body { padding: var(--sp-6); }
}
</style>