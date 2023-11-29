<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps({
    time: Object,
    isSignedUpRegularly: Boolean
})

const shiftStore = useShiftStore();

const { regularSignups } = storeToRefs(shiftStore)

const regularSignout = async () => {
    try {
        const deleteId = regularSignups.value.filter(signup => {
            return signup.shift_id === props.time.id && signup.user_id === curUserId
        })[0].id

        const res = await fetch(`http://localhost:8000/signups/regular/${deleteId}`, {
            method: 'DELETE'
        })

        if (res.status === 204) {
            console.log('deletion successful');
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