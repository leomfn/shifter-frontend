<script setup lang="ts">
import RegularSignupButton from './RegularSignupButton.vue';
import RegularSignoutButton from './RegularSignoutButton.vue';
import RegularSingleSignoutButton from './RegularSingleSignoutButton.vue';
import RegularSingleSigninButton from './RegularSingleSigninButton.vue';

import { DateTime } from 'luxon';

// TODO: Remove test variable
const curUserId = 1

const props = defineProps({
    time: Object,
    date: DateTime,
    isSignedUpRegularly: Boolean,
    isSignedUp: Boolean
})
</script>

<template>
    <div class="buttons m-2 has-addons">
        <RegularSignupButton :time="props.time" :class="{ 'is-hidden': props.isSignedUpRegularly }" />
        <RegularSingleSignoutButton :time="props.time" :date="props.date"
            :class="{ 'is-hidden': !props.isSignedUpRegularly || !props.isSignedUp }" />
        <RegularSingleSigninButton :time="props.time" :class="{ 'is-hidden': !props.isSignedUpRegularly || props.isSignedUp }" />
        <RegularSignoutButton :time="props.time" :class="{ 'is-hidden': !props.isSignedUpRegularly }" />
    </div>
</template>