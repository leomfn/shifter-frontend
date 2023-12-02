<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { router } from '@/router';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');

const submitLogin = async () => {
    const formData = new FormData();
    formData.append('username', username.value)
    formData.append('password', password.value)

    const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        body: formData
    })

    if (res.status === 200) {
        const data = await res.json()
        localStorage.setItem('token', data.access_token);
        await authStore.initialize();
        router.push('/');
    }
}
</script>

<template>
    <div class="container">
        <div class="notification title is-primary">
            Login
        </div>

        <form @submit.prevent="submitLogin">
            <div class="container box">
                <div class="field">
                    <label class="label">
                        Username
                    </label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Enter Username" v-model="username" />
                        <span class="icon is-small is-left">
                            <i class="bi bi-person"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="bi bi-check"></i>
                        </span>
                    </div>
                    <p class="help is-success">This username is available</p>
                </div>


                <div class="field">
                    <label class="label">
                        Password
                    </label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-danger" type="password" placeholder="Enter Password" v-model="password" />
                        <span class="icon is-small is-left">
                            <i class="bi bi-key"></i>
                        </span>
                        <span class="icon is-small is-right">
                            <i class="bi bi-x"></i>
                        </span>
                    </div>
                    <p class="help is-danger">Password invalid</p>
                </div>

                <div class="control">
                    <button class="button is-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>