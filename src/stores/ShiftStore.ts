import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { DateTime } from 'luxon';

import { getNextTwoWeeks } from '../helperFunctions';

import { type Signup } from '../types/Signup';
import { type Shift } from '../types/Shift';
import { type ShiftPerWeekday } from '../types/ShiftPerWeekday';

export const useShiftStore = defineStore('shifts', () => {
    // https://pinia.vuejs.org/core-concepts/
    // In Setup Stores:

    // ref()s become state properties
    // computed()s become getters
    // function()s become actions

    // State properties (refs)
    
    const shifts = ref<Shift[]>([]);
    const regularSignups = ref<Signup[]>([]);
    const singleSignouts = ref([]);
    const singleSignups = ref([]);
    const nextTwoWeekShifts = ref([]);

    // Actions (functions)

    const initialize = async () => {
        console.log('initializing store');
        await fetchShifts()
        await fetchRegularSignups()
        await fetchSingleSignouts()
        await fetchSingleSignups()
        computeNextTwoWeekShifts()
        console.log('shifts', shifts.value);
        console.log('regular signups', regularSignups.value);
        console.log('single signouts', singleSignouts.value);
        console.log('single signups', singleSignups.value);
        console.log('next two week shifts from store', nextTwoWeekShifts.value);
        console.log('store initialized');
    }

    const fetchShifts = async () => {
        const res = await fetch('http://localhost:8000/shifts');
        const data = await res.json();
        shifts.value = data;
    }

    const fetchRegularSignups = async () => {
        const res = await fetch('http://localhost:8000/signups/regular');
        const data = await res.json();
        regularSignups.value = data;
    }

    const fetchSingleSignouts = async () => {
        const res = await fetch('http://localhost:8000/signups/singlesignout');
        const data = await res.json();
        singleSignouts.value = data;
    }

    const fetchSingleSignups = async () => {
        const res = await fetch('http://localhost:8000/signups/single');
        const data = await res.json();
        singleSignups.value = data;
    }

    const addSignup = signup => {
        signups.value.push(signup)
    }

    const computeNextTwoWeekShifts = () => {
        let shiftsPerWeekday: ShiftPerWeekday[] = [];

        shifts.value.forEach(newShift => {
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

        const nextTwoWeekDates = getNextTwoWeeks()
        nextTwoWeekDates.forEach(date => {
            const dateShiftDay = shiftsPerWeekday.filter(day => day.day_of_week === date.weekday - 1)
            const shiftForDateExists = dateShiftDay.length > 0

            if (shiftForDateExists) {
                const shiftsPerDate = {
                    date: date,
                    times: dateShiftDay[0].times
                }

                nextTwoWeekShifts.value.push(shiftsPerDate)
            }
        })

        console.log('nextTwoWeekShifts', nextTwoWeekShifts.value);
    }

    // Getters (computed)

    const getShiftWeekdays = computed(() => {
        const shiftWeekdays: [] = [];

        shifts.value.forEach(shift => {
            if (!shiftWeekdays.includes(shift.day_of_week)) {
                shiftWeekdays.push(shift.day_of_week)
            }
        });

        console.log(shiftWeekdays);

        return shiftWeekdays
    })

    // Note you must return all state properties in setup stores for pinia to pick them
    // up as state. In other words, you cannot have private state properties in stores.

    return {
        shifts,
        regularSignups,
        singleSignouts,
        singleSignups,
        nextTwoWeekShifts,
        getShiftWeekdays,
        initialize,
        fetchShifts,
        fetchRegularSignups,
        addSignup
    }
})