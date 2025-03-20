import { Logout, PlaylistAdd } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { useAppDispatch } from "../app/hooks"
import { setAuth } from "../features/auth/authSlice"
import { setIsFormOpen } from "../features/contracts/contractsSlice"


const Navbar: React.FC = () => {
	const dispatch = useAppDispatch()

	const createContract = () => {
		dispatch(setIsFormOpen(true))
	}

	const logOut = () => {
		window.localStorage.removeItem('TOKEN')
		dispatch(setAuth(false))
	}

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'end' }}>
				<Button onClick={createContract}>
					Создать
					<PlaylistAdd color="primary" />
				</Button>
				<Button color='inherit' onClick={() => logOut()}>
					Выйти
					<Logout />
				</Button>
			</Box>
		</>
	)
}

export default Navbar