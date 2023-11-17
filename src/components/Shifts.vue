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
    <div class="box">
        <ShiftDay v-for="dateShifts in nextTwoWeekShifts" class="" v-bind:dateShifts="dateShifts"></ShiftDay>
    </div>
</template>