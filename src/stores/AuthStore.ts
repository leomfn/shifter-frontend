import type { User } from "@/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const userIsLoggedIn = ref(false);
    const currentUser = ref<User>();
    const authHeader = ref({});

    const setAuthHeader = () => {
        const token = localStorage.getItem('token');
        authHeader.value = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    const setLoginFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            userIsLoggedIn.value = true;
            setAuthHeader();
        }
    }

    const fetchCurrentUser = async () => {
        const res = await fetch('http://localhost:8000/users/me', authHeader.value);

        if (res.status === 200) {
            const data = await res.json();
            currentUser.value = data;
        }
    }

    const initialize = async () => {
        setLoginFromToken()
        await fetchCurrentUser()
    }

    const setLoggedIn = () => {
        userIsLoggedIn.value = true;
    }

    return {
        userIsLoggedIn,
        currentUser,
        authHeader,
        initialize,
        setLoggedIn
    }
})