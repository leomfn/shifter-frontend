<script setup>
import axios from 'axios';
import { getCurrentInstance } from 'vue';

const props = defineProps({
    time: Object
})

const shiftSignUp = (event) => {
    const shiftId = Number(event.target.attributes['shift-id'].value);

    axios.post('http://localhost:8000/signups/toggle', { user_id: curUserId, shift_id: shiftId })
        .then(res => {
            console.log(res.data);
        })
        .then(() => {
            if (props.time.signups.includes(curUserId)) {
                props.time.signups = props.time.signups.filter(user => user != curUserId)
            } else {
                props.time.signups.push(curUserId)
            }
        })
        .catch(error => {
            console.log(error.message);
        })
}

console.log('test');
console.log('time', props.time);

// TODO: Remove test
const curUserId = 1
</script>

<template>
    <div v-bind:shift-id="time.shift_id" class="shift-box" v-bind:class="{ 'user-shift': time.signups.includes(curUserId) }"
        v-on:click="shiftSignUp">
        {{ time.time_start }} - {{ time.time_end }}
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