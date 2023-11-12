<script setup>
import ShiftTime from './ShiftTime.vue';
import { useShiftStore } from "../stores/ShiftStore.ts"

const shiftStore = useShiftStore();

const weekdays = {
    6: "Sunday",
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday"
}

const dayTranslateArray = [6, 0, 1, 2, 3, 4, 5]

defineProps({
    dateShifts: Object,
    // signups: Array
})

// const signups = shiftStore.signups;

// console.log('dateShifts', props.dateShifts);
</script>

<template>
    <div class="day-box">
        <div class="weekday">
            <div>
                {{ weekdays[dayTranslateArray[dateShifts.date.getDay()]] }}
            </div>
            <div>
                {{ dateShifts.date.toLocaleDateString('de-DE', { day: 'numeric', month: 'numeric' }) }}
            </div>
        </div>
        <div v-for="time in dateShifts.times">
            <ShiftTime v-bind:time="time" v-bind:date="dateShifts.date"></ShiftTime>
        </div>
    </div>
</template>

<style>
.day-box {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: row;
    margin-bottom: 1rem;
}

.weekday {
    border: solid 1px black;
    border-radius: 5px;
    background-color: azure;
    padding: 1rem;
    min-width: 7rem;
    text-align: center;
}
</style>