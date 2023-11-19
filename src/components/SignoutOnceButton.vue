<script setup lang="ts">
import { defineEmits } from "vue";
import { useShiftStore } from "../stores/ShiftStore";
import { DateTime } from 'luxon';

// import { type Shift } from '../types/Shift'

const shiftStore = useShiftStore();

// TODO: Remove
const curUserId = 1;

const emit = defineEmits();

const props = defineProps({
    date: Date,
    time: Object,
    isSignedUp: Boolean
})

const shiftSignOut = async () => {
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
        // checkSignupStatus();
        emit('toggleSignedUpOnce');
        // props.isSignedUp = false;
    }
}
</script>

<template>
    <button class="button is-danger is-light" @click="shiftSignOut" :class="{ 'is-hidden': !isSignedUp }">
            Sign Out
        </button>
</template>