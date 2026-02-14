import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import App from './App.vue'
import router from './router'
import toastPlugin from './plugins/toast'
import analyticsPlugin from './plugins/analytics' // NEW
import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(toastPlugin)
app.use(createMetaManager())
app.use(analyticsPlugin, router) // NEW - pass router

app.mount('#app')