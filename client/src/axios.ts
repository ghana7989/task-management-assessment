import a from 'axios'

export const axios = a.create({
	baseURL: 'http://localhost:3005',
	withCredentials: true,
})
