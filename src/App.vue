<script setup lang="ts">
import ShiftsOverview from "./components/ShiftsOverview.vue"
</script>

<template>
  <div class="">
    <h1 class="title is-1">⚙️ shifter</h1>
    <Suspense>
      <template #default>
        <ShiftsOverview />
      </template>
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>