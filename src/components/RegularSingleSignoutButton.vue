<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import { DateTime } from 'luxon';

// // TODO: remove
const curUserId = 1;

const props = defineProps({
    date: DateTime,
    time: Object
})

const shiftStore = useShiftStore();

const { singleSignouts } = storeToRefs(shiftStore)

const singleSignout = async () => {
    const newSignout = {
        "user_id": curUserId,
        "shift_id": props.time.id,
        "signout_date": props.date.toFormat('yyyy-MM-dd')
    }

    const res = await fetch('http://localhost:8000/signups/singlesignout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
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