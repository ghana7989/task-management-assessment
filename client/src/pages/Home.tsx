import React from 'react'
import {
	Button,
	Container,
	Title,
	Text,
	Group,
	Paper,
	useMantineTheme,
} from '@mantine/core'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
	const theme = useMantineTheme()

	return (
		<Container size='lg' style={{ padding: '100px 0' }}>
			<Paper
				shadow='xl'
				radius='md'
				p='xl'
				style={{ backgroundColor: theme.colors.blue[8] }}
			>
				<Title ta='center' style={{ color: theme.white, marginBottom: 30 }}>
					Welcome to Task Manager
				</Title>
				<Text
					size='lg'
					ta='center'
					style={{ color: theme.white, marginBottom: 20 }}
				>
					Streamline your daily tasks and boost productivity with ease. Let's
					get things done together!
				</Text>
				<Group justify='center'>
					<Button
						component={Link}
						to='/login'
						size='lg'
						style={{ margin: '10px' }}
					>
						Login
					</Button>
					<Button
						component={Link}
						to='/signup'
						size='lg'
						color='green'
						style={{ margin: '10px' }}
					>
						Sign Up
					</Button>
				</Group>
			</Paper>
		</Container>
	)
}

export default Home
