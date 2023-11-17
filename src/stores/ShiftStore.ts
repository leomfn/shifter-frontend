import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { getNextTwoWeeks } from '../helperFunctions'

export const useShiftStore = defineStore('shifts', () => {
    // https://pinia.vuejs.org/core-concepts/
    // In Setup Stores:

    // ref()s become state properties
    // computed()s become getters
    // function()s become actions

    const shifts = ref([]);
    const signups = ref([]);

    const getShiftSignupsPerWeekday = computed(() => {
        const shiftSignupsPerWeekday: [] = []
        return shiftSignupsPerWeekday
    })

    const getShiftWeekdays = computed(() => {
        const shiftWeekdays: [] = [];

        shifts.value.forEach(shift => {
            if (!shiftWeekdays.includes(shift.day_of_week)) {
                shiftWeekdays.push(shift.day_of_week)
            }
        });

        // console.log('shifts', shifts.value);
        console.log(shiftWeekdays);

        return shiftWeekdays
    })

    const getNextTwoWeekShifts = computed(() => {
        const nextTwoWeekShifts: [] = [];

        let shiftsPerWeekday: Object[] = [];

        shifts.value.forEach(newShift => {
            // console.log('newShift', newShift);
            const { day_of_week, ...times } = newShift;
            const dayExists = shiftsPerWeekday.map(shift => shift.day_of_week).includes(newShift.day_of_week);

            if (!dayExists) {
                shiftsPerWeekday.push({
                    day_of_week: newShift.day_of_week,
                    times: [times]
                })
            } else {
                shiftsPerWeekday = shiftsPerWeekday
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

        // shiftsPerWeekday = newShiftsPerWeekday;
        const dayTranslateArray = [6, 0, 1, 2, 3, 4, 5]
        // const newNextShiftsPerWeekday = []
        const nextTwoWeekDates = getNextTwoWeeks()
        // console.log(nextTwoWeekDates);
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

                nextTwoWeekShifts.push(shiftsPerDate)
            }
        })

        console.log('nextTwoWeekShifts', nextTwoWeekShifts);
        // nextShiftsPerWeekday.value = newNextShiftsPerWeekday

        return nextTwoWeekShifts
    })

    const initialize = async () => {
        console.log('initializing store');
        await fetchShifts()
        await fetchSignups()
        console.log('store initialized');
    }

    const fetchShifts = async () => {
        await fetch('http://localhost:8000/shifts')
            .then(response => response.json())
            .then(data => {
                shifts.value = data;
            })
            .catch(error => console.log(error))
    }

    const fetchSignups = async () => {
        await fetch('http://localhost:8000/signups')
            .then(response => response.json())
            .then(data => {
                signups.value = data;
            })
            .catch(error => console.log(error))
    }

    // Note you must return all state properties in setup stores for pinia to pick them
    // up as state. In other words, you cannot have private state properties in stores.

    return { shifts, signups, getNextTwoWeekShifts, getShiftSignupsPerWeekday, getShiftWeekdays, initialize, fetchShifts, fetchSignups }
})