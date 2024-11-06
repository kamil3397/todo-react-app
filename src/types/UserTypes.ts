export type RegisterData = {
    email: string;
    name: string;
    surname: string;
    phone?: string | null,
    password: string;
    terms: boolean;
}

export type LoginData = {
    email?: string,
    password: string,
}
export type LogoutData = {
    _id: string,
}

export enum UserRoles {
    ADMIN = 'admin',
    MANAGER = 'manager',
    EMPLOYEE = 'employee'
}

export type UserType = {
    _id: string
    email: string
    password?: string,
    name: string
    surname: string,
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