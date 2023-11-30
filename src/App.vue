<script setup lang="ts">
import ShiftsOverview from "./components/ShiftsOverview.vue"
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
        <a class="navbar-item">
          Manage shifts
        </a>
      </div>

      <div class="navbar-end">
        <a class="navbar-item">
          User 🔵
        </a>
      </div>
    </div>
  </nav>
  <div class="container p-4">
    <Suspense>
      <template #default>
        <ShiftsOverview />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
  <div class="footer">
    <div class="columns has-text-centered">
      <div class="column">
        Shifter 2023
      </div>
      <div class="column">
        <a href="https://github.com/leomfn/shifter-frontend" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>