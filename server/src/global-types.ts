import { Document, HydratedDocument } from 'mongoose'
import User, { IUser } from './models/userModel'
import { Request as ExpressReq } from 'express'

export interface Request extends ExpressReq {
	user?: HydratedDocument<typeof User>
	cookies: {
		userId: string
	}
}
