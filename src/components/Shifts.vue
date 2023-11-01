<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import ShiftDay from './ShiftDay.vue';

const shifts = ref([]);
const shiftsPerWeekday = ref([]);

onMounted(async () => {
    axios
        .get('http://localhost:8000/shifts')
        .then(res => {
            shifts.value = res.data;
            let newShiftsPerWeekday = [];

            res.data.forEach(newShift => {
                const { day_of_week, ...times } = newShift;
                const dayExists = newShiftsPerWeekday.map(shift => shift.day_of_week).includes(newShift.day_of_week);

                if (!dayExists) {
                    newShiftsPerWeekday.push({
                        day_of_week: newShift.day_of_week,
                        times: [times]
                    })
                } else {
                    newShiftsPerWeekday = newShiftsPerWeekday
                        .map(shift => {
                            if (shift.day_of_week === newShift.day_of_week) {
                                return {
                                    times: shift.times.push(times),
                                    ...shift
                                }
                            } else {
                                return shift;
                            }
                        })
                }
            })

            shiftsPerWeekday.value = newShiftsPerWeekday;
        })
})
</script>

<template>
    <div v-for="dayShifts in shiftsPerWeekday">
        <ShiftDay v-bind:dayShifts="dayShifts"></ShiftDay>
    </div>
</template>