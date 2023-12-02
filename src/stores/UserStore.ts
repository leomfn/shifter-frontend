import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from './AuthStore';

import type { User } from '@/types/User';

export const useUsersStore = defineStore('users', () => {
    const authStore = useAuthStore();

    const users = ref([]);

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:8000/users', authStore.authHeader);
        const data = await res.json();
        users.value = data;
    }

    const initialize = async () => {
        await fetchUsers();
    }

    const getMembers = computed(() => {
        return users.value
            .filter((user: User) => user.member_status === 'member')
            .map((user: User) => user.id)
    })

    const getHelpers = computed(() => {
        return users.value
            .filter((user: User) => user.member_status === 'helper')
            .map((user: User) => user.id)
    })

    return {
        users,
        initialize,
        getMembers,
        getHelpers
    }
})