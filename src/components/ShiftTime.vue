<script setup lang="ts">
import { computed } from 'vue';
import { useShiftStore } from "../stores/ShiftStore";
import { DateTime } from 'luxon';
import RegularSignupGroup from './RegularSignupGroup.vue';
import SingleSignupGroup from './SingleSignupGroup.vue';
import { storeToRefs } from 'pinia';
import type { DateShift } from '@/types/DateShift';

const shiftStore = useShiftStore();

const { regularSignups, singleSignouts, singleSignups } = storeToRefs(shiftStore)

// TODO: Remove test variable
const curUserId = 1

const props = defineProps<{
    dateShift: DateShift,
    date: DateTime,
    showOptions: boolean
}>()

const shiftRegularSignupUsers = computed(() => {
    return regularSignups.value
        .filter(signup => signup.shift_id === props.dateShift.id)
        .reduce((userArray: number[], signup) => {
            userArray.push(signup.user_id)
            return userArray
        }, [])
})

const shiftSingleSignupUsers = computed(() => {
    return singleSignups.value
        .filter(signup => signup.shift_id === props.dateShift.id && signup.signup_date === props.date.toFormat('yyyy-MM-dd'))
        .reduce((userArray: number[], signup) => {
            userArray.push(signup.user_id)
            return userArray
        }, [])
})

const isSignedUpRegularly = computed(() => {
    return shiftRegularSignupUsers.value.includes(curUserId)
})

const isSignedUpOnce = computed(() => {
    return shiftSingleSignupUsers.value.includes(curUserId)
})

const isSignedUp = computed(() => {
    const isSignedOut = singleSignouts.value.filter(signout => {
        return signout.user_id === curUserId && signout.shift_id === props.dateShift.id && signout.signout_date === props.date.toFormat('yyyy-MM-dd')
    }).length > 0

    return !isSignedOut && (isSignedUpRegularly.value === true || isSignedUpOnce.value === true)
})
</script>

<template>
    <div class="buttons m-2 is-grouped">
        <button class="button" v-bind:class="{ 'is-primary': isSignedUp }">
            {{ dateShift.time_start.split(':', 2).join(':') }} - {{ dateShift.time_end.split(':', 2).join(':') }}
        </button>
        <RegularSignupGroup :dateShift="props.dateShift" :date="props.date" :is-signed-up-regularly="isSignedUpRegularly"
            :is-signed-up="isSignedUp" />
        <SingleSignupGroup :dateShift="props.dateShift" :date="props.date" :class="{ 'is-hidden': isSignedUpRegularly }"
            :is-signed-up-once="isSignedUpOnce" />
    </div>
</template>