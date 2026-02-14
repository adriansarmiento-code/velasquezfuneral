export default {
  install(app, router) {
    // Track initial page load
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-T19G4G1SR3', {
        page_path: window.location.pathname
      })
    }

    // Track every route change
    router.afterEach((to) => {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-T19G4G1SR3', {
          page_path: to.fullPath,
          page_title: document.title
        })
      }
    })
  }
}