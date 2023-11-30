<script setup lang="ts">
import RegularSignupButton from './RegularSignupButton.vue';
import RegularSignoutButton from './RegularSignoutButton.vue';
import RegularSingleSignoutButton from './RegularSingleSignoutButton.vue';
import RegularSingleSigninButton from './RegularSingleSigninButton.vue';

import { DateTime } from 'luxon';
import type { DateShift } from '@/types/DateShift';

const props = defineProps<{
    dateShift: DateShift,
    date: DateTime,
    isSignedUpRegularly: boolean,
    isSignedUp: boolean
}>()
</script>

<template>
    <div>
        <RegularSignupButton :dateShift="props.dateShift" :class="{ 'is-hidden': props.isSignedUpRegularly }" />
        <RegularSingleSignoutButton :dateShift="props.dateShift" :date="props.date"
            :class="{ 'is-hidden': !props.isSignedUpRegularly || !props.isSignedUp }" />
        <RegularSingleSigninButton :dateShift="props.dateShift"
            :class="{ 'is-hidden': !props.isSignedUpRegularly || props.isSignedUp }" />
        <RegularSignoutButton :dateShift="props.dateShift" :class="{ 'is-hidden': !props.isSignedUpRegularly }" />
    </div>
</template>