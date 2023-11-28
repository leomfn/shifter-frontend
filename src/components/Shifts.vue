<script setup>
import ShiftDay from './ShiftDay.vue';

import { useShiftStore } from "../stores/ShiftStore.ts"

const shiftStore = useShiftStore()
await shiftStore.initialize()

const nextTwoWeekShifts = shiftStore.getNextTwoWeekShifts
</script>

<template>
    <div class="">
        <ShiftDay v-for="(dateShifts, index) in nextTwoWeekShifts" :key="`shiftday-${index}`" :dateShifts="dateShifts"></ShiftDay>
    </div>
</template>