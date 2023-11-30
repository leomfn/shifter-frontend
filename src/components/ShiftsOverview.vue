<script setup lang="ts">
import ShiftDay from './ShiftDay.vue';

import { useShiftStore } from "@/stores/ShiftStore"
import { useUsersStore } from '@/stores/UserStore';

const shiftStore = useShiftStore();
await shiftStore.initialize();

const userStore = useUsersStore();
await userStore.initialize();

const nextTwoWeekShifts = shiftStore.nextTwoWeekShifts;
</script>

<template>
    <div class="">
        <ShiftDay v-for="(shiftsPerDate, index) in nextTwoWeekShifts" :key="`shiftday-${index}`"
            :shifts-per-date="shiftsPerDate"></ShiftDay>
    </div>
</template>