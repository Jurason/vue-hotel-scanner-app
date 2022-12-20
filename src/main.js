import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import Datepicker from '@vuepic/vue-datepicker';
import ButtonBase from "./components/ButtonBase.vue";
import '@vuepic/vue-datepicker/dist/main.css'

createApp(App)
    .use(router)
    .component('Datepicker', Datepicker)
    .component('ButtonBase', ButtonBase)
    .mount('#app')
