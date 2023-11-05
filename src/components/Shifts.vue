<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import ShiftDay from './ShiftDay.vue';

let shiftsPerWeekday = [];
const shifts = [];
const nextShiftsPerWeekday = ref([]);

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

            shiftsPerWeekday = newShiftsPerWeekday;
        })
        .then(() => {
            const dayTranslateArray = [6, 0, 1, 2, 3, 4, 5]
            const newNextShiftsPerWeekday = []
            const nextTwoWeekDates = getNextTwoWeeks()
            nextTwoWeekDates.forEach(date => {
                // console.log(shiftsPerWeekday);
                const dateShiftDay = shiftsPerWeekday.filter(day => day.day_of_week === dayTranslateArray[date.getDay()])
                const shiftForDateExists = dateShiftDay.length > 0
                // console.log('dateShiftTimes', dateShiftTimes);

                if (shiftForDateExists) {
                    const shiftsPerDate = {
                        date: date,
                        times: dateShiftDay[0].times
                    }

                    newNextShiftsPerWeekday.push(shiftsPerDate)
                }
            })

            nextShiftsPerWeekday.value = newNextShiftsPerWeekday
        })
})

const getNextTwoWeeks = () => {
    const today = new Date();
    const currentDate = today.getDate();
    const nextWeeks = [];

    for (let i = 0; i < 14; i++) {
        const newDate = new Date(today)
        newDate.setDate(currentDate + i);
        nextWeeks.push(newDate);
    }

    return nextWeeks
}
</script>

<template>
    <div v-for="dateShifts in nextShiftsPerWeekday">
        <ShiftDay v-bind:dateShifts="dateShifts"></ShiftDay>
    </div>
</template>