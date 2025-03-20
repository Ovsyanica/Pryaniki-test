import { Container, Modal } from "@mui/material"
import Navbar from "../../widgets/Navbar"
import ContractsTable from "./ContractsTable"
import ContractsForm from "./ContractsForm"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectContractIsFormOpen, setCurrentContract, setIsFormOpen } from "./contractsSlice"


const ContractsPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const isFormOpen = useAppSelector(state => selectContractIsFormOpen(state))

	const closeForm = () => {
		dispatch(setCurrentContract(null))
		dispatch(setIsFormOpen(false))
	}

	return (
		<Container sx={{ paddingTop: '20px' }}>
			<Navbar />
			<ContractsTable />
			<Modal open={isFormOpen} onClose={closeForm}>
				<ContractsForm />
			</Modal>
		</Container>
	)
}

export default ContractsPage