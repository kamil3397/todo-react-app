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

export enum UserRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EMPLOYEE = 'employee'
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