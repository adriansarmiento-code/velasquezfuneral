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
              <th>Category</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="blog in blogs" :key="blog._id">
              <td>{{ blog.title }}</td>
              <td>{{ blog.slug }}</td>
              <td>{{ blog.category || 'N/A' }}</td>
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
        <div class="modal-content" @click.stop>
          <h2>{{ showEditModal ? 'Edit Blog' : 'Create New Blog' }}</h2>
          
          <form @submit.prevent="saveBlog">
            <div class="form-group">
              <label>Title *</label>
              <input v-model="blogForm.title" type="text" required />
            </div>

            <div class="form-group">
              <label>Slug *</label>
              <input v-model="blogForm.slug" type="text" required placeholder="blog-url-slug" />
            </div>

            <div class="form-group">
              <label>Category</label>
              <input v-model="blogForm.category" type="text" placeholder="e.g., Funeral Planning" />
            </div>

            <div class="form-group">
              <label>Excerpt *</label>
              <textarea v-model="blogForm.excerpt" rows="3" required></textarea>
            </div>

            <div class="form-group">
              <label>Content *</label>
              <textarea v-model="blogForm.content" rows="10" required></textarea>
            </div>

                    <div class="form-group">
          <label>Image</label>
          <div class="image-upload-section">
            <input 
              v-if="!blogForm.image" 
              type="file" 
              @change="handleImageUpload" 
              accept="image/*"
              ref="imageInput"
            />
            <div v-else class="image-preview">
              <img :src="blogForm.image" alt="Preview" />
              <button type="button" @click="removeImage" class="btn btn-sm btn-danger">Remove</button>
            </div>
          </div>
          <small v-if="uploading">Uploading image...</small>
        </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="blogForm.published" type="checkbox" />
                Publish immediately
              </label>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                {{ saving ? 'Saving...' : 'Save Blog' }}
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
  name: 'AdminBlogsPage',
  components: {
    AdminSidebar
  },
  data() {
    return {
      blogs: [],
      loading: false,
      saving: false,
      uploading: false, // NEW
      showCreateModal: false,
      showEditModal: false,
      blogForm: this.getEmptyForm(),
      editingId: null
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
        category: '',
        published: false
      }
    },
    
    // NEW: Handle image upload
    async handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      this.uploading = true
      try {
        const formData = new FormData()
        formData.append('image', file)

        const token = localStorage.getItem('adminToken')
        const response = await fetch('http://localhost:5000/api/upload/image', {
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
          alert('Upload failed: ' + data.message)
        }
      } catch (error) {
        console.error('Upload error:', error)
        alert('Failed to upload image')
      } finally {
        this.uploading = false
      }
    },

    // NEW: Remove uploaded image
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
        alert('Failed to load blogs')
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
      this.saving = true
      try {
        if (this.showEditModal) {
          await api.updateBlog(this.editingId, this.blogForm)
        } else {
          await api.createBlog(this.blogForm)
        }
        
        alert('Blog saved successfully!')
        this.closeModals()
        this.loadBlogs()
      } catch (error) {
        console.error('Error saving blog:', error)
        alert('Failed to save blog')
      } finally {
        this.saving = false
      }
    },

    async deleteBlogConfirm(id) {
      if (confirm('Are you sure you want to delete this blog?')) {
        try {
          await api.deleteBlog(id)
          alert('Blog deleted successfully')
          this.loadBlogs()
        } catch (error) {
          console.error('Error deleting blog:', error)
          alert('Failed to delete blog')
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

.blogs-table {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-x: auto;
}
.image-upload-section {
  margin-top: 0.5rem;
}

.image-preview {
  position: relative;
  max-width: 400px;
}

.image-preview img {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.5rem;
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

.modal-content h2 {
  margin-top: 0;
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

.no-data {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}
</style>