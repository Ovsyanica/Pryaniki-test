import { FC, useRef, useState } from "react"
import { Alert, Box, Button, Card, Container, TextField, Tooltip, Typography } from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authUserThunk, selectAuthError, selectAuthStatus } from "./authSlice";
import Loader from "../../components/Loader";

const AuthPage: FC = () => {
	const dispatch = useAppDispatch()
	const [nameErr, setNameErr] = useState<boolean>(false)
	const [passErr, setPassErr] = useState<boolean>(false)
	const nameRef = useRef<HTMLInputElement | null>(null)
	const passRef = useRef<HTMLInputElement | null>(null)

	const status = useAppSelector(state => selectAuthStatus(state))
	const error = useAppSelector(state => selectAuthError(state))



	function loginHandle() {
		if (nameRef.current?.value && passRef.current?.value) {
			dispatch(authUserThunk({
				username: nameRef.current.value,
				password: passRef.current.value
			}))
		} else {
			nameRef.current?.value ? setNameErr(false) : setNameErr(true)
			passRef.current?.value ? setPassErr(false) : setPassErr(true)
		}
	}

	return (
		<>
			<Container sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100vw',
				height: '100vh'
			}}>
				<Box sx={{
					maxWidth: '500px',
					width: '100%'
				}}>
					<Card
						sx={{
							display: "flex",
							flexDirection: 'column',
							width: '100%',
							padding: '20px',
						}}
						variant='elevation'
						elevation={5}
					>
						<Typography
							variant="h4"
							align='center'
						>
							Авторизация
						</Typography>

						{status === 'rejected' && (
							<Alert
								severity="error"
							>
								{error}
							</Alert>
						)}

						<Box sx={{ display: "flex", alignItems: 'center', margin: '15px 0px 10px 0px' }}>
							<TextField
								fullWidth
								error={nameErr}
								label='Имя пользователя'
								variant='outlined'
								inputRef={nameRef}
							/>
							<Tooltip color="primary" sx={{ justifySelf: 'end', marginLeft: '5px' }} title={
								<Typography>"Имя пользователя": user[N]</Typography>
							}>
								<HelpOutline />
							</Tooltip>
						</Box>

						<Box sx={{ display: "flex", alignItems: 'center', margin: '10px 0px 15px 0px' }}>
							<TextField
								fullWidth
								error={passErr}
								label='Пароль'
								variant='outlined'
								type="password"
								inputRef={passRef}
							/>
							<Tooltip color="primary" sx={{ justifySelf: 'end', marginLeft: '5px' }} title={
								<Typography>"Пароль": password</Typography>
							}>
								<HelpOutline />
							</Tooltip>
						</Box>

						<Box sx={{ position: 'relative', width: '100%' }}>
							<Button variant='contained' sx={{ width: '100%' }} onClick={loginHandle}>Войти</Button>
						</Box>
					</Card>
				</Box>
			</Container >

			<Loader open={status === 'loading'} />
		</>
	)
}

export default AuthPage