<script setup lang="ts">
import { useAuthStore } from './stores/AuthStore';

const authStore = useAuthStore();
authStore.initialize();
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>