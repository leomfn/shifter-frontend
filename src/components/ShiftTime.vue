<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useShiftStore } from "../stores/ShiftStore.ts";
import { DateTime } from 'luxon';
import SignupOptions from "./SignupOptions.vue"
import SignoutButton from "./SignoutButton.vue"

const shiftStore = useShiftStore();

const props = defineProps({
    time: Object,
    date: Date
})

const isSignedUp = ref(false)

const checkSignupStatus = () => {
    const signups = shiftStore.signups;
    const dateString = `${props.date.getFullYear()}-${(props.date.getMonth() + 1).toString().padStart(2, '0')}-${props.date.getDate().toString().padStart(2, '0')}`
    const shiftSignups = signups.filter(signup => signup.shift_id === props.time.id);
    const userSignups = shiftSignups.filter(signup => signup.user_id === curUserId);

    const userIsSignedUpOnce = userSignups.filter(signup => signup.type === 'once' && signup.date_once === dateString).length === 1;

    isSignedUp.value = userIsSignedUpOnce
}

checkSignupStatus()

const shiftSignUpOnce = async () => {
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
        checkSignupStatus();
    }
}

const shiftSignOut = async () => {
    const deleteSignup = shiftStore.signups.filter(signup => {
        return signup.shift_id === props.time.id && signup.user_id === curUserId && signup.date_once === DateTime.fromJSDate(props.date).toFormat('yyyy-MM-dd')
    })[0]

    const deleteId = deleteSignup.id

    const res = await fetch(`http://localhost:8000/signups/${deleteId}`, {
        method: 'DELETE'
    })

    if (res.status === 200) {
        const indexToRemove = shiftStore.signups.indexOf(deleteSignup)
        shiftStore.signups.splice(indexToRemove, 1);
        checkSignupStatus();
    }
}

// TODO: Remove test variable
const curUserId = 1
</script>

<template>
    <div class="buttons has-addons m-2">
        <button class="button is-light" v-bind:class="{ 'is-primary': isSignedUp }" @click="shiftSignUpOnce">
            {{ time.time_start.split(':', 2).join(':') }} - {{ time.time_end.split(':', 2).join(':') }}
        </button>
        <SignoutButton @click="shiftSignOut" :class="{ 'is-hidden': !isSignedUp }" />
    </div>
</template>

<style>
.shift-box {
    border: solid 1px black;
    border-radius: 5px;
    background-color: antiquewhite;
    display: flex;
    justify-content: center;
    padding: 1rem;
    /* margin: 0 0 0 0.1rem; */
    margin-left: 0.2rem;
}

.shift-box:hover {
    background-color: cornsilk;
    cursor: pointer;
}

.user-shift {
    background-color: lightseagreen;
    color: white;
    /* border-color: darkcyan; */
    /* border-width: 3px; */
}

.user-shift:hover {
    background-color: rgba(32, 178, 171, 0.8);
}
</style>