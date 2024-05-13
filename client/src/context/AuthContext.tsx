import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthContextType, User } from '../types'
import { wait } from '../utils'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const savedUser = localStorage.getItem('currentUser')
	wait(1000)
	// Load user from local storage when component mounts
	useEffect(() => {
		if (savedUser) {
			setUser(JSON.parse(savedUser))
		}
	}, [])

	const login = (email: string, password: string) => {
		const loggedInUser = { email, password }
		setUser(loggedInUser)

		localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
	}

	const logout = () => {
		// Implement your logout logic here
		setUser(null)
		localStorage.removeItem('currentUser')
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
