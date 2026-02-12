import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import toastPlugin from './plugins/toast'
import './assets/style.css'

const app = createApp(App)

app.use(router)
app.use(toastPlugin)

app.mount('#app')