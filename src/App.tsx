import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import ContractsPage from './pages/ContractsPage';



function App() {
	const [isAuth, setIsAuth] = useState<boolean>(window.localStorage.getItem('TOKEN') ? true : false)

	return (
		!isAuth
			? <LoginPage setIsAuth={setIsAuth} />
			: <ContractsPage setIsAuth={setIsAuth} />
	)
}

export default App
