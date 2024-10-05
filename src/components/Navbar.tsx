import { FC, useState } from "react";
import { IContract, IPostData } from "../types/types";
import { Box, Button, Modal } from "@mui/material";
import ContractItem from "./ContractItem";
import useRequest from "../hooks/useRequest";
import APIService from "../API/APIService";
import { Logout, PlaylistAdd } from "@mui/icons-material";
import axios from "axios";

interface NavbarProps {
	setIsAuth: (isAuth: boolean) => void;
	contracts: IContract[];
	setContracts: (contracts: IContract[]) => void;
}


const Navbar: FC<NavbarProps> = ({ setIsAuth, contracts, setContracts }) => {
	const [open, setOpen] = useState<boolean>(false)

	const [request, isLoading] = useRequest(
		async (contract: Omit<IContract, 'id'>) => {
			try {
				const response = await APIService.addNewContract(contract)

				const data: IPostData = response.data
				if (data.error_code !== 0) alert('Something wrong!' + data.error_message)
				else {
					setContracts([...contracts, data.data])
					closeModal()
				}
			} catch (e) {
				if (axios.isAxiosError(e)) {
					const respData = e.response?.data
					for (let err in respData.errors) {
						alert(respData.errors[err])
					}
				}
			}
		}
	)

	function logout() {
		window.localStorage.removeItem('TOKEN')
		setIsAuth(false)
	}

	function openModal() {
		setOpen(true)
	}

	function closeModal() {
		setOpen(false)
	}

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'end' }}>
				<Button onClick={() => openModal()}>
					Создать
					<PlaylistAdd color="primary" />
				</Button>
				<Button color='inherit' onClick={() => logout()}>
					Выйти
					<Logout />
				</Button>
			</Box>
			<Modal open={open} onClose={closeModal} >
				<Box>
					<ContractItem setNewContract={request} isLoading={isLoading} />
				</Box>
			</Modal>
		</>
	)
}

export default Navbar