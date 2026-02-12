import { createApp } from 'vue'
import Toast from '@/components/Toast.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'

export default {
  install(app) {
    // Toast instance
    const toastApp = createApp(Toast)
    const toastInstance = toastApp.mount(document.createElement('div'))
    document.body.appendChild(toastInstance.$el)

    // Confirm modal instance
    const confirmApp = createApp(ConfirmModal)
    const confirmInstance = confirmApp.mount(document.createElement('div'))
    document.body.appendChild(confirmInstance.$el)

    // Add toast to global properties
    app.config.globalProperties.$toast = {
      success(message, duration = 3000) {
        toastInstance.show(message, 'success', duration)
      },
      error(message, duration = 3000) {
        toastInstance.show(message, 'error', duration)
      },
      warning(message, duration = 3000) {
        toastInstance.show(message, 'warning', duration)
      },
      info(message, duration = 3000) {
        toastInstance.show(message, 'info', duration)
      }
    }

    // Add confirm to global properties
    app.config.globalProperties.$confirm = (options) => {
      if (typeof options === 'string') {
        options = { message: options }
      }
      return confirmInstance.show(options)
    }
  }
}