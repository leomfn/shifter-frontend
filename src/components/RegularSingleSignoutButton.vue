<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import { DateTime } from 'luxon';

// // TODO: remove
const curUserId = 1;

const props = defineProps({
    date: DateTime,
    time: Object
    // isSignedUpRegularly: Boolean
})

const shiftStore = useShiftStore();

const { singleSignouts } = storeToRefs(shiftStore)

// const regularSignout = async () => {
//     try {
//         const deleteId = regularSignups.value.filter(signup => {
//             return signup.shift_id === props.time.id && signup.user_id === curUserId
//         })[0].id

//         const res = await fetch(`http://localhost:8000/signups/regular/${deleteId}`, {
//             method: 'DELETE'
//         })

//         if (res.status === 204) {
//             console.log('deletion successful');
//             regularSignups.value = regularSignups.value.filter(signup => signup.id !== deleteId)
//         }
//     } catch {
//         console.log('Not signed in regularly')
//     }
// }

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