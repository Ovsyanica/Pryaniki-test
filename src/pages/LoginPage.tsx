import { FC, useRef, useState } from "react"
import { Box, Button, Card, Container, LinearProgress, TextField, Tooltip, Typography } from "@mui/material";
import APIService from "../API/APIService";
import { IAuthData } from "../types/types";
import useRequest from "../hooks/useRequest";
import { HelpOutline } from "@mui/icons-material";

interface LoginPageProps {
	setIsAuth: (isAuth: boolean) => void;
}


const LoginPage: FC<LoginPageProps> = ({ setIsAuth }) => {
	const [nameErr, setNameErr] = useState<boolean>(false)
	const [passErr, setPassErr] = useState<boolean>(false)
	const nameRef = useRef<HTMLInputElement>()
	const passRef = useRef<HTMLInputElement>()

	const [request, isLoading] = useRequest(
		async (username: string, password: string) => {
			try {
				const response = await APIService.authUser(username, password)
				const data: IAuthData = response.data

				if (!data.data) {
					setNameErr(true)
					setPassErr(true)
					alert(data.error_text)
				}
				else {
					setNameErr(false)
					setPassErr(false)
					window.localStorage.setItem('TOKEN', data.data.token)
					setIsAuth(true)
				}
			} catch (e) {
				alert(e)
			}
		}
	)

	function loginHandle() {
		if (nameRef.current?.value && passRef.current?.value) {
			request(nameRef.current.value, passRef.current.value)
		} else {
			!nameRef.current?.value ? setNameErr(true) : setNameErr(false)
			!passRef.current?.value ? setPassErr(true) : setPassErr(false)
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
					minWidth: '400px',
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
						<Box sx={{ display: "flex", alignItems: 'center', margin: '10px 0px 10px 0px' }}>
							<TextField
								fullWidth
								error={nameErr}
								label='Имя пользователя'
								variant='outlined'
								inputRef={nameRef}
							/>
							<Tooltip color="primary" sx={{ justifySelf: 'end' }} title={
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
							<Tooltip color="primary" sx={{ justifySelf: 'end' }} title={
								<Typography>"Пароль": password</Typography>
							}>
								<HelpOutline />
							</Tooltip>
						</Box>

						<Box sx={{ position: 'relative', width: '100%' }}>
							<Button variant='contained' disabled={isLoading} sx={{ width: '100%' }} onClick={() => loginHandle()}>Войти</Button>
							{isLoading && (
								<LinearProgress color='secondary' sx={{
									position: 'absolute',
									top: '50%',
									width: '100%',
								}} />
							)}
						</Box>

					</Card>
				</Box>
			</Container >
		</>
	)
}

export default LoginPage