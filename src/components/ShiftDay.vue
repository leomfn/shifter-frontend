<script setup lang="ts">
import ShiftTime from './ShiftTime.vue';
import { ref } from 'vue';
import { DateTime } from 'luxon';
import type { ShiftPerDate } from '@/types/ShiftPerDate';

const showOptions = ref(false);

const props = defineProps<{
    shiftsPerDate: ShiftPerDate
}>()

const showOptionsOnMouseOver = () => {
    showOptions.value = true;
}

const hideOptionsOnMouseLeave = () => {
    showOptions.value = false;
}

const toggleShowOptions = () => {
    showOptions.value = !showOptions.value
}
</script>

<template>
    <!-- <div class="columns box my-2" @mouseover="showOptionsOnMouseOver" @mouseleave="hideOptionsOnMouseLeave"> -->
    <!-- <div class="columns box my-2" @click="toggleShowOptions"> -->
    <div class="columns box my-2">
        <div class="column is-2">
            <div class="is-size-3">
                {{ props.shiftsPerDate.date.weekdayLong }}
            </div>
            <div>
                {{ props.shiftsPerDate.date.toLocaleString(DateTime.DATE_MED) }}
            </div>
        </div>
        <div class="column">
            <ShiftTime v-for="dateShift in props.shiftsPerDate.date_shifts"
                :key="`id-${dateShift.id}-${props.shiftsPerDate.date}`" :date-shift="dateShift"
                :date="props.shiftsPerDate.date" :show-options="showOptions"></ShiftTime>
        </div>
    </div>
</template>