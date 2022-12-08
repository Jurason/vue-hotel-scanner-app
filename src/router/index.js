import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', name: 'MainView', component: () => import('../MainPage/MainView.vue')},
    {path: '/login', name: 'LoginView', component: () => import('../LoginPage/LoginView.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router