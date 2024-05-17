// src/routes/auth.ts
import { Router, Request, Response } from 'express'
import User, { IUser } from '../models/userModel'
import { protect } from '../middleware/auth'

const router = Router()
// Register a new user
router.post('/register', async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const userExists = await User.findOne({ email })
		if (userExists) {
			res.status(400).json({ message: 'User already exists' })
			return
		}

		const user = new User({
			email,
			password,
		})

		await user.save()

		res.cookie('userId', user._id, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
		res.status(201).json(user)
	} catch (error: any) {
		res
			.status(500)
			.json({ message: 'Error registering new user', error: error.message })
	}
})

// User login
router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })
		if (!user || !(await user.comparePassword(password))) {
			res.status(401).json({ message: 'Invalid email or password' })
			return
		}

		res.cookie('userId', user._id, {
			httpOnly: false,
			secure: false,
			// secure: process.env.NODE_ENV === 'production',
		})
		res.status(200).json(user)
	} catch (error: any) {
		res.status(500).json({ message: 'Error logging in', error: error.message })
	}
})

// User logout
router.post('/logout', async (req: Request, res: Response) => {
	res.clearCookie('userId')
	res.status(200).json({ message: 'User logged out successfully' })
})

export default router
