import { useState } from 'react'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'

function App() {
    const {
        tasks,
        addTask,
        updateTask,
        deleteTask,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy
    } = useTasks()

    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Task Management
                        </h1>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                            {isDarkMode ? '🌞 Light' : '🌙 Dark'}
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Add New Task
                            </h2>
                            <TaskForm onSubmit={addTask} />
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Tasks
                            </h2>
                            <TaskList
                                tasks={tasks}
                                onUpdateTask={updateTask}
                                onDeleteTask={deleteTask}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App 