<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import SignupRegular from './SignupRegular.vue';

const props = defineProps({
    time: Object,
    date: Date,
    signups: Array
})

const isSignedUp = ref(false)

onMounted(async () => {
    console.log('mounted ShiftTime component');
    const dateString = `${props.date.getFullYear()}-${(props.date.getMonth() + 1).toString().padStart(2, '0')}-${props.date.getDate().toString().padStart(2, '0')}`

    const shiftSignups = props.signups.filter(signup => signup.shift_id === props.time.id);

    const userSignups = shiftSignups.filter(signup => signup.user_id === curUserId);

    const userIsSignedUp = userSignups.length > 0;
    const userIsSignedUpOnce = userSignups.filter(signup => signup.type === 'once' && signup.date_once === dateString).length === 1;

    isSignedUp.value = userIsSignedUpOnce

})

const shiftSignUp = (event) => {
    // const shiftId = Number(event.target.attributes['shift-id'].value);
    // console.log('clicked shift id', shiftId);
    console.log('clicked, event', event.target);

    // axios.post('http://localhost:8000/signups/toggle', { user_id: curUserId, shift_id: shiftId })
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .then(() => {
    //         if (props.time.signups.includes(curUserId)) {
    //             props.time.signups = props.time.signups.filter(user => user != curUserId)
    //         } else {
    //             props.time.signups.push(curUserId)
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error.message);
    //     })
}

console.log('time_start', typeof (props.time));

// TODO: Remove test variable
const curUserId = 1
</script>

<template>
    <div v-bind:shift-id="time.shift_id" class="shift-box" v-bind:class="{ 'user-shift': isSignedUp }"
        v-on:click="shiftSignUp">
        {{ time.time_start.split(':', 2).join(':') }} - {{ time.time_end.split(':', 2).join(':') }}
    </div>
    <SignupRegular></SignupRegular>
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