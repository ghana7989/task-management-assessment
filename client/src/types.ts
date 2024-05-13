export interface User {
	email: string
}

export interface AuthContextType {
	user: User | null
	login: (email: string, password: string) => void
	logout: () => void
}

export interface Task {
	id: string
	title: string
	description: string
	status: string
}
