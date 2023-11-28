<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';

// const isSignedUpRegularly = ref(false);

// const emit = defineEmits();

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

    console.log('signup response data:', data);

    if (res.status === 201) {
        console.log('updating regularSignups in store');
        console.log('before:', regularSignups.value);
        regularSignups.value.push(data);
        console.log('after:', regularSignups.value);
    }
}

const regularSignout = async () => {
    const deleteSignup = shiftStore.signups.filter(signup => {
        return signup.shift_id === props.time.id && signup.user_id === curUserId && signup.type === 'regular'
    })[0]

    const deleteId = deleteSignup.id

    const res = await fetch(`http://localhost:8000/signups/regular/${deleteId}`, {
        method: 'DELETE'
    })

    if (res.status === 200) {
        const indexToRemove = shiftStore.signups.indexOf(deleteSignup)
        shiftStore.signups.splice(indexToRemove, 1);
        // emit('toggleSignedUpRegular');
    }
}
</script>

<template>
    <div class="button is-outlined is-light" @click="props.isSignedUpRegularly ? regularSignout() : regularSignup()">
        ∞
    </div>
</template>