import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material"
import { createContractThunk, IContract, selectContractsError, selectContractsStatus, selectCurrentContract, updateContractThunk } from "./contractsSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useEffect, useState } from "react"



const ContractsForm: React.FC = () => {
	const dispatch = useAppDispatch()
	const currentContract = useAppSelector(state => selectCurrentContract(state))
	const status = useAppSelector(state => selectContractsStatus(state))
	const error = useAppSelector(state => selectContractsError(state))

	const [formState, setFormState] = useState<Omit<IContract, 'id'>>({
		documentName: '',
		documentType: '',
		documentStatus: '',
		companySignatureName: '',
		employeeNumber: '',
		employeeSignatureName: '',
		companySigDate: '',
		employeeSigDate: '',
	})

	useEffect(() => {
		if (currentContract) {
			const companySigDate = new Date(currentContract.companySigDate).toISOString()
			const employeeSigDate = new Date(currentContract.employeeSigDate).toISOString()

			setFormState({
				documentName: currentContract.documentName,
				documentType: currentContract.documentType,
				documentStatus: currentContract.documentStatus,
				companySignatureName: currentContract.companySignatureName,
				employeeNumber: currentContract.employeeNumber,
				employeeSignatureName: currentContract.employeeSignatureName,
				companySigDate: companySigDate.slice(0, companySigDate.length - 8),
				employeeSigDate: employeeSigDate.slice(0, employeeSigDate.length - 8),
			})
		}

		return () => {
			setFormState({
				documentName: '',
				documentType: '',
				documentStatus: '',
				companySignatureName: '',
				employeeNumber: '',
				employeeSignatureName: '',
				companySigDate: '',
				employeeSigDate: '',
			})
		}
	}, [currentContract])

	const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormState(prev => ({ ...prev, [name]: value }))
	}

	const handlerClick = () => {
		let companySigDate = ''
		let employeeSigDate = ''
		if (formState.companySigDate) companySigDate = new Date(formState.companySigDate).toISOString()
		if (formState.employeeSigDate) employeeSigDate = new Date(formState.employeeSigDate).toISOString()
		
		if (currentContract) {
			const newContract: IContract = {
				id: currentContract.id,
				...formState,
				companySigDate: companySigDate,
				employeeSigDate: employeeSigDate,
			}
			dispatch(updateContractThunk(newContract))
		} else {
			const newContract: Omit<IContract, 'id'> = {
				...formState,
				companySigDate: companySigDate,
				employeeSigDate: employeeSigDate,
			}
			dispatch(createContractThunk(newContract))
		}
	}


	return (
		<>
			<Box sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				minWidth: '500px'
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
					>
						{currentContract ? 'Редактирование контракта' : 'Новый контракт'}
					</Typography>
					{status === 'rejected' && (
						<Alert
							severity="error"
							sx={{marginTop: '10px'}}
						>
							{error}
						</Alert>
					)}
					<TextField
						name='documentName'
						label='Название документа'
						variant='outlined'
						error={!!error}
						margin="normal"
						value={formState.documentName}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='documentType'
						label='Тип документа'
						variant='outlined'
						margin="normal"
						value={formState.documentType}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='documentStatus'
						label='Статус'
						variant='outlined'
						error={!!error}
						margin="normal"
						value={formState.documentStatus}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='companySignatureName'
						label='Название подписи компании'
						variant='outlined'
						margin="normal"
						value={formState.companySignatureName}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='employeeNumber'
						label='Номер сотрудника'
						variant='outlined'
						margin="normal"
						value={formState.employeeNumber}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='employeeSignatureName'
						label='Название подписи сотрудника'
						variant='outlined'
						margin="normal"
						value={formState.employeeSignatureName}
						onChange={e => handleChangeForm(e)}
					/>
					<TextField
						name='companySigDate'
						label='Дата подписания компанией'
						type="datetime-local"
						variant='outlined'
						margin="normal"
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
						value={formState.companySigDate}
						onChange={e => handleChangeForm(e)}
					>
					</TextField>
					<TextField
						name='employeeSigDate'
						label='Дата подписания сотрудником'
						type="datetime-local"
						variant='outlined'
						margin="normal"
						slotProps={{
							inputLabel: {
								shrink: true
							}
						}}
						value={formState.employeeSigDate}
						onChange={e => handleChangeForm(e)}
					/>
					<Box sx={{ marginTop: '15px', position: 'relative', width: '100%' }}>
						<Button variant='contained' sx={{ width: '100%' }} onClick={handlerClick}>
							{currentContract ? 'Сохранить' : 'Создать'}
						</Button>
					</Box>
				</Card>
			</Box>
		</>
	)
}

export default ContractsForm