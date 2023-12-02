<script setup lang="ts">
import ShiftDay from '../components/ShiftDay.vue';
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';

import { useShiftStore } from "@/stores/ShiftStore"
import { useUsersStore } from '@/stores/UserStore';
// import { useAuthStore } from '@/stores/AuthStore';

// const authStore = useAuthStore();
// await authStore.initialize();

const shiftStore = useShiftStore();
await shiftStore.initialize();

const userStore = useUsersStore();
await userStore.initialize();

const nextTwoWeekShifts = shiftStore.nextTwoWeekShifts;
</script>

<template>
    <NavBar />

    <div class="container p-4">
        <div class="">
            <ShiftDay v-for="(shiftsPerDate, index) in nextTwoWeekShifts" :key="`shiftday-${index}`"
                :shifts-per-date="shiftsPerDate"></ShiftDay>
        </div>
    </div>

    <Footer />
</template>