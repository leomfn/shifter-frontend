import type { DateTime } from 'luxon';
import type { DateShift } from './DateShift';

export interface ShiftPerDate {
    date: DateTime;
    date_shifts: DateShift[];
}