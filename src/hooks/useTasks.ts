import { useState, useEffect } from 'react'
import { Task, Status} from '../types/Task'
import { getStoredTasks, storeTasks } from '../utils/localStorage'

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate')

    // Load tasks from localStorage on initial render
    useEffect(() => {
        const storedTasks = getStoredTasks()
        setTasks(storedTasks)
    }, [])

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        storeTasks(tasks)
        filterTasks()
    }, [tasks, statusFilter, searchQuery, sortBy])

    const filterTasks = () => {
        let filtered = [...tasks]

        // Apply status filter
        if (statusFilter !== 'All') {
            filtered = filtered.filter(task => task.status === statusFilter)
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Apply sorting
        filtered.sort((a, b) => {
            if (sortBy === 'dueDate') {
                if (!a.dueDate) return 1
                if (!b.dueDate) return -1
                return a.dueDate.getTime() - b.dueDate.getTime()
            } else {
                const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 }
                return priorityWeight[b.priority] - priorityWeight[a.priority]
            }
        })

        setFilteredTasks(filtered)
    }

    const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
        const newTask: Task = {
            ...task,
            id: crypto.randomUUID(),
            createdAt: new Date()
        }
        setTasks(prev => [...prev, newTask])
    }

    const updateTask = (taskId: string, updates: Partial<Task>) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, ...updates } : task
        ))
    }

    const deleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(task => task.id !== taskId))
    }

    return {
        tasks: filteredTasks,
        addTask,
        updateTask,
        deleteTask,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy
    }
} 