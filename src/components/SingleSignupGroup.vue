<script setup lang="ts">
import SingleSignupButton from './SingleSignupButton.vue';

import { useShiftStore } from '@/stores/ShiftStore';
import SingleSignoutButton from './SingleSignoutButton.vue';
import { DateTime } from 'luxon';

const props = defineProps({
    time: Object,
    date: DateTime,
    isSignedUpOnce: Boolean
})
</script>

<template>
    <div class="buttons m-2 has-addons">
        <SingleSignupButton :time="props.time" :date="props.date" :class="{ 'is-hidden': isSignedUpOnce }" />
        <SingleSignoutButton :time="props.time" :class="{ 'is-hidden': !isSignedUpOnce }" />
    </div>
</template>