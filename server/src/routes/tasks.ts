import { Router, Response } from 'express'
import Task, { ITask } from '../models/taskModel'
import { Request } from '../global-types'

const router = Router()

// GET all tasks
router.get('/', async (req: Request, res: Response) => {
	const userId = req.cookies.userId

	const tasks = await Task.find(
		{ owner: userId },
		{ title: 1, description: 1, status: 1 }
	)
	res.json(tasks)
})

// POST a new task
router.post('/', async (req: Request, res: Response) => {
	try {
		const owner = req.cookies.userId
		const { title, description, status } = req.body
		const newTask = new Task({
			title,
			description,
			status,
			owner,
		})

		await newTask.save()
		res.status(201).json(newTask)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

router.put('/:id', async (req: Request, res: Response) => {
	try {
		const userId = req.cookies.userId
		const { id } = req.params
		const { title, description, status } = req.body

		const updatedTask = await Task.findOneAndUpdate(
			{ _id: id, owner: userId },
			{ title, description, status },
			{ new: true }
		)

		if (!updatedTask) {
			return res.status(404).json({ error: 'Task not found' })
		}

		res.json(updatedTask)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

// DELETE a task
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const userId = req.cookies.userId
		const { id } = req.params

		const deletedTask = await Task.findOneAndDelete({ _id: id, owner: userId })

		if (!deletedTask) {
			return res.status(404).json({ error: 'Task not found' })
		}

		res.json({ message: 'Task deleted successfully' })
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})

// GET tasks by status
router.get('/filter/:status', async (req: Request, res: Response) => {
	try {
		const userId = req.cookies.userId
		const { status } = req.params

		let query: any = { owner: userId }
		if (status !== 'all') {
			query.status = status
		}

		const tasks = await Task.find(query, {
			title: 1,
			description: 1,
			status: 1,
		})

		res.json(tasks)
	} catch (error: any) {
		res.status(400).json({ error: error.message })
	}
})
export default router
