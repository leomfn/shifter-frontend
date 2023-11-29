import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getNextTwoWeeks } from '../helperFunctions';

import type { Signup } from '../types/Signup';
import type { Shift } from '../types/Shift';
import type { ShiftPerWeekday } from '../types/ShiftPerWeekday';
import type { ShiftPerDate } from '../types/ShiftPerDate';

export const useShiftStore = defineStore('shifts', () => {
    // https://pinia.vuejs.org/core-concepts/
    // In Setup Stores:

    // ref()s become state properties
    // computed()s become getters
    // function()s become actions

    // State properties (refs)

    const shifts = ref<Shift[]>([]);
    const regularSignups = ref<Signup[]>([]);
    const singleSignouts = ref<Signup[]>([]);
    const singleSignups = ref<Signup[]>([]);
    const nextTwoWeekShifts = ref<ShiftPerDate[]>([]);

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

    const computeNextTwoWeekShifts = (): void => {
        let shiftsPerWeekday: ShiftPerWeekday[] = [];

        shifts.value.forEach(newShift => {
            console.log('shiftsPerWeekday', shiftsPerWeekday);
            console.log('newShift', newShift);
            const { day_of_week, ...day_shift } = newShift;
            console.log('day_of_week', day_of_week);
            console.log('day_shift', day_shift);
            const dayExists = shiftsPerWeekday.map(shift => shift.day_of_week).includes(day_of_week);

            if (!dayExists) {
                shiftsPerWeekday.push({
                    day_of_week: day_of_week,
                    date_shifts: [day_shift]
                })
            } else {
                shiftsPerWeekday = shiftsPerWeekday
                    .map(shift => {
                        if (shift.day_of_week === newShift.day_of_week) {
                            return {
                                times: shift.date_shifts.push(day_shift),
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
                    date_shifts: dateShiftDay[0].date_shifts
                }

                nextTwoWeekShifts.value.push(shiftsPerDate)
            }
        })
    }

    // Getters (computed)


    // Note you must return all state properties in setup stores for pinia to pick them
    // up as state. In other words, you cannot have private state properties in stores.

    return {
        shifts,
        regularSignups,
        singleSignouts,
        singleSignups,
        nextTwoWeekShifts,
        initialize,
        fetchShifts,
        fetchRegularSignups
    }
})