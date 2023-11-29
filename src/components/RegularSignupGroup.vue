<script setup lang="ts">
import RegularSignupButton from './RegularSignupButton.vue';
import RegularSignoutButton from './RegularSignoutButton.vue';
import RegularSignupIndicator from './RegularSignupIndicator.vue';
import RegularSingleSignoutButton from './RegularSingleSignoutButton.vue';

import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// TODO: Remove test variable
const curUserId = 1

const props = defineProps({
    time: Object,
    isSignedUpRegularly: Boolean
})
</script>

<template>
    <div class="buttons m-2 has-addons">
        <!-- <RegularSignupIndicator :class="{ 'is-primary': isSignedUpRegularly, 'is-light': false }" /> -->
        <RegularSignupButton :time="props.time" :class="{ 'is-hidden': props.isSignedUpRegularly }" />
        <RegularSingleSignoutButton :class="{ 'is-hidden': !props.isSignedUpRegularly }" />
        <RegularSignoutButton :time="props.time" :class="{ 'is-hidden': !props.isSignedUpRegularly }" />
    </div>
</template>