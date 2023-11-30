import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import '../node_modules/bulma/css/bulma.css';
import '../node_modules/@creativebulma/bulma-tooltip/dist/bulma-tooltip.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
