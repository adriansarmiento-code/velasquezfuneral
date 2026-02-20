<template>
  <aside class="adm-sidebar">
    <div class="adm-sidebar__brand">
      <span class="adm-sidebar__brand-name">Velasquez</span>
      <span class="adm-sidebar__brand-sub">Admin Panel</span>
    </div>

    <div class="adm-sidebar__user">
      <div class="adm-sidebar__user-avatar">{{ initials }}</div>
      <span class="adm-sidebar__user-name">{{ adminUser.username }}</span>
    </div>

    <nav class="adm-sidebar__nav">
      <router-link to="/admin/dashboard" class="adm-sidebar__link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        Dashboard
      </router-link>
      <router-link to="/admin/blogs" class="adm-sidebar__link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        Blogs
      </router-link>
      <router-link to="/admin/packages" class="adm-sidebar__link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        Packages & Caskets
      </router-link>
      <router-link to="/admin/addons" class="adm-sidebar__link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        Add-Ons
      </router-link>
      <router-link to="/admin/contacts" class="adm-sidebar__link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        Contacts
      </router-link>
    </nav>

    <div class="adm-sidebar__footer">
      <a href="/" target="_blank" class="adm-sidebar__view-site">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        View Website
      </a>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebarComponent',
  computed: {
    adminUser() {
      const user = localStorage.getItem('adminUser')
      return user ? JSON.parse(user) : { username: 'Admin' }
    },
    initials() {
      const name = this.adminUser.username || 'A'
      return name.slice(0, 2).toUpperCase()
    }
  }
}
</script>

<style scoped>
.adm-sidebar {
  width: 240px;
  min-height: 100vh;
  background: var(--onyx);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

/* Brand */
.adm-sidebar__brand {
  padding: var(--sp-8) var(--sp-6) var(--sp-6);
  border-bottom: 1px solid rgba(196,148,74,0.15);
  display: flex;
  flex-direction: column;
}
.adm-sidebar__brand-name {
  font-family: var(--font-elegant);
  font-size: 1.25rem;
  color: var(--amber);
  letter-spacing: 2px;
  line-height: 1;
}
.adm-sidebar__brand-sub {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: var(--ls-widest);
  text-transform: uppercase;
  color: rgba(248,244,239,0.35);
  margin-top: var(--sp-1);
}

/* User */
.adm-sidebar__user {
  padding: var(--sp-5) var(--sp-6);
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.adm-sidebar__user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(196,148,74,0.18);
  border: 1px solid rgba(196,148,74,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-elegant);
  font-size: 0.7rem;
  color: var(--amber);
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.adm-sidebar__user-name {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: rgba(248,244,239,0.65);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Nav links */
.adm-sidebar__nav {
  flex: 1;
  padding: var(--sp-4) 0;
  display: flex;
  flex-direction: column;
}
.adm-sidebar__link {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  padding: var(--sp-4) var(--sp-6);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: rgba(248,244,239,0.55);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease, border-left-color 0.2s ease;
  border-left: 2px solid transparent;
  letter-spacing: 0.02em;
}
.adm-sidebar__link svg {
  flex-shrink: 0;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}
.adm-sidebar__link:hover {
  color: rgba(248,244,239,0.85);
  background: rgba(255,255,255,0.04);
  border-left-color: rgba(196,148,74,0.4);
}
.adm-sidebar__link:hover svg { opacity: 0.85; }
.adm-sidebar__link.router-link-active {
  color: var(--amber);
  background: rgba(196,148,74,0.08);
  border-left-color: var(--amber);
  font-weight: 600;
}
.adm-sidebar__link.router-link-active svg { opacity: 1; color: var(--amber); }

/* Footer */
.adm-sidebar__footer {
  padding: var(--sp-5) var(--sp-6);
  border-top: 1px solid rgba(255,255,255,0.05);
}
.adm-sidebar__view-site {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  color: rgba(248,244,239,0.35);
  text-decoration: none;
  transition: color 0.2s ease;
}
.adm-sidebar__view-site:hover { color: var(--amber); }
</style>