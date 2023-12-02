<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import { DateTime } from 'luxon';
import type { DateShift } from '@/types/DateShift';
import { useAuthStore } from '@/stores/AuthStore';

const props = defineProps<{
    date: DateTime,
    dateShift: DateShift
}>()

const shiftStore = useShiftStore();
const authStore = useAuthStore();

const curUserId = authStore.currentUser?.id;

const { singleSignouts } = storeToRefs(shiftStore)

const singleSignout = async () => {
    const newSignout = {
        "user_id": curUserId,
        "shift_id": props.dateShift.id,
        "signout_date": props.date.toFormat('yyyy-MM-dd')
    }

    const res = await fetch('http://localhost:8000/signups/singlesignout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            ...authStore.authHeader.headers
        },
        body: JSON.stringify(newSignout)
    })

    const data = await res.json()

    if (res.status === 201) {
        singleSignouts.value.push(data);
    }
}
</script>

<template>
    <div class="button is-danger" @click="singleSignout">
        ✕ I can't come this time
    </div>
</template>