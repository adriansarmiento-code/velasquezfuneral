<template>
  <transition name="toast">
    <div v-if="visible" :class="['toast', `toast-${type}`]">
      <div class="toast-icon">
        <span v-if="type === 'success'">✓</span>
        <span v-else-if="type === 'error'">✗</span>
        <span v-else-if="type === 'warning'">⚠</span>
        <span v-else>ℹ</span>
      </div>
      <div class="toast-content">
        <p class="toast-message">{{ message }}</p>
      </div>
      <button @click="close" class="toast-close">&times;</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToastNotification',
  data() {
    return {
      visible: false,
      message: '',
      type: 'info',
      timeout: null
    }
  },
  methods: {
    show(message, type = 'info', duration = 3000) {
      this.message = message
      this.type = type
      this.visible = true

      if (this.timeout) {
        clearTimeout(this.timeout)
      }

      this.timeout = setTimeout(() => {
        this.close()
      }, duration)
    },
    close() {
      this.visible = false
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 100px;
  right: 2rem;
  min-width: 320px;
  max-width: 500px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  z-index: 9999;
  border-left: 4px solid;
}

.toast-success {
  border-color: #28a745;
}

.toast-error {
  border-color: #dc3545;
}

.toast-warning {
  border-color: #ffc107;
}

.toast-info {
  border-color: #17a2b8;
}

.toast-icon {
  font-size: 1.75rem;
  font-weight: bold;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toast-success .toast-icon {
  color: #28a745;
  background: #d4edda;
}

.toast-error .toast-icon {
  color: #dc3545;
  background: #f8d7da;
}

.toast-warning .toast-icon {
  color: #856404;
  background: #fff3cd;
}

.toast-info .toast-icon {
  color: #17a2b8;
  background: #d1ecf1;
}

.toast-content {
  flex: 1;
}

.toast-message {
  margin: 0;
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.75rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.toast-close:hover {
  color: #333;
}

/* Animations */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .toast {
    left: 1rem;
    right: 1rem;
    min-width: auto;
  }
}
</style>