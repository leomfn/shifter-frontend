<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useShiftStore } from '@/stores/ShiftStore';
import type { DateShift } from '@/types/DateShift';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    dateShift: DateShift
}>()

const shiftStore = useShiftStore();
const authStore = useAuthStore();

const curUserId = authStore.currentUser?.id;

const { regularSignups } = storeToRefs(shiftStore)

const regularSignup = async () => {
    const newSignup = {
        "user_id": curUserId,
        "shift_id": props.dateShift.id
    }

    const res = await fetch('http://localhost:8000/signups/regular', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...authStore.authHeader.headers
        },
        body: JSON.stringify(newSignup)
    })

    const data = await res.json()

    if (res.status === 201) {
        regularSignups.value.push(data);
    }
}
</script>

<template>
    <div class="button is-outlined is-primary" @click="regularSignup()">
        ∞ Sign in regularly
    </div>
</template>