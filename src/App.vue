<script setup>
// import axios from 'axios';

console.log('hello world');
const items = [{ test: 1 }]

</script>

<template>
  hello world
  <button v-for="item in items" :key="item.test">{{ item.test }}</button>
</template>

<style ></style>
