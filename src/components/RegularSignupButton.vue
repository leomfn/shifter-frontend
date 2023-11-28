<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps({
    // date: DateTime,
    time: Object,
    isSignedUpRegularly: Boolean
})

const shiftStore = useShiftStore();

const { regularSignups } = storeToRefs(shiftStore)

// const checkRegularSignup = () => {
//     isSignedUpRegularly.value = shiftStore.checkUserSignupRegularStatus(curUserId, props.time.id)
// }

// checkRegularSignup()

const regularSignup = async () => {
    const newSignup = {
        "user_id": curUserId,
        "shift_id": props.time.id
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

const regularSignout = async () => {
    const deleteId = regularSignups.value.filter(signup => {
        return signup.shift_id === props.time.id && signup.user_id === curUserId
    })[0].id

    const res = await fetch(`http://localhost:8000/signups/regular/${deleteId}`, {
        method: 'DELETE'
    })

    if (res.status === 204) {
        console.log('deletion successful');
        regularSignups.value = regularSignups.value.filter(signup => signup.id !== deleteId)
    }
}
</script>

<template>
    <div class="button is-outlined is-light" @click="props.isSignedUpRegularly ? regularSignout() : regularSignup()">
        ∞
    </div>
</template>