import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TextInput,
	Button,
	Paper,
	Title,
	Container,
	Group,
	Text,
} from '@mantine/core'
import useAuth from '../hooks/useAuth'

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { login, user } = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			navigate('/dashboard')
		}
	}, [user])
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		login(email, password)
		navigate('/dashboard')
	}

	return (
		<Container size='xs' style={{ marginTop: '20%' }}>
			<Paper p='md' shadow='sm'>
				<form onSubmit={handleSubmit}>
					<Title ta='center' style={{ marginBottom: '20px' }}>
						Login
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
						<Button type='submit'>Log in</Button>
					</Group>
				</form>
			</Paper>
			<Text ta='center' size='sm' style={{ marginTop: '10px' }}>
				Don't have an account?{' '}
				<Text
					component='a'
					href='/signup'
					size='sm'
					style={{ textDecoration: 'underline' }}
				>
					Sign up
				</Text>
			</Text>
		</Container>
	)
}

export default Login
