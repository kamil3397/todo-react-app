export type ListItem = {
    userId: string;
    _id: string;
    title: string;
    description: string;
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