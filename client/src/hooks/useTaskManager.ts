import { useCallback, useState } from 'react'
import { axios } from '../axios'

interface Task {
	_id?: string
	title: string
	description: string
	status: string
}

const useTaskManager = () => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	const fetchTasks = useCallback(async (statusFilter: string | null) => {
		setLoading(true)
		try {
			let url = '/api/tasks'
			if (statusFilter && statusFilter !== 'all') {
				url = `/api/tasks/filter/${statusFilter}`
			}
			const response = await axios(url, {
				withCredentials: true,
				method: 'get',
			})
			setTasks(response.data as Task[])
		} catch (err: any) {
			setError(err.response?.data?.error || err.message)
		} finally {
			setLoading(false)
		}
	}, [])

	const createTask = useCallback(async (task: Task) => {
		setLoading(true)
		try {
			const response = await axios('/api/tasks', {
				data: task,
				withCredentials: true,
				method: 'post',
			})
			setTasks((prevTasks) => [...prevTasks, response.data])
		} catch (err: any) {
			setError(err.response?.data?.error || err.message)
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const updateTask = useCallback(async (id: string, updatedTask: Task) => {
		setLoading(true)
		try {
			const response = await axios(`/api/tasks/${id}`, {
				data: updatedTask,
				withCredentials: true,
				method: 'put',
			})
			setTasks((prevTasks) =>
				prevTasks.map((task) => (task._id === id ? response.data : task))
			)
		} catch (err: any) {
			setError(err.response?.data?.error || err.message)
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const deleteTask = useCallback(async (id: string) => {
		setLoading(true)
		try {
			await axios(`/api/tasks/${id}`, {
				withCredentials: true,
				method: 'delete',
			})
			fetchTasks(null)
		} catch (err: any) {
			setError(err.response?.data?.error || err.message)
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		tasks,
		fetchTasks,
		createTask,
		updateTask,
		deleteTask,
		error,
		loading,
	}
}

export default useTaskManager
