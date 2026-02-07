import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Contact form
  async submitContact(data) {
    return api.post('/contact', data);
  },
  
  // Get all blogs
  async getBlogs() {
    return api.get('/blogs');
  },
  
  // Get single blog
  async getBlog(slug) {
    return api.get(`/blogs/${slug}`);
  }
};