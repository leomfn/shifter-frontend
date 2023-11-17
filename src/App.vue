<script setup>
import NewShift from "./components/NewShift.vue";
import Shifts from "./components/Shifts.vue"
// import User from "./components/User.vue";
</script>

<template>
  <div class="title">
    <div class="title-icon">⚙️</div>
    <div>shifter</div>
  </div>
  <Suspense>
    <template #default>
      <Shifts></Shifts>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <NewShift></NewShift>
</template>

<style>
.title {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  color: darkcyan;
  font-size: 2rem;
}

.title-icon {
  animation: spin 30s linear infinite;
  margin: 0.5rem;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

body {
  font-family: 'Courier New', Courier, monospace;
}
</style>
