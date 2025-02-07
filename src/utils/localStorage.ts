import { Task } from '../types/Task'

const TASKS_STORAGE_KEY = 'tasks'

export const getStoredTasks = (): Task[] => {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY)
    if (!tasksJson) return []
    
    const tasks = JSON.parse(tasksJson)
    return tasks.map((task: Task) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        createdAt: new Date(task.createdAt)
    }))
}

export const storeTasks = (tasks: Task[]): void => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
} 