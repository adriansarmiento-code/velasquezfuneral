<template>
  <div class="adm-layout">
    <AdminSidebar />

    <div class="adm-main">
      <header class="adm-topbar">
        <div>
          <h1 class="adm-topbar__title">Add-Ons</h1>
          <p class="adm-topbar__sub">{{ addons.length }} additional services</p>
        </div>
        <button class="adm-btn adm-btn--primary" @click="showCreateModal = true">+ New Add-On</button>
      </header>

      <div v-if="loading" class="page-loader">
        <div class="page-loader__ring"></div>
        <p class="page-loader__text">Loading add-ons…</p>
      </div>

      <div v-else-if="addons.length === 0" class="empty-state">
        <h3>No add-ons yet</h3>
        <p>Create additional services to display on the website.</p>
      </div>

      <div v-else class="adm-table-wrap">
        <table class="adm-table">
          <thead>
            <tr>
              <th style="width:80px">Preview</th>
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
                <div class="adm-thumb">
                  <img v-if="addon.image" :src="addon.image" :alt="addon.title" />
                  <span v-else class="adm-thumb__icon">{{ addon.icon || '📦' }}</span>
                </div>
              </td>
              <td class="adm-table__title">{{ addon.title }}</td>
              <td class="adm-table__desc">{{ truncate(addon.description, 60) }}</td>
              <td style="font-size:1.4rem;text-align:center">{{ addon.icon }}</td>
              <td><span :class="['adm-badge', addon.published ? 'adm-badge--pub' : 'adm-badge--draft']">{{ addon.published ? 'Published' : 'Draft' }}</span></td>
              <td class="adm-table__date">{{ formatDate(addon.createdAt) }}</td>
              <td>
                <div class="adm-table__actions">
                  <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="editAddOn(addon)">Edit</button>
                  <button class="adm-btn adm-btn--danger adm-btn--sm" @click="deleteAddOnConfirm(addon._id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create / Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="adm-modal-overlay" @click="closeModals">
        <div class="adm-modal" @click.stop>
          <div class="adm-modal__header">
            <h2 class="adm-modal__title">{{ showEditModal ? 'Edit Add-On' : 'New Add-On' }}</h2>
            <button class="adm-modal__close" @click="closeModals" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <form @submit.prevent="saveAddOn" class="adm-modal__body">
            <div class="form-group">
              <label class="form-label">Service Title *</label>
              <input class="form-input" v-model="addonForm.title" type="text" required placeholder="e.g., Memorial Video Presentation" />
            </div>
            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea class="form-textarea" v-model="addonForm.description" rows="4" required placeholder="Describe this additional service…"></textarea>
            </div>
            <div class="adm-form-row">
              <div class="form-group">
                <label class="form-label">Icon (Optional)</label>
                <input class="form-input" v-model="addonForm.icon" type="text" placeholder="e.g., 🎥, 🎵, 💐" />
                <span class="adm-hint">Use an emoji or leave blank</span>
              </div>
              <div class="form-group">
                <label class="form-label">External Link (Optional)</label>
                <input class="form-input" v-model="addonForm.link" type="url" placeholder="https://example.com" />
                <span class="adm-hint">Optional "Learn More" link</span>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Display Order</label>
              <input class="form-input" v-model.number="addonForm.displayOrder" type="number" placeholder="0" style="max-width:160px" />
              <span class="adm-hint">Lower numbers appear first</span>
            </div>
            <div class="form-group">
              <label class="form-label">Service Image</label>
              <div class="adm-upload-zone">
                <div v-if="!addonForm.image">
                  <input type="file" @change="handleImageUpload" accept="image/*" ref="imageInput" id="addonImage" style="display:none" />
                  <label for="addonImage" class="adm-upload-zone__label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Upload Image</span>
                    <small>Recommended: 800 × 600 px</small>
                  </label>
                </div>
                <div v-else class="adm-upload-zone__preview">
                  <img :src="addonForm.image" alt="Preview" />
                  <button type="button" class="adm-btn adm-btn--danger adm-btn--sm" @click="removeImage">Remove</button>
                </div>
              </div>
              <div v-if="uploading" class="adm-progress"><div class="adm-progress__bar"></div><p>Uploading…</p></div>
            </div>
            <div class="form-group">
              <label class="adm-checkbox">
                <input type="checkbox" v-model="addonForm.published" />
                <span>Publish immediately</span>
              </label>
            </div>
            <div class="adm-modal__footer">
              <button type="button" class="adm-btn adm-btn--ghost" @click="closeModals">Cancel</button>
              <button type="submit" class="adm-btn adm-btn--primary" :disabled="saving">
                {{ saving ? 'Saving…' : (showEditModal ? 'Update Add-On' : 'Create Add-On') }}
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
  components: { AdminSidebar },
  data() {
    return {
      addons: [], loading: false, saving: false, uploading: false,
      showCreateModal: false, showEditModal: false,
      addonForm: this.getEmptyForm(), editingId: null
    }
  },
  mounted() { this.loadAddOns() },
  methods: {
    getEmptyForm() { return { title:'', description:'', icon:'', image:'', link:'', displayOrder:0, published:true } },
    async loadAddOns() {
      this.loading = true
      try { const r = await api.getAllAddOnsAdmin(); this.addons = r.data.data }
      catch (error) { console.error('Error loading add-ons:', error); this.$toast.error('Failed to load add-ons') }
      finally { this.loading = false }
    },
    async handleImageUpload(event) {
      const file = event.target.files[0]; if (!file) return
      this.uploading = true
      try {
        const formData = new FormData(); formData.append('image', file)
        const token = localStorage.getItem('adminToken')
        const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/upload/image`, { method:'POST', headers:{'Authorization':`Bearer ${token}`}, body:formData })
        const data = await response.json()
        if (data.success) { this.addonForm.image = data.url } else { this.$toast.error('Upload failed: ' + data.message) }
      } catch (error) { console.error('Upload error:', error); this.$toast.error('Failed to upload image') }
      finally { this.uploading = false }
    },
    removeImage() { this.addonForm.image = ''; if (this.$refs.imageInput) this.$refs.imageInput.value = '' },
    editAddOn(addon) { this.addonForm = { ...addon }; this.editingId = addon._id; this.showEditModal = true },
    async saveAddOn() {
      this.saving = true
      try {
        if (this.showEditModal) { await api.updateAddOn(this.editingId, this.addonForm); this.$toast.success('Add-on updated successfully!') }
        else { await api.createAddOn(this.addonForm); this.$toast.success('Add-on created successfully!') }
        this.closeModals(); this.loadAddOns()
      } catch (error) { console.error('Error saving add-on:', error); this.$toast.error('Failed to save add-on') }
      finally { this.saving = false }
    },
    async deleteAddOnConfirm(id) {
      const confirmed = await this.$confirm({ title:'Delete Add-on', message:'Are you sure? This action cannot be undone.', confirmText:'Delete' })
      if (confirmed) {
        try { await api.deleteAddOn(id); this.$toast.success('Add-on deleted successfully'); this.loadAddOns() }
        catch (error) { console.error('Error deleting add-on:', error); this.$toast.error('Failed to delete add-on') }
      }
    },
    closeModals() { this.showCreateModal = false; this.showEditModal = false; this.addonForm = this.getEmptyForm(); this.editingId = null },
    formatDate(date) { return new Date(date).toLocaleDateString() },
    truncate(text, length) { if (!text) return ''; return text.length > length ? text.substring(0, length) + '…' : text }
  }
}
</script>

<style scoped>
.adm-layout { display: flex; min-height: 100vh; background: var(--linen); }
.adm-main   { flex: 1; padding: var(--sp-8) var(--sp-10); overflow-y: auto; }
.adm-topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-6); margin-bottom: var(--sp-8); padding-bottom: var(--sp-8); border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.adm-topbar__title { font-family: var(--font-display); font-size: var(--display-xs); color: var(--onyx); margin: 0 0 var(--sp-1); font-weight: 600; }
.adm-topbar__sub   { font-family: var(--font-serif); font-size: var(--text-base); font-style: italic; color: var(--stone); margin: 0; }

/* Thumbnail */
.adm-thumb { width: 68px; height: 52px; overflow: hidden; border: 1px solid var(--border); background: var(--linen-warm); display: flex; align-items: center; justify-content: center; }
.adm-thumb img { width: 100%; height: 100%; object-fit: cover; }
.adm-thumb__icon { font-size: 1.6rem; }

/* Table — same pattern */
.adm-table-wrap { background: white; border: 1px solid var(--border); overflow-x: auto; }
.adm-table { width: 100%; border-collapse: collapse; font-family: var(--font-sans); font-size: var(--text-sm); }
.adm-table th { padding: var(--sp-4) var(--sp-5); background: var(--linen); text-align: left; font-size: var(--text-xs); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--stone); font-weight: 600; border-bottom: 1px solid var(--border); }
.adm-table td { padding: var(--sp-4) var(--sp-5); border-bottom: 1px solid var(--linen-warm); color: var(--iron); vertical-align: middle; }
.adm-table tbody tr:last-child td { border-bottom: none; }
.adm-table tbody tr:hover td { background: var(--linen); }
.adm-table__title { font-weight: 600; color: var(--onyx); }
.adm-table__desc  { max-width: 280px; color: var(--stone); }
.adm-table__date  { white-space: nowrap; color: var(--stone); font-size: var(--text-xs); }
.adm-table__actions { display: flex; gap: var(--sp-2); }
.adm-badge { display: inline-block; font-family: var(--font-sans); font-size: 0.7rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.7rem; }
.adm-badge--pub   { background: rgba(34,197,94,0.1);  color: #15803d; }
.adm-badge--draft { background: rgba(234,179,8,0.1);  color: #854d0e; }

/* Buttons */
.adm-btn { display: inline-flex; align-items: center; gap: var(--sp-2); padding: 0.6rem 1.25rem; font-family: var(--font-sans); font-size: var(--text-xs); font-weight: 600; letter-spacing: var(--ls-wide); text-transform: uppercase; border: 1px solid transparent; cursor: pointer; transition: all 0.2s ease; text-decoration: none; }
.adm-btn--primary { background: var(--amber); color: var(--onyx); border-color: var(--amber); }
.adm-btn--primary:hover:not(:disabled) { background: var(--amber-deep); border-color: var(--amber-deep); }
.adm-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
.adm-btn--ghost   { background: transparent; color: var(--iron); border-color: var(--border); }
.adm-btn--ghost:hover { border-color: var(--amber); color: var(--amber); }
.adm-btn--danger  { background: #dc2626; color: white; border-color: #dc2626; }
.adm-btn--danger:hover { background: #b91c1c; }
.adm-btn--sm      { padding: 0.4rem 0.85rem; font-size: 0.68rem; }

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
.adm-upload-zone__label small { font-family: var(--font-sans); font-size: var(--text-xs); color: var(--stone); }
.adm-upload-zone__preview { display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
.adm-upload-zone__preview img { max-width: 100%; max-height: 280px; border: 1px solid var(--border); display: block; }
.adm-progress { margin-top: var(--sp-4); }
.adm-progress__bar { width: 100%; height: 2px; background: var(--border); overflow: hidden; margin-bottom: var(--sp-2); }
.adm-progress__bar::after { content: ''; display: block; height: 100%; background: var(--amber); animation: progress-anim 1.5s ease-in-out infinite; }
@keyframes progress-anim { 0%{width:0%;margin-left:0} 50%{width:100%;margin-left:0} 100%{width:0%;margin-left:100%} }

@media (max-width: 768px) {
  .adm-main { padding: var(--sp-6); }
  .adm-form-row { grid-template-columns: 1fr; }
  .adm-modal__body { padding: var(--sp-6); }
}
</style>