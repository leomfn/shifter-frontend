<script setup lang="ts">
import SingleSignupButton from './SingleSignupButton.vue';

import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// TODO: Remove test variable
const curUserId = 1

const props = defineProps({
    time: Object
})

const shiftStore = useShiftStore();

// const { regularSignups } = storeToRefs(shiftStore)

// const shiftRegularSignupUsers = computed(() => {
//     return regularSignups.value
//         .filter(signup => signup.shift_id === props.time.id)
//         .reduce((userArray, signup) => {
//             userArray.push(signup.user_id)
//             return userArray
//         }, [])
// })

// const isSignedUpRegularly = computed(() => {
//     return shiftRegularSignupUsers.value.includes(curUserId)
// })
</script>

<template>
    <div class="buttons m-2 has-addons">
        <SingleSignupButton :time="props.time" :class="{ 'is-hidden': false }" />
    </div>
</template>