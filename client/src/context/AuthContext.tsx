import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthContextType, User } from '../types'
import { wait } from '../utils'
import { axios } from '../axios'

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
	}, [savedUser])

	const register = async (email: string, password: string) => {
		try {
			const response = await axios('/api/auth/register', {
				data: {
					email,
					password,
				},
				method: 'post',
				withCredentials: true,
			})
			setUser(response.data)
			localStorage.setItem('currentUser', JSON.stringify(response.data))
		} catch (error: any) {
			console.error(
				'Error registering user:',
				error.response?.data?.message || error.message
			)
			throw error
		}
	}
	const login = async (email: string, password: string) => {
		try {
			const response = await axios('/api/auth/login', {
				data: { email, password },
				withCredentials: true,
				method: 'post',
			})
			setUser(response.data)
			localStorage.setItem('currentUser', JSON.stringify(response.data))
		} catch (error: any) {
			console.error(
				'Error logging in:',
				error.response?.data?.message || error.message
			)
			throw error
		}
	}

	const logout = async () => {
		try {
			await axios('/api/auth/logout', {
				method: 'post',
				withCredentials: true,
			})
			setUser(null)
			localStorage.removeItem('currentUser')
		} catch (error: any) {
			console.error(
				'Error logging out:',
				error.response?.data?.message || error.message
			)
			throw error
		}
	}
	return (
		<AuthContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	)
}
