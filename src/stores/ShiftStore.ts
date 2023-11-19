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

    const shifts = ref<Shift[]>([]);
    const signups = ref<Signup[]>([]);
    // const userSignups = ref([]);

    const getShiftSignupsPerWeekday = computed(() => {
        const shiftSignupsPerWeekday: [] = []
        return shiftSignupsPerWeekday
    })

    const checkUserSignupOnceStatus = (user_id: number, shift_id: number, date: Date): boolean => {
        const dateString = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
        const shiftSignups = signups.value.filter(signup => signup.shift_id === shift_id);
        const userSignups = shiftSignups.filter(signup => signup.user_id === user_id);

        const userIsSignedUpOnce = userSignups.filter(signup => signup.type === 'once' && signup.date_once === dateString).length === 1;

        return userIsSignedUpOnce
    }

    const checkUserSignupRegularStatus = (user_id: number, shift_id: number): boolean => {
        const shiftSignups = signups.value.filter(signup => signup.shift_id === shift_id);
        const userSignups = shiftSignups.filter(signup => signup.user_id === user_id);

        const userIsSignedUpRegular = userSignups.filter(signup => signup.type === 'regular').length === 1;

        return userIsSignedUpRegular
    }

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

    const getNextTwoWeekShifts = computed(() => {
        const nextTwoWeekShifts: [] = [];

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

        const dayTranslateArray = [6, 0, 1, 2, 3, 4, 5]
        const nextTwoWeekDates = getNextTwoWeeks()
        nextTwoWeekDates.forEach(date => {
            const dateShiftDay = shiftsPerWeekday.filter(day => day.day_of_week === dayTranslateArray[date.getDay()])
            const shiftForDateExists = dateShiftDay.length > 0

            if (shiftForDateExists) {
                const shiftsPerDate = {
                    date: date,
                    times: dateShiftDay[0].times
                }

                nextTwoWeekShifts.push(shiftsPerDate)
            }
        })

        // console.log('nextTwoWeekShifts', nextTwoWeekShifts);

        return nextTwoWeekShifts
    })

    const initialize = async () => {
        console.log('initializing store');
        await fetchShifts()
        await fetchSignups()
        console.log('shifts', shifts.value);
        console.log('signups', signups.value);
        console.log('store initialized');
    }

    const fetchShifts = async () => {
        const res = await fetch('http://localhost:8000/shifts');
        const data = await res.json();
        shifts.value = data;
    }

    const fetchSignups = async () => {
        const res = await fetch('http://localhost:8000/signups');
        const data = await res.json();
        signups.value = data;
    }

    const addSignup = signup => {
        signups.value.push(signup)
    }

    // Note you must return all state properties in setup stores for pinia to pick them
    // up as state. In other words, you cannot have private state properties in stores.

    return {
        shifts,
        signups,
        getNextTwoWeekShifts,
        getShiftSignupsPerWeekday,
        getShiftWeekdays,
        checkUserSignupOnceStatus,
        checkUserSignupRegularStatus,
        initialize,
        fetchShifts,
        fetchSignups,
        addSignup
    }
})