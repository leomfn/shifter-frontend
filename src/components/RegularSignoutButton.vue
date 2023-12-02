<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';
import type { DateShift } from '@/types/DateShift';
import { useAuthStore } from '@/stores/AuthStore';

const props = defineProps<{
    dateShift: DateShift
}>()

const shiftStore = useShiftStore();
const authStore = useAuthStore();

const curUserId = authStore.currentUser?.id;

const { regularSignups } = storeToRefs(shiftStore)

const regularSignout = async () => {
    try {
        const deleteId = regularSignups.value.filter(signup => {
            return signup.shift_id === props.dateShift.id && signup.user_id === curUserId
        })[0].id

        const res = await fetch(`http://localhost:8000/signups/regular/${deleteId}`, {
            method: 'DELETE',
            headers: authStore.authHeader.headers
        })

        if (res.status === 204) {
            regularSignups.value = regularSignups.value.filter(signup => signup.id !== deleteId)
        }
    } catch {
        console.log('Not signed in regularly')
    }
}
</script>

<template>
    <div class="button is-outlined is-danger" @click="regularSignout">
        ✕ I can't make it regularly anymore
    </div>
</template>