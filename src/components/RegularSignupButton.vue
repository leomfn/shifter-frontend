<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import type { DateShift } from '@/types/DateShift';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps<{
    dateShift: DateShift
}>()

const shiftStore = useShiftStore();

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