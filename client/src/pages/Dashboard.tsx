import React, { useState, useEffect } from 'react'
import { Container, Title, Divider, Space, Button } from '@mantine/core'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { Task } from '../types'
import FilterDropdown from '../components/FilterDropDown'
import useAuth from '../hooks/useAuth'

const Dashboard: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: '1',
			title: 'Example Task 1',
			description: 'Description here',
			status: 'To Do',
		},
		{
			id: '2',
			title: 'Example Task 2',
			description: 'Description here',
			status: 'In Progress',
		},
	])
	const { logout } = useAuth()

	const [filter, setFilter] = useState<string>('All')
	// Load tasks from local storage on component mount
	useEffect(() => {
		const loadTasks = () => {
			const savedTasks = localStorage.getItem('tasks')
			if (savedTasks) {
				setTasks(JSON.parse(savedTasks))
			}
		}

		loadTasks()
	}, [])

	// Save tasks to local storage on tasks array change
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const handleAddTask = (newTask: Task) => {
		setTasks([...tasks, newTask])
		// Add task to backend or storage
	}

	const handleUpdateTask = (updatedTask: Task) => {
		const updatedTasks = tasks.map((task) =>
			task.id === updatedTask.id ? updatedTask : task
		)
		setTasks(updatedTasks)
		// Update task in backend or storage
	}

	const handleDeleteTask = (taskId: string) => {
		setTasks(tasks.filter((task) => task.id !== taskId))
		// Delete task from backend or storage
	}

	const filteredTasks =
		filter === 'All' ? tasks : tasks.filter((task) => task.status === filter)

	return (
		<Container size='lg' style={{ paddingTop: '20px' }}>
			<Title order={2}>Task Dashboard</Title>
			<TaskForm onAddTask={handleAddTask} />
			<Space h='md' />
			<Divider label='Tasks' labelPosition='center' />
			<FilterDropdown value={filter} onChange={setFilter} />
			<Space h='md' />
			<TaskList
				tasks={filteredTasks}
				onUpdateTask={handleUpdateTask}
				onDeleteTask={handleDeleteTask}
			/>
			<Space h='md' />
			<Button color='red' onClick={logout}>
				Logout
			</Button>
		</Container>
	)
}

export default Dashboard
