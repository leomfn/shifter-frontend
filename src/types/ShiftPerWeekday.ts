import type { DateShift } from './DateShift';

export interface ShiftPerWeekday {
    day_of_week: number;
    date_shifts: DateShift[];
}