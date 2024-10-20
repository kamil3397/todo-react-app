export enum TaskCategory {
    Personal = 'personal',
    Work = 'work',
    Family = 'family',
    Other = 'other'
}
export type ListItem = {
    userId: string;
    _id: string;
    title: string;
    description: string;
    category: TaskCategory,
    status: 'completed' | 'in-progress' | "active";
    startDate: string,
    endDate: string,
    createdAt: string,
    completedAt: string
    completionTime: string | null
}

export type RegistrationData = {
    email: string;
    name: string;
    surname: string;
    phone?: string | null,
    password: string;
    terms: boolean;
}

export type LoginInputs = {
    email?: string,
    password: string,
}
export type LogourData = {
    _id: string,
}

export type UserType = {
    email: string
    name: string
    surname: string,
    _id: string
    phone: string
    role: UserRoles
}
export type EditUserType = {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    password?: string,
    phone?: string | null
}

export type TaskItem = {
    userId: string;
    _id: string;
    title: string;
    description: string;
    category: TaskCategory,
    status: 'completed' | 'in-progress' | "active";
}

export enum UserRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EMPLOYEE = 'employee'
}

// powinnismy miec rozne pliki dla roznych typow typow
// nazwa pliku to ListTypes
// jak do Listy ma sie np UserRoles, TaskItem czy EditUserType?
// SOLID - Interface Segregation Principle!!!