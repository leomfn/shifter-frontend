// import { DateTime } from 'luxon';

export const getNextTwoWeeks = () => {
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