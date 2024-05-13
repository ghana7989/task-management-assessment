import React, { useState } from 'react'
import { TextInput, Select, Button, Group, Paper } from '@mantine/core'
import { Task } from '../types' // Assume a Task type is defined in your types file

interface TaskFormProps {
	onAddTask: (task: Task) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [status, setStatus] = useState('To Do')

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!title) return // Simple validation

		const newTask: Task = {
			id: Date.now().toString(), // simplistic ID generation
			title,
			description,
			status,
		}

		onAddTask(newTask)
		setTitle('')
		setDescription('')
		setStatus('To Do')
	}

	return (
		<Paper withBorder shadow='xs' p='md' radius='md'>
			<form onSubmit={handleSubmit}>
				<TextInput
					label='Title'
					placeholder='Enter task title'
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
					required
				/>
				<TextInput
					label='Description'
					placeholder='Enter task description'
					value={description}
					onChange={(e) => setDescription(e.currentTarget.value)}
				/>
				<Select
					label='Status'
					placeholder='Select status'
					value={status}
					onChange={(value) => {
						if (typeof value === 'string') setStatus(value)
					}}
					data={['To Do', 'In Progress', 'Done']}
				/>
				<Group justify='right' mt='md'>
					<Button type='submit'>Add Task</Button>
				</Group>
			</form>
		</Paper>
	)
}

export default TaskForm
