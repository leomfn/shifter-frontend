<script setup lang="ts">
import Shifts from "./components/Shifts.vue"
</script>

<template>
  <div class="">
    <h1 class="title is-1">⚙️ shifter</h1>
    <Suspense>
      <template #default>
        <Shifts></Shifts>
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>