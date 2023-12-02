<script setup lang="ts">
import { computed, ref } from 'vue';
import { useShiftStore } from "../stores/ShiftStore";
import { DateTime } from 'luxon';
import RegularSignupGroup from './RegularSignupGroup.vue';
import SingleSignupGroup from './SingleSignupGroup.vue';
import { storeToRefs } from 'pinia';
import type { DateShift } from '@/types/DateShift';
import type { SignedupUsers } from '@/types/SignedupUsers';
import SignedUpUsersIndicator from './SignedUpUsersIndicator.vue';
import { useUsersStore } from '@/stores/UserStore';
import { useAuthStore } from '@/stores/AuthStore';

const shiftStore = useShiftStore();
const userStore = useUsersStore();
const authStore = useAuthStore();

const curUserId = authStore.currentUser?.id;

const { regularSignups, singleSignouts, singleSignups } = storeToRefs(shiftStore)

const props = defineProps<{
    dateShift: DateShift,
    date: DateTime,
    // showOptions: boolean
}>()

const showOptions = ref(false);

const shiftRegularSignupUsers = computed(() => {
    return regularSignups.value
        .filter(signup => signup.shift_id === props.dateShift.id)
        .reduce((userArray: number[], signup) => {
            userArray.push(signup.user_id)
            return userArray
        }, [])
})

const shiftSingleSignoutUsers = computed(() => {
    return singleSignouts.value
        .filter(signout => signout.shift_id === props.dateShift.id && signout.signout_date === props.date.toFormat('yyyy-MM-dd'))
        .reduce((userArray: number[], signout) => {
            userArray.push(signout.user_id)
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

const getCurrentlySignedUpUsers = (): SignedupUsers => {
    const signedUpUserIds = [...shiftRegularSignupUsers.value, ...shiftSingleSignupUsers.value]
        .filter((user, index, array) => {
            const isUnique = array.indexOf(user) === index;
            const isSignedOut = shiftSingleSignoutUsers.value.includes(user);
            return isUnique && !isSignedOut
        })

    return {
        members: signedUpUserIds.filter(id => userStore.getMembers.includes(id)),
        helpers: signedUpUserIds.filter(id => userStore.getHelpers.includes(id))
    }
}

const toggleShowOptions = () => {
    showOptions.value = !showOptions.value;
}
</script>

<template>
    <div class="block">
        <div class="button is-fullwidth is-medium my-1 is-justify-content-space-between"
            :class="{ 'is-primary': isSignedUp }" @click="toggleShowOptions">
            <div class="is-flex is-align-items-center">
                <div>
                    {{ dateShift.time_start.split(':', 2).join(':') }} - {{ dateShift.time_end.split(':', 2).join(':') }}
                </div>
                <!-- <div> -->
                <div class="mx-2 is-flex is-align-items-center">
                    <span class="tag is-light is-rounded" :class="{ 'is-hidden': !isSignedUpOnce }">
                        <span class="icon">
                            <i class="bi bi-check2"></i>
                        </span>
                    </span>
                    <span class="tag is-light is-rounded" :class="{ 'is-hidden': !isSignedUpRegularly, 'is-danger': !isSignedUp }">
                        <span class="icon">
                            <i class="bi bi-repeat"></i>
                        </span>
                    </span>
                </div>
            </div>
            <!-- </div> -->
            <span class="icon">
                <i class="bi" :class="showOptions ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
            </span>
        </div>
        <SignedUpUsersIndicator :signed-up-users="getCurrentlySignedUpUsers()" />
        <div class="buttons m-0" :class="{ 'is-hidden': !showOptions }">
            <RegularSignupGroup :dateShift="props.dateShift" :date="props.date"
                :is-signed-up-regularly="isSignedUpRegularly" :is-signed-up="isSignedUp" />
            <SingleSignupGroup :dateShift="props.dateShift" :date="props.date" :class="{ 'is-hidden': isSignedUpRegularly }"
                :is-signed-up-once="isSignedUpOnce" />
        </div>
    </div>
</template>