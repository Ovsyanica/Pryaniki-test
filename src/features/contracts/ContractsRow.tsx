import { IconButton, TableCell, TableRow } from "@mui/material"
import { IContract, removeContractThunk, selectContractById, setCurrentContract, setIsFormOpen } from "./contractsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { EditNote, PlaylistRemove } from "@mui/icons-material"


interface ContractsRowProps {
	id: string
}

const ContractsRow: React.FC<ContractsRowProps> = ({ id }) => {
	const dispatch = useAppDispatch()
	const contract = useAppSelector(state => selectContractById(state, id))


	const editContract = (contract: IContract) => {
		dispatch(setIsFormOpen(true))
		dispatch(setCurrentContract(contract))
	}

	const removeContract = (id: string) => {
		dispatch(removeContractThunk(id))
	}



	return (
		<>
			{contract && (
				<TableRow key={contract.id}>
					<TableCell>{contract.documentName}</TableCell>
					<TableCell>{contract.documentType}</TableCell>
					<TableCell>{contract.documentStatus}</TableCell>
					<TableCell>{contract.companySignatureName}</TableCell>
					<TableCell>{
						contract.companySigDate
							? (
								(new Date(contract.companySigDate).toISOString()).slice(0, contract.companySigDate.length - 8).replace('T', ' ')
							)
							: ''
					}</TableCell>
					<TableCell>{contract.employeeNumber}</TableCell>
					<TableCell>{contract.employeeSignatureName}</TableCell>
					<TableCell>{
						contract.employeeSigDate
							? (
								(new Date(contract.employeeSigDate).toISOString()).slice(0, contract.employeeSigDate.length - 8).replace('T', ' ')
							)
							: ''
					}</TableCell>
					<TableCell>
						<IconButton onClick={() => editContract(contract)}>
							<EditNote color='secondary' />
						</IconButton>
					</TableCell>
					<TableCell>
						<IconButton onClick={() => removeContract(contract.id)}>
							<PlaylistRemove color='error' />
						</IconButton>
					</TableCell>
				</TableRow>
			)}
		</>
	)
}

export default ContractsRow