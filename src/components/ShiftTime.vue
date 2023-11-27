<script setup lang="ts">
// import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useShiftStore } from "../stores/ShiftStore";
import { DateTime } from 'luxon';
// import SignupOptions from "./SignupOptions.vue"
import SignupOnceButton from "./SignupOnceButton.vue"
import SignoutOnceButton from "./SignoutOnceButton.vue"
import RegularSignupButton from "./RegularSignupButton.vue"
import SignupOptions from './SignupOptions.vue';

const shiftStore = useShiftStore();

// TODO: Remove test variable
const curUserId = 1

const props = defineProps({
    time: Object,
    date: Date,
    showOptions: Boolean
})

const isSignedUp = ref(false)

const isSignedUpRegularly = ref(false)

const checkRegularSignup = () => {
    isSignedUpRegularly.value = shiftStore.checkUserSignupRegularStatus(curUserId, props.time.id)
}

checkRegularSignup()

const checkSignupStatus = () => {
    isSignedUp.value = shiftStore.checkUserSignupOnceStatus(curUserId, props.time.id, props.date)
}

checkSignupStatus()

const toggleSignedUpOnce = async () => {
    isSignedUp.value = !isSignedUp.value
}

const toggleSignedUpRegular = async () => {
    isSignedUpRegularly.value = !isSignedUpRegularly.value
}
</script>

<template>
    <div class="buttons m-2">
        <button class="button" v-bind:class="{ 'is-primary': isSignedUp }">
            {{ time.time_start.split(':', 2).join(':') }} - {{ time.time_end.split(':', 2).join(':') }}
        </button>
        <div :class="{ 'is-hidden': !showOptions }">
            <!-- <SignupOptions></SignupOptions> -->
        </div>
        <SignupOnceButton :date="date" :time="time" :isSignedUpOnce="isSignedUp"
            :class="{ 'is-primary': !isSignedUp, 'is-danger': isSignedUp }"
            @toggleSignedUpOnce="toggleSignedUpOnce" />
        <!-- <SignoutOnceButton :date="date" :time="time" :isSignedUp="isSignedUp" @toggleSignedUpOnce="toggleSignedUpOnce" /> -->
        <RegularSignupButton :date="date" :time="time" :isSignedUpRegularly="isSignedUpRegularly"
            :class="{ 'is-primary': !isSignedUpRegularly, 'is-danger': isSignedUpRegularly }"
            @toggleSignedUpRegular="toggleSignedUpRegular" />
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