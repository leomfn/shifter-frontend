<script setup lang="ts">
import ShiftDay from './ShiftDay.vue';

import { useShiftStore } from "../stores/ShiftStore"

const shiftStore = useShiftStore()
await shiftStore.initialize()

const nextTwoWeekShifts = shiftStore.nextTwoWeekShifts
</script>

<template>
    <div class="">
        <ShiftDay v-for="(shiftsPerDate, index) in nextTwoWeekShifts" :key="`shiftday-${index}`" :shifts-per-date="shiftsPerDate"></ShiftDay>
    </div>
</template>