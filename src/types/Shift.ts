export interface Shift {
    day_of_week: number;
    time_start: string;
    time_end: string;
    date_start: string | null;
    is_active: boolean;
    id: number;
}