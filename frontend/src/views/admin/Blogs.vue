<template>
  <div class="adm-layout">
    <AdminSidebar />

    <div class="adm-main">
      <header class="adm-topbar">
        <div>
          <h1 class="adm-topbar__title">Blogs</h1>
          <p class="adm-topbar__sub">{{ blogs.length }} total posts</p>
        </div>
        <button class="adm-btn adm-btn--primary" @click="showCreateModal = true">+ New Blog Post</button>
      </header>

      <div v-if="loading" class="page-loader">
        <div class="page-loader__ring"></div>
        <p class="page-loader__text">Loading blogs…</p>
      </div>

      <div v-else-if="blogs.length === 0" class="empty-state">
        <h3>No blog posts yet</h3>
        <p>Create your first blog post to get started.</p>
      </div>

      <div v-else class="adm-table-wrap">
        <table class="adm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Author</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog._id">
              <td class="adm-table__title">{{ blog.title }}</td>
              <td class="adm-table__slug">/blog/{{ blog.slug }}</td>
              <td>{{ blog.publishedBy || 'Velasquez Funeral and Chapel' }}</td>
              <td><span :class="['adm-badge', blog.published ? 'adm-badge--pub' : 'adm-badge--draft']">{{ blog.published ? 'Published' : 'Draft' }}</span></td>
              <td class="adm-table__date">{{ formatDate(blog.createdAt) }}</td>
              <td>
                <div class="adm-table__actions">
                  <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="editBlog(blog)">Edit</button>
                  <button class="adm-btn adm-btn--danger adm-btn--sm" @click="deleteBlogConfirm(blog._id)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Create / Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="adm-modal-overlay" @click="closeModals">
        <div class="adm-modal adm-modal--lg" @click.stop>
          <div class="adm-modal__header">
            <h2 class="adm-modal__title">{{ showEditModal ? 'Edit Blog Post' : 'New Blog Post' }}</h2>
            <button class="adm-modal__close" @click="closeModals" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <form @submit.prevent="saveBlog" class="adm-modal__body">

            <!-- Section: Basic Info -->
            <div class="adm-form-section">
              <h3 class="adm-form-section__title">Basic Information</h3>
              <div class="adm-form-row">
                <div class="form-group">
                  <label class="form-label">Title *</label>
                  <input class="form-input" v-model="blogForm.title" type="text" required placeholder="Blog post title" />
                </div>
                <div class="form-group">
                  <label class="form-label">URL Slug *</label>
                  <input class="form-input" v-model="blogForm.slug" type="text" required placeholder="blog-url-slug" />
                  <span class="adm-hint">/blog/{{ blogForm.slug || 'your-slug' }}</span>
                </div>
              </div>
              <div class="adm-form-row">
                <div class="form-group">
                  <label class="form-label">Published By</label>
                  <input class="form-input" v-model="blogForm.publishedBy" type="text" placeholder="e.g., Velasquez Funeral and Chapel" />
                </div>
                <div class="form-group" style="display:flex;align-items:flex-end;padding-bottom:var(--sp-2)">
                  <label class="adm-checkbox">
                    <input type="checkbox" v-model="blogForm.published" />
                    <span>Publish immediately</span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Excerpt / Summary *</label>
                <textarea class="form-textarea" v-model="blogForm.excerpt" rows="3" required placeholder="Brief summary shown on the blog listing page"></textarea>
              </div>
            </div>

            <!-- Section: Featured Image -->
            <div class="adm-form-section">
              <h3 class="adm-form-section__title">Featured Image</h3>
              <div class="adm-upload-zone">
                <div v-if="!blogForm.image">
                  <input type="file" @change="handleImageUpload" accept="image/*" ref="imageInput" id="featuredImage" style="display:none" />
                  <label for="featuredImage" class="adm-upload-zone__label">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span>Upload Featured Image</span>
                    <small>Recommended: 1200 × 800 px</small>
                  </label>
                </div>
                <div v-else class="adm-upload-zone__preview">
                  <img :src="blogForm.image" alt="Preview" />
                  <button type="button" class="adm-btn adm-btn--danger adm-btn--sm" @click="removeImage">Remove Image</button>
                </div>
                <div v-if="uploading" class="adm-progress">
                  <div class="adm-progress__bar"></div>
                  <p>Uploading…</p>
                </div>
              </div>
            </div>

            <!-- Section: Content -->
            <div class="adm-form-section">
              <h3 class="adm-form-section__title">Blog Content *</h3>
              <p class="adm-hint" style="margin-bottom:var(--sp-4)">Use the editor below to format your blog post. Add headings, bold text, lists, images, and more.</p>
              <Editor
                v-model="blogForm.content"
                api-key="rr9kx9grc0qaijjx4q69s0cfniz2y9h83undgh67t1l073qs"
                :init="editorConfig"
              />
            </div>

            <div class="adm-modal__footer">
              <button type="button" class="adm-btn adm-btn--ghost" @click="closeModals">Cancel</button>
              <button type="submit" class="adm-btn adm-btn--primary" :disabled="saving">
                {{ saving ? 'Saving…' : (showEditModal ? 'Update Post' : 'Create Post') }}
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
import Editor from '@tinymce/tinymce-vue'
import api from '@/services/api'

export default {
  name: 'AdminBlogsPage',
  components: { AdminSidebar, Editor },
  data() {
    return {
      blogs: [], loading: false, saving: false, uploading: false,
      showCreateModal: false, showEditModal: false,
      blogForm: this.getEmptyForm(), editingId: null,
      editorConfig: {
        height: 600, menubar: true,
        plugins: ['advlist','autolink','lists','link','image','charmap','preview','anchor','searchreplace','visualblocks','code','fullscreen','insertdatetime','media','table','help','wordcount'],
        toolbar: 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media link | forecolor backcolor | code fullscreen | help',
        content_style: `body{font-family:'Crimson Text',Georgia,serif;font-size:18px;line-height:1.9;color:#3A3632;max-width:800px;margin:0 auto;padding:20px}h1,h2,h3,h4,h5,h6{font-family:'Cormorant Garamond',Georgia,serif;color:#1C1917;margin-top:2rem;margin-bottom:1rem;font-weight:600}h2{color:#C4944A}p{margin-bottom:1.5rem}strong{color:#1C1917;font-weight:700}ul,ol{margin-bottom:1.5rem;padding-left:2rem}li{margin-bottom:.5rem}img{max-width:100%;height:auto;margin:2rem 0}blockquote{border-left:3px solid #C4944A;padding:1rem 1.5rem;margin:2rem 0;font-style:italic;color:#9B9289;background:#F8F4EF}a{color:#C4944A}`,
        images_upload_handler: this.handleEditorImageUpload, automatic_uploads: true, file_picker_types: 'image',
        block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Quote=blockquote',
      }
    }
  },
  mounted() { this.loadBlogs() },
  methods: {
    getEmptyForm() {
      return { title:'', slug:'', excerpt:'', content:'', image:'', publishedBy:'Velasquez Funeral and Chapel', published:false }
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
        if (data.success) { this.blogForm.image = data.url } else { this.$toast.error('Upload failed: ' + data.message) }
      } catch (error) { console.error('Upload error:', error); this.$toast.error('Failed to upload image') }
      finally { this.uploading = false }
    },
    async handleEditorImageUpload(blobInfo) {
      return new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData(); formData.append('image', blobInfo.blob(), blobInfo.filename())
          const token = localStorage.getItem('adminToken')
          const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'
          const response = await fetch(`${API_URL}/upload/image`, { method:'POST', headers:{'Authorization':`Bearer ${token}`}, body:formData })
          const data = await response.json()
          if (data.success) { resolve(data.url) } else { reject('Upload failed: ' + data.message) }
        } catch (error) { reject('Failed to upload image') }
      })
    },
    removeImage() { this.blogForm.image = ''; if (this.$refs.imageInput) this.$refs.imageInput.value = '' },
    async loadBlogs() {
      this.loading = true
      try { const r = await api.getAllBlogsAdmin(); this.blogs = r.data.data }
      catch (error) { console.error('Error loading blogs:', error); this.$toast.error('Failed to load blogs') }
      finally { this.loading = false }
    },
    editBlog(blog) { this.blogForm = { ...blog }; this.editingId = blog._id; this.showEditModal = true },
    async saveBlog() {
      if (!this.blogForm.title || !this.blogForm.slug || !this.blogForm.excerpt || !this.blogForm.content) {
        this.$toast.error('Please fill in all required fields'); return
      }
      this.saving = true
      try {
        if (this.showEditModal) { await api.updateBlog(this.editingId, this.blogForm); this.$toast.success('Blog updated successfully!') }
        else { await api.createBlog(this.blogForm); this.$toast.success('Blog created successfully!') }
        this.closeModals(); this.loadBlogs()
      } catch (error) { console.error('Error saving blog:', error); this.$toast.error('Failed to save blog: ' + (error.response?.data?.message || error.message)) }
      finally { this.saving = false }
    },
    async deleteBlogConfirm(id) {
      const confirmed = await this.$confirm({ title:'Delete Blog Post', message:'Are you sure you want to delete this blog post? This action cannot be undone.', confirmText:'Delete' })
      if (confirmed) {
        try { await api.deleteBlog(id); this.$toast.success('Blog post deleted successfully'); this.loadBlogs() }
        catch (error) { console.error('Error deleting blog:', error); this.$toast.error('Failed to delete blog post') }
      }
    },
    closeModals() { this.showCreateModal = false; this.showEditModal = false; this.blogForm = this.getEmptyForm(); this.editingId = null },
    formatDate(date) { return new Date(date).toLocaleDateString() }
  }
}
</script>

<style scoped>
.adm-layout { display: flex; min-height: 100vh; background: var(--linen); }
.adm-main   { flex: 1; padding: var(--sp-8) var(--sp-10); overflow-y: auto; }

.adm-topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: var(--sp-6); margin-bottom: var(--sp-8); padding-bottom: var(--sp-8); border-bottom: 1px solid var(--border); flex-wrap: wrap; }
.adm-topbar__title { font-family: var(--font-display); font-size: var(--display-xs); color: var(--onyx); margin: 0 0 var(--sp-1); font-weight: 600; }
.adm-topbar__sub   { font-family: var(--font-serif); font-size: var(--text-base); font-style: italic; color: var(--stone); margin: 0; }

/* Table */
.adm-table-wrap { background: white; border: 1px solid var(--border); overflow-x: auto; }
.adm-table { width: 100%; border-collapse: collapse; font-family: var(--font-sans); font-size: var(--text-sm); }
.adm-table th { padding: var(--sp-4) var(--sp-5); background: var(--linen); text-align: left; font-size: var(--text-xs); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--stone); font-weight: 600; border-bottom: 1px solid var(--border); }
.adm-table td { padding: var(--sp-4) var(--sp-5); border-bottom: 1px solid var(--linen-warm); color: var(--iron); vertical-align: middle; }
.adm-table tbody tr:last-child td { border-bottom: none; }
.adm-table tbody tr:hover td { background: var(--linen); }
.adm-table__title { font-weight: 600; color: var(--onyx); max-width: 260px; }
.adm-table__slug  { font-family: monospace; font-size: 0.78rem; color: var(--stone); }
.adm-table__date  { white-space: nowrap; color: var(--stone); font-size: var(--text-xs); }
.adm-table__actions { display: flex; gap: var(--sp-2); }

/* Badges */
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
.adm-modal { background: var(--linen); border: 1px solid var(--border); width: 100%; max-width: 760px; margin: auto; }
.adm-modal--lg { max-width: 1100px; }
.adm-modal__header { display: flex; align-items: center; justify-content: space-between; padding: var(--sp-6) var(--sp-8); border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--linen); z-index: 2; }
.adm-modal__title  { font-family: var(--font-display); font-size: var(--text-2xl); color: var(--onyx); margin: 0; font-weight: 600; }
.adm-modal__close  { background: none; border: none; cursor: pointer; color: var(--stone); padding: var(--sp-1); transition: color 0.2s ease; }
.adm-modal__close:hover { color: var(--onyx); }
.adm-modal__body   { padding: var(--sp-8); }
.adm-modal__footer { display: flex; gap: var(--sp-3); justify-content: flex-end; padding-top: var(--sp-6); border-top: 1px solid var(--border); position: sticky; bottom: 0; background: var(--linen); margin: 0 calc(-1 * var(--sp-8)); padding-inline: var(--sp-8); padding-block: var(--sp-5); }

/* Form sections */
.adm-form-section { margin-bottom: var(--sp-10); padding-bottom: var(--sp-8); border-bottom: 1px solid var(--border); }
.adm-form-section:last-of-type { border-bottom: none; margin-bottom: 0; }
.adm-form-section__title { font-family: var(--font-sans); font-size: var(--text-xs); letter-spacing: var(--ls-wider); text-transform: uppercase; color: var(--amber); font-weight: 700; margin: 0 0 var(--sp-6); }
.adm-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--sp-5); margin-bottom: var(--sp-4); }
.adm-hint { font-family: var(--font-sans); font-size: var(--text-xs); color: var(--stone); display: block; margin-top: var(--sp-2); }
.adm-checkbox { display: flex; align-items: center; gap: var(--sp-3); cursor: pointer; font-family: var(--font-sans); font-size: var(--text-sm); color: var(--iron); font-weight: 600; }
.adm-checkbox input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--amber); cursor: pointer; }

/* Image upload */
.adm-upload-zone { border: 1px dashed var(--vellum); background: var(--linen-warm); padding: var(--sp-8); text-align: center; }
.adm-upload-zone__label { display: flex; flex-direction: column; align-items: center; gap: var(--sp-3); cursor: pointer; color: var(--stone); transition: color 0.2s ease; }
.adm-upload-zone__label:hover { color: var(--amber); }
.adm-upload-zone__label span { font-family: var(--font-sans); font-size: var(--text-sm); font-weight: 600; color: var(--amber); letter-spacing: var(--ls-wide); text-transform: uppercase; }
.adm-upload-zone__label small { font-family: var(--font-sans); font-size: var(--text-xs); color: var(--stone); }
.adm-upload-zone__preview { display: flex; flex-direction: column; align-items: center; gap: var(--sp-4); }
.adm-upload-zone__preview img { max-width: 100%; max-height: 360px; border: 1px solid var(--border); display: block; }
.adm-progress { margin-top: var(--sp-4); }
.adm-progress__bar { width: 100%; height: 2px; background: var(--border); overflow: hidden; margin-bottom: var(--sp-2); }
.adm-progress__bar::after { content: ''; display: block; height: 100%; background: var(--amber); animation: progress-anim 1.5s ease-in-out infinite; }
@keyframes progress-anim { 0% { width:0%; margin-left:0 } 50% { width:100%; margin-left:0 } 100% { width:0%; margin-left:100% } }

@media (max-width: 768px) {
  .adm-main { padding: var(--sp-6); }
  .adm-form-row { grid-template-columns: 1fr; }
  .adm-modal__body { padding: var(--sp-6); }
  .adm-modal__footer { margin-inline: calc(-1 * var(--sp-6)); padding-inline: var(--sp-6); }
}
</style>