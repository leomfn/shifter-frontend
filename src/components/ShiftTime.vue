<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useShiftStore } from "../stores/ShiftStore";
import { DateTime } from 'luxon';
// import SignupOptions from "./SignupOptions.vue"
import SignupOnceButton from "./SignupOnceButton.vue"
import SignoutOnceButton from "./SignoutOnceButton.vue"
import RegularSignupButton from "./RegularSignupButton.vue"
import SignupOptions from './SignupOptions.vue';
import RegularSignupGroup from './RegularSignupGroup.vue';
import SingleSignupGroup from './SingleSignupGroup.vue';
import { storeToRefs } from 'pinia';

const shiftStore = useShiftStore();

const { regularSignups, singleSignouts } = storeToRefs(shiftStore)

// TODO: Remove test variable
const curUserId = 1

const props = defineProps({
    time: Object,
    date: DateTime,
    showOptions: Boolean
})

// const isSignedUp = ref(false)
// const isSignedUpRegularly = ref(false)

// const shiftRegularSignupUsers = computed(() => {
//     return regularSignups.value
//         .filter(signup => signup.shift_id === props.time.id)
//         .reduce((userArray, signup) => {
//             userArray.push(signup.user_id)
//             return userArray
//         }, [])
// })

// console.log('shiftRegularSignupUsers', shiftRegularSignupUsers);

// const isSignedUp = shiftRegularSignupUsers.value.includes(curUserId)
// const isSignedUpRegularly = computed(() => {
//     return shiftRegularSignupUsers.value.includes(curUserId)
// })

// const checkRegularSignup = () => {
//     isSignedUpRegularly.value = shiftStore.checkUserSignupRegularStatus(curUserId, props.time.id)
// }

// checkRegularSignup()

// const checkSignupStatus = () => {
//     isSignedUp.value = shiftStore.checkUserSignupOnceStatus(curUserId, props.time.id, props.date)
// }

// checkSignupStatus()

// const toggleSignedUpOnce = async () => {
//     isSignedUp.value = !isSignedUp.value
// }

// const toggleSignedUpRegular = async () => {
//     isSignedUpRegularly.value = !isSignedUpRegularly.value
// }


const shiftRegularSignupUsers = computed(() => {
    return regularSignups.value
        .filter(signup => signup.shift_id === props.time.id)
        .reduce((userArray, signup) => {
            userArray.push(signup.user_id)
            return userArray
        }, [])
})

const isSignedUpRegularly = computed(() => {
    return shiftRegularSignupUsers.value.includes(curUserId)
})

const isSignedUp = computed(() => {
    const isSignedOut = singleSignouts.value.filter(signout => {
        // console.log('cur shift id', props.time.id);
        // console.log('cur date', props.date);
        // console.log('signout', signout);
        return signout.user_id === curUserId && signout.shift_id === props.time.id && signout.signout_date === props.date.toFormat('yyyy-MM-dd')
    }).length > 0

    console.log('isSignedOut', isSignedOut);

    return !isSignedOut && isSignedUpRegularly.value === true
})

console.log('isSignedUpRegularly', isSignedUpRegularly.value);
console.log('isSignedUp', isSignedUp.value);
</script>

<template>
    <div class="buttons m-2 is-grouped">
        <button class="button" v-bind:class="{ 'is-primary': isSignedUp }">
            {{ time.time_start.split(':', 2).join(':') }} - {{ time.time_end.split(':', 2).join(':') }}
        </button>
        <!-- <div :class="{ 'is-hidden': !showOptions }">
            <SignupOptions></SignupOptions>
        </div> -->
        <!-- <SignupOnceButton :date="date" :time="time" :isSignedUpOnce="isSignedUp"
            :class="{ 'is-primary': !isSignedUp, 'is-danger': isSignedUp }"
            @toggleSignedUpOnce="toggleSignedUpOnce" /> -->
        <!-- <SignoutOnceButton :date="date" :time="time" :isSignedUp="isSignedUp" @toggleSignedUpOnce="toggleSignedUpOnce" /> -->
        <!-- <RegularSignupButton :time="props.time" :isSignedUpRegularly="isSignedUpRegularly"
            :class="{ 'is-primary': !isSignedUpRegularly, 'is-danger': isSignedUpRegularly }" /> -->
        <RegularSignupGroup :time="props.time" :date="props.date" :is-signed-up-regularly="isSignedUpRegularly" :is-signed-up="isSignedUp" />
        <SingleSignupGroup :time="props.time" :class="{ 'is-hidden': isSignedUpRegularly }" />
    </div>
</template>