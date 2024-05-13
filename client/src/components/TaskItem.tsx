import { ActionIcon, Card, Group, Select, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { Task } from '../types'

interface TaskItemProps {
	task: Task
	onUpdateTask: (task: Task) => void
	onDeleteTask: (taskId: string) => void
}

const TaskItem: React.FC<TaskItemProps> = ({
	task,
	onUpdateTask,
	onDeleteTask,
}) => {
	const handleStatusChange = (status: string) => {
		onUpdateTask({ ...task, status })
	}

	return (
		<Card shadow='sm' p='lg' radius='md' withBorder>
			<Text w={500} size='lg'>
				{task.title}
			</Text>
			<Text size='sm' style={{ marginBottom: 10 }}>
				{task.description}
			</Text>
			<Select
				label='Status'
				value={task.status}
				onChange={(value) => {
					if (typeof value === 'string') handleStatusChange(value)
				}}
				data={['To Do', 'In Progress', 'Done']}
			/>
			<Group justify='apart' style={{ marginTop: 10 }}>
				<ActionIcon bg='red'>
					<IconTrash
						size={24}
						onClick={() => onDeleteTask(task.id)}
						color='white'
					/>
				</ActionIcon>
			</Group>
		</Card>
	)
}

export default TaskItem
