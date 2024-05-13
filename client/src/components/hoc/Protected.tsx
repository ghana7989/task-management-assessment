import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Protected = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth()
	if (user === undefined) return null
	return user ? <>{children}</> : <Navigate to='/login' />
}

export default Protected
