import { type Shift } from './Shift';

export interface ShiftPerWeekday {
    day_of_week: number,
    times: Shift[]
}