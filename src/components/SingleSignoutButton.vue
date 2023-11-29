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

const { singleSignups } = storeToRefs(shiftStore)

const singleSignout = async () => {
    try {
        const deleteId = singleSignups.value.filter(signup => {
            return signup.shift_id === props.dateShift.id && signup.user_id === curUserId
        })[0].id

        const res = await fetch(`http://localhost:8000/signups/single/${deleteId}`, {
            method: 'DELETE'
        })

        if (res.status === 204) {
            singleSignups.value = singleSignups.value.filter(signup => signup.id !== deleteId)
        }
    } catch {
        console.log('Single signup can not be deleted')
    }
}
</script>

<template>
    <div class="button is-danger" @click="singleSignout">
        ✕ I can't make it
    </div>
</template>