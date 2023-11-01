<script setup>
import ShiftTime from './ShiftTime.vue';

const weekdays = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}

const props = defineProps({
    dayShifts: Object
})
</script>

<template>
    <div class="day-box">
        <div class="weekday">
            {{ weekdays[dayShifts.day_of_week] }}
        </div>
        <div v-for="time in dayShifts.times">
            <ShiftTime v-bind:time="time"></ShiftTime>
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