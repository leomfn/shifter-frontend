import { createRouter, createWebHistory } from 'vue-router';
import ShiftsOverview from './views/ShiftsOverview.vue';
import LoginView from './views/LoginView.vue';
import { useAuthStore } from './stores/AuthStore';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: ShiftsOverview,
            beforeEnter: (to, from) => {
                const authStore = useAuthStore();
                if (!authStore.userIsLoggedIn) {
                    return '/login'
                }
            }
        },
        {
            path: '/login',
            component: LoginView,
            beforeEnter: (to, from) => {
                const authStore = useAuthStore();
                if (authStore.userIsLoggedIn) {
                    return '/'
                }
            }
        }
    ]
})

export { router };