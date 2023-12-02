import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router';

// CSS
import '../node_modules/bulma/css/bulma.css';
import '../node_modules/@creativebulma/bulma-tooltip/dist/bulma-tooltip.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
