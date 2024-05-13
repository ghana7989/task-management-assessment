import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Protected from './components/hoc/Protected'
import { AuthProvider } from './context/AuthContext'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<Signup />} />
						<Route
							path='/dashboard'
							element={
								<Protected>
									<Dashboard />
								</Protected>
							}
						/>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</>
	)
}

export default App
