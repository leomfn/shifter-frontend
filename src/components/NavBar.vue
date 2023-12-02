<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
</script>

<template>
  <nav class="navbar is-white">
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
        <a class="navbar-item">
          {{ authStore.currentUser.user_name }} 🟢
        </a>
      </div>
    </div>
  </nav>
</template>