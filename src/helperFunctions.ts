import { DateTime } from 'luxon';

export const getNextTwoWeeks = () => {
    const today = DateTime.now();

    const nextTwoWeeks = []
    for (let i = 0; i < 14; i++) {
        nextTwoWeeks.push(today.plus({ day: i }))
    }

    return nextTwoWeeks
}