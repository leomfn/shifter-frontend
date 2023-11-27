<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { DateTime } from 'luxon';
import { ref, defineEmits } from 'vue';

const emit = defineEmits();

// TODO: remove
const curUserId = 1;

const props = defineProps({
    date: Date,
    time: Object,
    isSignedUpOnce: Boolean
})

const shiftStore = useShiftStore();

const SignupOnce = async () => {
    const newSignup = {
        "user_id": curUserId,
        "shift_id": props.time.id,
        "type": "once",
        "date_once": DateTime.fromJSDate(props.date).toFormat('yyyy-MM-dd')
    }

    const res = await fetch('http://localhost:8000/signups', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newSignup)
    })

    const data = await res.json()

    console.log('signup response data:', data);

    if (res.status === 200) {
        shiftStore.signups.push(data);
        emit('toggleSignedUpOnce');
    }
}

const SignoutOnce = async () => {
    const deleteSignup = shiftStore.signups.filter(signup => {
        return signup.shift_id === props.time.id && signup.user_id === curUserId && signup.date_once === DateTime.fromJSDate(props.date).toFormat('yyyy-MM-dd') && signup.type === 'once'
    })[0]

    const deleteId = deleteSignup.id

    const res = await fetch(`http://localhost:8000/signups/${deleteId}`, {
        method: 'DELETE'
    })

    if (res.status === 200) {
        const indexToRemove = shiftStore.signups.indexOf(deleteSignup)
        shiftStore.signups.splice(indexToRemove, 1);
        emit('toggleSignedUpOnce');
    }
}
</script>

<template>
    <div class="button is-outlined is-light" @click="props.isSignedUpOnce ? SignoutOnce() : SignupOnce()">
        1x
    </div>
</template>