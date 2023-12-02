<script setup lang="ts">
import { router } from '@/router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
    router.push('/login');
}
</script>

<template>
    <nav class="navbar is-spaced">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <h1 class="title">⚙️ shifter</h1>
            </a>

            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>


        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item">
                    Sign up for shifts
                </a>
                <!-- <a class="navbar-item">
          Manage shifts
        </a> -->
            </div>

            <div class="navbar-end">
                <a class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        {{ authStore.currentUser.user_name }} 🟢
                    </a>
                    <div class="navbar-dropdown is-right">
                        <a class="navbar-item" @click="logout">
                            Logout
                        </a>
                        <!-- <a class="navbar-item">
                            Settings
                        </a> -->
                    </div>
                </a>
            </div>
        </div>
    </nav>
</template>