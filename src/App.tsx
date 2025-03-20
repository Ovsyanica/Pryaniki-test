import { useEffect } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import AuthPage from './features/auth/AuthPage'
import { selectIsAuth, setAuth } from './features/auth/authSlice'
import ContractsPage from './features/contracts/ContractsPage'

function App() {
	const dispatch = useAppDispatch()
	const isAuth = useAppSelector(state => selectIsAuth(state))

	useEffect(() => {
		if (window.localStorage.getItem('TOKEN')) dispatch(setAuth(true))
	}, [])

	return (
		<>
			{isAuth
				? <ContractsPage />
				: <AuthPage />
			}
		</>
	)
}

export default App
