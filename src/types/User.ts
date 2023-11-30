export interface User {
    id: number;
    email: string;
    member_status: 'member' | 'helper';
    is_active: boolean;
}