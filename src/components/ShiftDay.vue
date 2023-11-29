<script setup lang="ts">
import ShiftTime from './ShiftTime.vue';
import { ref } from 'vue';
import { DateTime } from 'luxon';


const showOptions = ref(false);

const props = defineProps({
    dateShifts: Object
})

const showOptionsOnMouseOver = () => {
    showOptions.value = true;
}

const hideOptionsOnMouseLeave = () => {
    showOptions.value = false;
}
</script>

<template>
    <div class="columns box my-2" @mouseover="showOptionsOnMouseOver" @mouseleave="hideOptionsOnMouseLeave">
        <div class="column is-2">
            <div class="is-size-3">
                {{ props.dateShifts.date.weekdayLong }}
            </div>
            <div>
                {{ props.dateShifts.date.toLocaleString(DateTime.DATE_MED) }}
            </div>
        </div>
        <div class="column">
            <ShiftTime v-for="time in props.dateShifts.times" :key="`id-${time.id}-${props.dateShifts.date}`" :time="time"
                :date="props.dateShifts.date" :showOptions="showOptions"></ShiftTime>
        </div>
    </div>
</template>