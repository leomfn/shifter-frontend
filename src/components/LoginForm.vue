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
    <div class="hero is-full-height">

        <div class="hero-body">
            <div class="columns is-centered">
                <div class="box">

                    <div class="notification subtitle">Login to <strong>⚙️ shifter</strong></div>

                    <form @submit.prevent="submitLogin">
                        <div class="field">
                            <label class="label">
                                Username
                            </label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="text" placeholder="Enter Username" v-model="username" />
                                <span class="icon is-small is-left">
                                    <i class="bi bi-person"></i>
                                </span>
                                <!-- <span class="icon is-small is-right">
                                    <i class="bi bi-check"></i>
                                </span> -->
                            </div>
                            <!-- <p class="help is-success">This username is available</p> -->
                        </div>


                        <div class="field">
                            <label class="label">
                                Password
                            </label>
                            <div class="control has-icons-left has-icons-right">
                                <input class="input" type="password" placeholder="Enter Password" v-model="password" />
                                <span class="icon is-small is-left">
                                    <i class="bi bi-key"></i>
                                </span>
                                <!-- <span class="icon is-small is-right">
                                    <i class="bi bi-x"></i>
                                </span> -->
                            </div>
                            <!-- <p class="help is-danger">Password invalid</p> -->
                        </div>

                        <div class="control">
                            <div class="buttons">
                                <button class="button is-primary">
                                    Submit
                                </button>
                                <div class="button">
                                    Create Account
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>