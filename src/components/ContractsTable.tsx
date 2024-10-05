import { FC, useState } from "react";
import { IContract, IRemoveData, IUpdateData } from "../types/types";
import { Box, Card, IconButton, LinearProgress, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ContractItem from "./ContractItem";
import useRequest from "../hooks/useRequest";
import APIService from "../API/APIService";
import { EditNote, PlaylistRemove } from "@mui/icons-material";
import axios from "axios";

interface ContractsTableProps {
	contracts: IContract[];
	isGetLoading: boolean;
	setContracts: (newContracts: IContract[]) => void;
}


const ContractsTable: FC<ContractsTableProps> = ({ contracts, isGetLoading, setContracts }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [modalData, setModalData] = useState<IContract | null>(null)

	const [removeRequest, isRemoveLoading] = useRequest(
		async (id: string) => {
			try {
				const response = await APIService.removeContract(id)

				const data: IRemoveData = response.data
				if (data.error_code !== 0) alert('Something wrong: ' + data.error_message)
				else {
					setContracts([...contracts].filter((contract) => { return contract.id !== id }))
				}
			} catch (e) {
				alert(e)
			}
		}
	)

	const [updateRequest, isUpdateLoading] = useRequest(
		async (contract: IContract) => {
			try {
				const response = await APIService.updateContract(contract)

				const data: IUpdateData = response.data
				if (data.error_code !== 0) alert('Something wrong: ' + data.error_message)
				else {
					let newContracts: IContract[] = [...contracts]
					newContracts.forEach((item, index) => {
						if (item.id == data.data.id) {
							newContracts[index] = contract
						}
					})

					setContracts(newContracts)
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

	function handlerRemoveContract(id: string) {
		removeRequest(id)
	}

	function closeModal() {
		setModalData(null)
		setOpen(false)
	}

	function handlerOpenContract(contract: IContract) {
		setModalData(contract)
		setOpen(true)
	}

	function getContractItem() {
		if (modalData) {
			return (
				<ContractItem contract={modalData} editContract={updateRequest} isLoading={isUpdateLoading} />
			)
		}
	}

	return (
		<>
			<Card variant="elevation" elevation={5} sx={{ padding: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
				<TableContainer>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Название документа</TableCell>
								<TableCell>Тип документа</TableCell>
								<TableCell>Статус</TableCell>
								<TableCell>Подпись компании</TableCell>
								<TableCell>Дата подписи компании</TableCell>
								<TableCell>Номер сотрудника</TableCell>
								<TableCell>Подпись сотрудника</TableCell>
								<TableCell>Дата подписи сотрудника</TableCell>
								<TableCell colSpan={2}></TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{isRemoveLoading || isGetLoading
								? <TableRow><TableCell colSpan={10} ><LinearProgress /></TableCell></TableRow>
								: contracts.map(contract => (
									<TableRow key={contract.id}>
										<TableCell>{contract.documentName}</TableCell>
										<TableCell>{contract.documentType}</TableCell>
										<TableCell>{contract.documentStatus}</TableCell>
										<TableCell>{contract.companySignatureName}</TableCell>
										<TableCell>{contract.companySigDate}</TableCell>
										<TableCell>{contract.employeeNumber}</TableCell>
										<TableCell>{contract.employeeSignatureName}</TableCell>
										<TableCell>{contract.employeeSigDate}</TableCell>
										<TableCell>
											<IconButton onClick={() => handlerOpenContract(contract)}>
												<EditNote color='secondary' />
											</IconButton>
										</TableCell>
										<TableCell>
											<IconButton onClick={() => handlerRemoveContract(contract.id)}>
												<PlaylistRemove color='error' />
											</IconButton>
										</TableCell>
									</TableRow>
								))}

						</TableBody>
					</Table>
				</TableContainer>
			</Card>

			<Modal open={open} onClose={closeModal} >
				<Box>
					{open ? getContractItem() : null}
				</Box>
			</Modal>
		</>
	)
}

export default ContractsTable