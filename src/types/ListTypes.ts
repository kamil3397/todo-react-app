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
}

export type RegistrationData = {
    email: string;
    name: string;
    surname: string;
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
    _id?: string
}
export type EditUserType = {
    _id?: string,
    name: string,
    surname: string,
    email: string,
    password?: string,
}