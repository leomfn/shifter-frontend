<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import type { DateShift } from '@/types/DateShift';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps<{
    dateShift: DateShift
}>()

const shiftStore = useShiftStore();

const { singleSignouts } = storeToRefs(shiftStore)

const singleSignin = async () => {
    try {
        const deleteId = singleSignouts.value.filter(signout => {
            return signout.shift_id === props.dateShift.id && signout.user_id === curUserId
        })[0].id

        const res = await fetch(`http://localhost:8000/signups/singlesignout/${deleteId}`, {
            method: 'DELETE'
        })

        if (res.status === 204) {
            singleSignouts.value = singleSignouts.value.filter(signout => signout.id !== deleteId)
        }
    } catch {
        console.log('Single signout can not be deleted')
    }
}
</script>

<template>
    <div class="button is-primary" @click="singleSignin">
        ✓ I can come after all
    </div>
</template>