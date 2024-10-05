import { FC, useEffect, useState } from "react";
import { IContract, IGetData } from "../types/types";
import ContractsTable from "../components/ContractsTable";
import Navbar from "../components/Navbar";
import useRequest from "../hooks/useRequest";
import APIService from "../API/APIService";
import { Container } from "@mui/material";

interface ContractsPageProps {
	setIsAuth: (isAuth: boolean) => void;
}



const ContractsPage: FC<ContractsPageProps> = ({ setIsAuth }) => {
	const [contracts, setContracts] = useState<IContract[]>([])

	const [getRequest, isGetLoading] = useRequest(
		async () => {
			try {
				const response = await APIService.getContracts()

				const data: IGetData = response.data
				if (data.error_code !== 0) alert('Something wrong: ' + data.error_message)
				else {
					setContracts(data.data)
				}
			} catch (e) {
				alert(e)
			}
		}
	)

	useEffect(() => {
		getRequest()
	}, [])

	return (
		<>
			<Container sx={{ paddingTop: '20px' }}>
				<Navbar setIsAuth={setIsAuth} contracts={contracts} setContracts={setContracts} />
				<ContractsTable contracts={contracts} isGetLoading={isGetLoading} setContracts={setContracts} />
			</Container>
		</>
	)
}

export default ContractsPage