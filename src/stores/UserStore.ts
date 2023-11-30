import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('users', () => {
    const users = ref([]);

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:8000/users');
        const data = await res.json();
        users.value = data;
    }

    const initialize = async () => {
        await fetchUsers();
        console.log('users', users.value);
    }

    const getMembers = computed(() => {
        return users.value
            .filter(user => user.member_status === 'member')
            .map(user => user.id)
    })

    const getHelpers = computed(() => {
        return users.value
            .filter(user => user.member_status === 'helper')
            .map(user => user.id)
    })

    return {
        users,
        initialize,
        getMembers,
        getHelpers
    }
})