<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import type { DateShift } from '@/types/DateShift';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps<{
    dateShift: DateShift,
    date: DateTime
}>()

const shiftStore = useShiftStore();

const { singleSignups } = storeToRefs(shiftStore)

const singleSignup = async () => {
    const newSignup = {
        "user_id": curUserId,
        "shift_id": props.dateShift.id,
        "signup_date": props.date.toFormat('yyyy-MM-dd')
    }

    const res = await fetch('http://localhost:8000/signups/single', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSignup)
    })

    const data = await res.json()

    if (res.status === 201) {
        singleSignups.value.push(data);
    }
}
</script>

<template>
    <div class="button is-outlined is-primary" @click="singleSignup">
        ✓ Sign in once
    </div>
</template>