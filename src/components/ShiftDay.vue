<script setup lang="ts">
import ShiftTime from './ShiftTime.vue';
import { onMounted, ref } from 'vue';
import { DateTime } from 'luxon';


const showOptions = ref(false);

// const weekdays = {
//     6: "Sunday",
//     0: "Monday",
//     1: "Tuesday",
//     2: "Wednesday",
//     3: "Thursday",
//     4: "Friday",
//     5: "Saturday"
// }

// const dayTranslateArray = [6, 0, 1, 2, 3, 4, 5]

const props = defineProps({
    dateShifts: Object
})

onMounted(() => {
    console.log('dateShifts', props.dateShifts);
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
                <!-- {{ weekdays[dayTranslateArray[dateShifts.date.getDay()]] }} -->
                {{ dateShifts.date.weekdayLong }}
            </div>
            <div>
                <!-- {{ dateShifts.date.toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' }) }} -->
                {{ dateShifts.date.toLocaleString(DateTime.DATE_MED) }}
            </div>
        </div>
        <div class="column">
            <!-- <ShiftTime v-for="time in dateShifts.times" :key="`id-${time.id}-${dateShifts.date}`" v-bind:time="time"
                v-bind:date="dateShifts.date" :showOptions="showOptions"></ShiftTime> -->
        </div>
    </div>
</template>