<script setup lang="ts">
import SingleSignupButton from './SingleSignupButton.vue';
import SingleSignoutButton from './SingleSignoutButton.vue';
import { DateTime } from 'luxon';
import type { DateShift } from '@/types/DateShift';

const props = defineProps<{
    dateShift: DateShift,
    date: DateTime,
    isSignedUpOnce: boolean
}>()
</script>

<template>
    <div class="buttons m-2 has-addons">
        <SingleSignupButton :dateShift="props.dateShift" :date="props.date" :class="{ 'is-hidden': isSignedUpOnce }" />
        <SingleSignoutButton :dateShift="props.dateShift" :class="{ 'is-hidden': !isSignedUpOnce }" />
    </div>
</template>