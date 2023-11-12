<script setup>
// import axios from 'axios';
import { onMounted, ref } from 'vue';
import ShiftDay from './ShiftDay.vue';

import { useShiftStore } from "../stores/ShiftStore.ts"

const shiftStore = useShiftStore()
await shiftStore.initialize()

const nextTwoWeekShifts = shiftStore.getNextTwoWeekShifts
</script>

<template>
    <div v-for="dateShifts in nextTwoWeekShifts">
        <ShiftDay v-bind:dateShifts="dateShifts"></ShiftDay>
    </div>
</template>