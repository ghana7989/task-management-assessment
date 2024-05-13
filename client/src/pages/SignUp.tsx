import {
	Button,
	Container,
	Group,
	Paper,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Signup: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { login, user } = useAuth() // Assuming login function also handles signup
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user])
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		login(email, password) // In a real scenario, replace this with a signup function
		navigate('/dashboard') // Redirect to dashboard after signup
	}

	return (
		<Container size='xs' style={{ marginTop: '20%' }}>
			<Paper p='md' shadow='sm'>
				<form onSubmit={handleSubmit}>
					<Title ta='center' style={{ marginBottom: '20px' }}>
						Sign Up
					</Title>
					<TextInput
						label='Email'
						placeholder='Enter your email'
						value={email}
						onChange={(event) => setEmail(event.currentTarget.value)}
						required
					/>
					<TextInput
						label='Password'
						placeholder='Enter your password'
						type='password'
						value={password}
						onChange={(event) => setPassword(event.currentTarget.value)}
						required
					/>
					<Group align='right' style={{ marginTop: '20px' }}>
						<Button type='submit'>Sign Up</Button>
					</Group>
				</form>
			</Paper>
			<Text ta='center' size='sm' style={{ marginTop: '10px' }}>
				Already have an account?{' '}
				<Text
					component='a'
					href='/login'
					size='sm'
					style={{ textDecoration: 'underline' }}
				>
					Log in
				</Text>
			</Text>
		</Container>
	)
}

export default Signup
