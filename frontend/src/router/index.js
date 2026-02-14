import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { 
      title: 'Home - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/packages',
    name: 'Packages',
    component: () => import('../views/Packages.vue'),
    meta: { 
      title: 'Funeral Packages - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/packages/:packageId/caskets',
    name: 'PackageCaskets',
    component: () => import('../views/PackageCaskets.vue'),
    meta: { 
      title: 'Available Caskets - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/blogs',
    name: 'Blogs',
    component: () => import('../views/Blogs.vue'),
    meta: { 
      title: 'Funeral Planning Guides - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: () => import('../views/BlogDetail.vue'),
    meta: { 
      title: 'Blog - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/add-ons',
    name: 'AddOns',
    component: () => import('../views/AddOns.vue'),
    meta: { 
      title: 'Additional Services - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { 
      title: 'About Us - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: { 
      title: 'Contact Us - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  
  // Admin Routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/Login.vue'),
    meta: { 
      title: 'Admin Login - Velasquez Funeral and Chapel',
      requiresAuth: false 
    }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { 
      title: 'Dashboard - Admin Panel',
      requiresAuth: true 
    }
  },
  {
    path: '/admin/blogs',
    name: 'AdminBlogs',
    component: () => import('../views/admin/Blogs.vue'),
    meta: { 
      title: 'Manage Blogs - Admin Panel',
      requiresAuth: true 
    }
  },
  {
    path: '/admin/packages',
    name: 'AdminPackages',
    component: () => import('../views/admin/PackagesCaskets.vue'),
    meta: { 
      title: 'Manage Packages - Admin Panel',
      requiresAuth: true 
    }
  },
  {
    path: '/admin/addons',
    name: 'AdminAddOns',
    component: () => import('../views/admin/AddOns.vue'),
    meta: { 
      title: 'Manage Add-Ons - Admin Panel',
      requiresAuth: true 
    }
  },
  {
    path: '/admin/contacts',
    name: 'AdminContacts',
    component: () => import('../views/admin/Contacts.vue'),
    meta: { 
      title: 'Contact Inquiries - Admin Panel',
      requiresAuth: true 
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Check authentication for admin routes
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      next('/admin/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router