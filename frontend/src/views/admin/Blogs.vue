<template>
  <div class="admin-layout">
    <AdminSidebar />
    
    <div class="admin-content">
      <div class="admin-header">
        <h1>Manage Blogs</h1>
        <button @click="showCreateModal = true" class="btn btn-primary">+ Create New Blog</button>
      </div>

      <div v-if="loading" class="loading">Loading blogs...</div>

      <div v-else class="blogs-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Published By</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog._id">
              <td>{{ blog.title }}</td>
              <td>{{ blog.slug }}</td>
              <td>{{ blog.publishedBy || 'Velasquez Funeral and Chapel' }}</td>
              <td>
                <span :class="['status-badge', blog.published ? 'status-published' : 'status-draft']">
                  {{ blog.published ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td>{{ formatDate(blog.createdAt) }}</td>
              <td class="actions">
                <button @click="editBlog(blog)" class="btn btn-sm btn-secondary">Edit</button>
                <button @click="deleteBlogConfirm(blog._id)" class="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="blogs.length === 0" class="no-data">No blogs found. Create your first one!</p>
      </div>

      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
        <div class="modal-content modal-large" @click.stop>
          <div class="modal-header">
            <h2>{{ showEditModal ? 'Edit Blog' : 'Create New Blog' }}</h2>
            <button @click="closeModals" class="modal-close">&times;</button>
          </div>
          
          <form @submit.prevent="saveBlog" class="blog-form">
            <!-- Basic Info -->
            <div class="form-section">
              <h3>Basic Information</h3>
              
              <div class="form-row">
                <div class="form-group">
                  <label>Title *</label>
                  <input v-model="blogForm.title" type="text" required placeholder="Blog post title" />
                </div>

                <div class="form-group">
                  <label>URL Slug *</label>
                  <input v-model="blogForm.slug" type="text" required placeholder="blog-url-slug" />
                  <small>This will be the URL: /blog/{{ blogForm.slug || 'your-slug' }}</small>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Published By</label>
                  <input 
                    v-model="blogForm.publishedBy" 
                    type="text" 
                    placeholder="e.g., Velasquez Funeral and Chapel, Admin, Staff Name"
                  />
                  <small>Who is publishing this article? (Default: Velasquez Funeral and Chapel)</small>
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input v-model="blogForm.published" type="checkbox" />
                    <span>Publish immediately</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Excerpt / Summary *</label>
                <textarea v-model="blogForm.excerpt" rows="3" required placeholder="Brief summary that appears on the blog listing page"></textarea>
              </div>
            </div>

            <!-- Featured Image -->
            <div class="form-section">
              <h3>Featured Image</h3>
              
              <div class="image-upload-area">
                <div v-if="!blogForm.image" class="upload-placeholder">
                  <input 
                    type="file" 
                    @change="handleImageUpload" 
                    accept="image/*"
                    ref="imageInput"
                    id="featuredImage"
                    style="display: none;"
                  />
                  <label for="featuredImage" class="upload-btn">
                    📷 Upload Featured Image
                  </label>
                  <p>Recommended size: 1200x800px</p>
                </div>
                
                <div v-else class="image-preview-box">
                  <img :src="blogForm.image" alt="Featured image preview" />
                  <button type="button" @click="removeImage" class="btn btn-sm btn-danger remove-image-btn">
                    Remove Image
                  </button>
                </div>
                
                <div v-if="uploading" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill"></div>
                  </div>
                  <p>Uploading image...</p>
                </div>
              </div>
            </div>

            <!-- Rich Text Content Editor -->
            <div class="form-section">
              <h3>Blog Content *</h3>
              <p class="editor-hint">Use the editor below to format your blog post. You can add headings, bold text, lists, images, and more.</p>
              
              <Editor
                v-model="blogForm.content"
                api-key="rr9kx9grc0qaijjx4q69s0cfniz2y9h83undgh67t1l073qs"
                :init="editorConfig"
              />
            </div>

            <!-- Action Buttons -->
            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : (showEditModal ? 'Update Blog' : 'Create Blog') }}
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
  components: {
    AdminSidebar,
    Editor
  },
  data() {
    return {
      blogs: [],
      loading: false,
      saving: false,
      uploading: false,
      showCreateModal: false,
      showEditModal: false,
      blogForm: this.getEmptyForm(),
      editingId: null,
      
      // TinyMCE Editor Configuration
      editorConfig: {
        height: 600,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | formatselect | bold italic underline strikethrough | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | image media link | ' +
          'forecolor backcolor | code fullscreen | help',
        content_style: `
          body { 
            font-family: 'Lato', sans-serif; 
            font-size: 16px; 
            line-height: 1.8;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Cormorant Garamond', serif;
            color: #1a1a1a;
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          h1 { font-size: 2.5rem; }
          h2 { font-size: 2rem; color: #d4af37; }
          h3 { font-size: 1.75rem; }
          h4 { font-size: 1.5rem; }
          p { margin-bottom: 1.5rem; }
          strong { color: #1a1a1a; font-weight: 700; }
          ul, ol { margin-bottom: 1.5rem; padding-left: 2rem; }
          li { margin-bottom: 0.5rem; }
          img { max-width: 100%; height: auto; border-radius: 8px; margin: 2rem 0; }
          blockquote {
            border-left: 4px solid #d4af37;
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: #666;
          }
          a { color: #d4af37; text-decoration: none; }
          a:hover { text-decoration: underline; }
        `,
        images_upload_handler: this.handleEditorImageUpload,
        automatic_uploads: true,
        file_picker_types: 'image',
        block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Quote=blockquote',
        style_formats: [
          { title: 'Headings', items: [
            { title: 'Main Heading', format: 'h1' },
            { title: 'Section Heading', format: 'h2' },
            { title: 'Subsection Heading', format: 'h3' },
            { title: 'Small Heading', format: 'h4' }
          ]},
          { title: 'Inline', items: [
            { title: 'Bold', format: 'bold' },
            { title: 'Italic', format: 'italic' },
            { title: 'Underline', format: 'underline' },
          ]},
          { title: 'Blocks', items: [
            { title: 'Paragraph', format: 'p' },
            { title: 'Quote', format: 'blockquote' }
          ]}
        ]
      }
    }
  },
  mounted() {
    this.loadBlogs()
  },
  methods: {
getEmptyForm() {
  return {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    publishedBy: 'Velasquez Funeral and Chapel',
    published: false
  }
},
    
    // Handle featured image upload
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
          this.blogForm.image = data.url
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

    // Handle images uploaded within the TinyMCE editor
    async handleEditorImageUpload(blobInfo, progress) {
      return new Promise(async (resolve, reject) => {
        try {
          const formData = new FormData()
          formData.append('image', blobInfo.blob(), blobInfo.filename())

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
            resolve(data.url)
          } else {
            reject('Upload failed: ' + data.message)
          }
        } catch (error) {
          console.error('Editor image upload error:', error)
          reject('Failed to upload image')
        }
      })
    },

    removeImage() {
      this.blogForm.image = ''
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = ''
      }
    },
    
    async loadBlogs() {
      this.loading = true
      try {
        const response = await api.getAllBlogsAdmin()
        this.blogs = response.data.data
      } catch (error) {
        console.error('Error loading blogs:', error)
        this.$toast.error('Failed to load blogs')
      } finally {
        this.loading = false
      }
    },

    editBlog(blog) {
      this.blogForm = { ...blog }
      this.editingId = blog._id
      this.showEditModal = true
    },

    async saveBlog() {
      // Validate required fields
      if (!this.blogForm.title || !this.blogForm.slug || !this.blogForm.excerpt || !this.blogForm.content) {
        this.$toast.error('Please fill in all required fields')
        return
      }

      this.saving = true
      try {
        if (this.showEditModal) {
          await api.updateBlog(this.editingId, this.blogForm)
          this.$toast.success('Blog updated successfully!')
        } else {
          await api.createBlog(this.blogForm)
          this.$toast.success('Blog created successfully!')
        }
        
        this.closeModals()
        this.loadBlogs()
      } catch (error) {
        console.error('Error saving blog:', error)
        this.$toast.error('Failed to save blog: ' + (error.response?.data?.message || error.message))
      } finally {
        this.saving = false
      }
    },
// Delete Blog
async deleteBlogConfirm(id) {
  const confirmed = await this.$confirm({
    title: 'Delete Blog Post',
    message: 'Are you sure you want to delete this blog post? This action cannot be undone.',
    confirmText: 'Delete'
  })

  if (confirmed) {
    try {
      await api.deleteBlog(id)
      this.$toast.success('Blog post deleted successfully')
      this.loadBlogs()
    } catch (error) {
      console.error('Error deleting blog:', error)
      this.$toast.error('Failed to delete blog post')
    }
  }
},

    closeModals() {
      this.showCreateModal = false
      this.showEditModal = false
      this.blogForm = this.getEmptyForm()
      this.editingId = null
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString()
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

/* Table Styles */
.blogs-table {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f8f8;
  font-weight: 600;
  color: #333;
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

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background: #c82333;
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
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-large {
  max-width: 1200px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.modal-header h2 {
  margin: 0;
  color: #1a1a1a;
}

.modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  color: #333;
}

/* Form Styles */
.blog-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h3 {
  color: #d4af37;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.editor-hint {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
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
  border-color: #d4af37;
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
  font-weight: normal;
  cursor: pointer;
  margin-top: 1.5rem;
}

.checkbox-label input[type="checkbox"] {
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
  padding: 2rem;
  text-align: center;
  background: #fafafa;
}

.upload-placeholder {
  padding: 2rem;
}

.upload-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: #d4af37;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.upload-btn:hover {
  background: #b8962e;
}

.image-preview-box {
  position: relative;
}

.image-preview-box img {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.remove-image-btn {
  margin-top: 1rem;
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
  background: #d4af37;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}

/* Modal Actions */
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  position: sticky;
  bottom: 0;
  background: white;
  margin: 0 -2rem;
  padding: 1.5rem 2rem;
}

.no-data, .loading {
  text-align: center;
  color: #999;
  padding: 3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 1rem;
  }

  .blog-form {
    padding: 1rem;
  }
}
</style>