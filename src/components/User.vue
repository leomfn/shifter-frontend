<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

onMounted(async () => {
    // TODO: Remove test
    const curUserId = 1

    axios
        .get('http://localhost:8000/users/')
        .then(res => {
            console.log(res.data);
        })
})



</script>

<template>
</template>