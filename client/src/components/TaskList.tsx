import React, { Fragment } from 'react'

import { Space } from '@mantine/core'

import { Task } from '../types'
import TaskItem from './TaskItem'

interface TaskListProps {
	tasks: Task[]
	onUpdateTask: (task: Task) => void
	onDeleteTask: (taskId: string) => void
}

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	onUpdateTask,
	onDeleteTask,
}) => {
	return (
		<div>
			{tasks.map((task, idx) => {
				const isLast = idx === tasks.length - 1
				return (
					<Fragment key={task.id}>
						<TaskItem
							task={task}
							onUpdateTask={onUpdateTask}
							onDeleteTask={onDeleteTask}
						/>
						{!isLast && <Space h={10} />}
					</Fragment>
				)
			})}
		</div>
	)
}

export default TaskList
