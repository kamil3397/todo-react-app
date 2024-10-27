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



export type TaskItem = {
    userId: string;
    _id: string;
    title: string;
    description: string;
    category: TaskCategory,
    status: 'completed' | 'in-progress' | "active";
}