import dotenv from 'dotenv'
dotenv.config()
// No changes above this line
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'
import connectDB from './config/db'
import authRoutes from './routes/auth'
import taskRoutes from './routes/tasks'
import { protect } from './middleware/auth'

const app: Application = express()
const PORT: number | string = process.env.PORT || 3000

connectDB()
app.use(
	cors({
		origin: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
		credentials: true,
		preflightContinue: true,
	})
)
app.use(express.json())
app.use(cookieParser())

// Handle preflight requests
app.options('*', cors())

app.use('/api/auth', authRoutes)
app.use(protect)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

export default app
