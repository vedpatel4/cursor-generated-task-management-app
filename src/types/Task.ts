export type Priority = 'Low' | 'Medium' | 'High'
export type Status = 'Pending' | 'In Progress' | 'Completed'

export interface Task {
    id: string
    title: string
    description?: string
    priority: Priority
    status: Status
    dueDate?: Date
    createdAt: Date
} 