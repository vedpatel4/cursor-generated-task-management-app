import { useState } from 'react'
import { Task } from '../types/Task'
import { TaskForm } from './TaskForm'
import { format } from 'date-fns'

interface TaskItemProps {
    task: Task
    onUpdate: (taskId: string, updates: Partial<Task>) => void
    onDelete: (taskId: string) => void
}

export const TaskItem = ({ task, onUpdate, onDelete }: TaskItemProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'High': return 'text-red-600 dark:text-red-400'
            case 'Medium': return 'text-yellow-600 dark:text-yellow-400'
            case 'Low': return 'text-green-600 dark:text-green-400'
        }
    }

    const getStatusColor = (status: Task['status']) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
            case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
            case 'Pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
        }
    }

    if (isEditing) {
        return (
            <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
                <TaskForm
                    onSubmit={(updates) => {
                        onUpdate(task.id, updates)
                        setIsEditing(false)
                    }}
                    initialValues={task}
                    isEditing={true}
                />
                <button
                    onClick={() => setIsEditing(false)}
                    className="mt-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    Cancel
                </button>
            </div>
        )
    }

    return (
        <div className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                    {task.description && (
                        <p className="mt-1 text-gray-600 dark:text-gray-400">{task.description}</p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                            {task.status}
                        </span>
                        {task.dueDate && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Due: {format(task.dueDate, 'MMM d, yyyy')}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
} 