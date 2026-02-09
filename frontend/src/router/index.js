import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/packages',
    name: 'Packages',
    component: () => import('../views/Packages.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/add-ons',
    name: 'AddOns',
    component: () => import('../views/AddOns.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue')
  },
  // Admin Routes
  {
    path: '/admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/Login.vue')
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/blogs',
    name: 'AdminBlogs',
    component: () => import('../views/admin/Blogs.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/packages',
    name: 'AdminPackages',
    component: () => import('../views/admin/Packages.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/addons',
    name: 'AdminAddOns',
    component: () => import('../views/admin/AddOns.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/contacts',
    name: 'AdminContacts',
    component: () => import('../views/admin/Contacts.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken');
  
  if (to.meta.requiresAuth && !token) {
    next('/admin/login');
  } else if (to.path === '/admin/login' && token) {
    next('/admin/dashboard');
  } else {
    next();
  }
});

export default router