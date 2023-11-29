<script setup lang="ts">
import { useShiftStore } from '@/stores/ShiftStore';
import { storeToRefs } from 'pinia';

// TODO: remove
const curUserId = 1;

const props = defineProps({
    time: Object,
})

const shiftStore = useShiftStore();

const { singleSignups } = storeToRefs(shiftStore)

const singleSignout = async () => {
    console.log('trying to delete single signup');
    console.log(singleSignups.value.filter(signup => {
        return signup.shift_id === props.time.id && signup.user_id === curUserId
    })[0].id);
    try {
        const deleteId = singleSignups.value.filter(signup => {
            return signup.shift_id === props.time.id && signup.user_id === curUserId
        })[0].id

        const res = await fetch(`http://localhost:8000/signups/single/${deleteId}`, {
            method: 'DELETE'
        })

        if (res.status === 204) {
            console.log('deletion successful');
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