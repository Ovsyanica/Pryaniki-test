import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getContractsThunk, selectContractsAll, selectContractsStatus } from "./contractsSlice"
import { useEffect } from "react"
import Loader from "../../components/Loader"
import ContractsRow from "./ContractsRow"




const ContractsTable: React.FC = () => {
	const dispatch = useAppDispatch()
	const contracts = useAppSelector(state => selectContractsAll(state))
	const status = useAppSelector(state => selectContractsStatus(state))

	useEffect(() => {
		dispatch(getContractsThunk())
	}, [])

	return (
		<>
			<Card variant="elevation" elevation={5} sx={{ padding: '10px', marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
				<TableContainer >
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
							{contracts.map(contract => (
								<ContractsRow key={contract.id} id={contract.id} />
							))}

						</TableBody>
					</Table>
				</TableContainer>
			</Card>

			<Loader open={status === 'loading'} />

			{/* <Modal open={open} onClose={closeModal} >
				<Box>
					{open ? getContractItem() : null}
				</Box>
			</Modal> */}
		</>
	)
}

export default ContractsTable