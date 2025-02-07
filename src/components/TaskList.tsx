import { Task, Status } from '../types/Task'
import { TaskItem } from './TaskItem'

interface TaskListProps {
    tasks: Task[]
    onUpdateTask: (taskId: string, updates: Partial<Task>) => void
    onDeleteTask: (taskId: string) => void
    statusFilter: Status | 'All'
    setStatusFilter: (status: Status | 'All') => void
    sortBy: 'dueDate' | 'priority'
    setSortBy: (sort: 'dueDate' | 'priority') => void
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export const TaskList = ({
    tasks,
    onUpdateTask,
    onDeleteTask,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
}: TaskListProps) => {
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'priority')}
                        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    >
                        <option value="dueDate">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No tasks found. Create a new task to get started!
                    </div>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onUpdate={onUpdateTask}
                            onDelete={onDeleteTask}
                        />
                    ))
                )}
            </div>
        </div>
    )
} 