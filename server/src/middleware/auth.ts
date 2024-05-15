import { NextFunction, Response } from 'express'
import { Request } from '../global-types'

export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = req.cookies.userId
		if (!userId) {
			throw new Error()
		}
		next()
	} catch (error) {
		res.status(401).send({ error: 'UnAuthorized! Please authenticate.' })
	}
}
