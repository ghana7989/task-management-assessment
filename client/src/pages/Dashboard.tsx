import { Button, Container, Divider, Space, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import FilterDropdown from '../components/FilterDropDown'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import useAuth from '../hooks/useAuth'
import useTaskManager from '../hooks/useTaskManager'
import { Task } from '../types'

const Dashboard: React.FC = () => {
	const { logout } = useAuth()
	const { fetchTasks, tasks, createTask, deleteTask, updateTask } =
		useTaskManager()
	console.log('🚀 ------------------🚀')
	console.log('🚀 ~ tasks:', tasks)
	console.log('🚀 ------------------🚀')

	const [filter, setFilter] = useState<string>('All')
	// Load tasks from local storage on component mount
	useEffect(() => {
		fetchTasks()
	}, [])

	// Save tasks to local storage on tasks array change
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const handleAddTask = (newTask: Task) => {
		createTask(newTask)
	}

	const handleUpdateTask = (updatedTask: Task) => {
		updateTask(updatedTask.id, updatedTask)
	}

	const handleDeleteTask = (taskId: string) => {
		deleteTask(taskId)
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
				tasks={filteredTasks as Task[]}
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
