import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('adminToken');

// Create axios instance with auth
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Add token to requests
apiClient.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Contact
  submitContact(data) {
    return axios.post(`${API_URL}/contact`, data);
  },

  // Admin Auth
  adminLogin(credentials) {
    return axios.post(`${API_URL}/admin/login`, credentials);
  },
  
  verifyAdmin() {
    return apiClient.get(`${API_URL}/admin/verify`);
  },

  createFirstAdmin(data) {
    return axios.post(`${API_URL}/admin/create-first-admin`, data);
  },

  // Blogs
  getBlogs() {
    return axios.get(`${API_URL}/blogs`);
  },
  
  getBlog(slug) {
    return axios.get(`${API_URL}/blogs/${slug}`);
  },

  // Admin Blog Management
  getAllBlogsAdmin() {
    return apiClient.get(`${API_URL}/blogs/admin/all`);
  },

  createBlog(data) {
    return apiClient.post(`${API_URL}/blogs/admin/create`, data);
  },

  updateBlog(id, data) {
    return apiClient.put(`${API_URL}/blogs/admin/update/${id}`, data);
  },

  deleteBlog(id) {
    return apiClient.delete(`${API_URL}/blogs/admin/delete/${id}`);
  },

  // Packages
  getPackages() {
    return axios.get(`${API_URL}/packages`);
  },

  getAllPackagesAdmin() {
    return apiClient.get(`${API_URL}/packages/admin/all`);
  },

  createPackage(data) {
    return apiClient.post(`${API_URL}/packages/admin/create`, data);
  },

  updatePackage(id, data) {
    return apiClient.put(`${API_URL}/packages/admin/update/${id}`, data);
  },

  deletePackage(id) {
    return apiClient.delete(`${API_URL}/packages/admin/delete/${id}`);
  },

  // Add-ons
  getAddOns() {
    return axios.get(`${API_URL}/addons`);
  },

  getAllAddOnsAdmin() {
    return apiClient.get(`${API_URL}/addons/admin/all`);
  },

  createAddOn(data) {
    return apiClient.post(`${API_URL}/addons/admin/create`, data);
  },

  updateAddOn(id, data) {
    return apiClient.put(`${API_URL}/addons/admin/update/${id}`, data);
  },

  deleteAddOn(id) {
    return apiClient.delete(`${API_URL}/addons/admin/delete/${id}`);
  }
};