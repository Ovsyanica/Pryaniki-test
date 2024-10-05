import { Box, Button, Card, LinearProgress, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IContract } from "../types/types";

interface ContractItemProps {
	contract?: IContract;
	isLoading: boolean;
	setNewContract?: (newContract: Omit<IContract, 'id'>) => void;
	editContract?: (newContract: IContract) => void;
}

const ContractItem: FC<ContractItemProps> = ({ contract, isLoading, setNewContract, editContract }) => {
	const [documentName, setDocumentName] = useState<string>('')
	const [documentType, setDocumentType] = useState<string>('')
	const [documentStatus, setDocumentStatus] = useState<string>('')
	const [companySignatureName, setCompanySignatureName] = useState<string>('')
	const [employeeNumber, setEmployeeNumber] = useState<string>('')
	const [employeeSignatureName, setEmployeeSignatureName] = useState<string>('')


	useEffect(() => {
		if (contract) {
			setDocumentName(contract.documentName)
			setDocumentType(contract.documentType)
			setDocumentStatus(contract.documentStatus)
			setCompanySignatureName(contract.companySignatureName)
			setEmployeeNumber(contract.employeeNumber)
			setEmployeeSignatureName(contract.employeeSignatureName)
		}
	}, [contract])

	function handlerClick() {
		if (contract) {
			const newContract: IContract = {
				id: contract.id,
				documentName: documentName,
				documentType: documentType,
				documentStatus: documentStatus,
				companySignatureName: companySignatureName,
				employeeNumber: employeeNumber,
				employeeSignatureName: employeeSignatureName,
				companySigDate: contract.companySigDate,
				employeeSigDate: contract.employeeSigDate,
			}

			if (editContract) editContract(newContract)
		} else {
			const date = new Date()

			const newContract: Omit<IContract, 'id'> = {
				documentName: documentName,
				documentType: documentType,
				documentStatus: documentStatus,
				companySignatureName: companySignatureName,
				employeeNumber: employeeNumber,
				employeeSignatureName: employeeSignatureName,
				companySigDate: date.toISOString(),
				employeeSigDate: date.toISOString(),
			}

			if (setNewContract) setNewContract(newContract)
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
						{contract ? 'Редактирование контракта' : 'Новый контракт'}
					</Typography>
					<TextField
						label='Название документа'
						variant='outlined'
						margin="normal"
						value={documentName}
						onChange={(e) => { setDocumentName(e.target.value) }}
					/>
					<TextField
						label='Тип документа'
						variant='outlined'
						margin="normal"
						value={documentType}
						onChange={(e) => { setDocumentType(e.target.value) }}
					/>
					<TextField
						label='Статус'
						variant='outlined'
						margin="normal"
						value={documentStatus}
						onChange={(e) => { setDocumentStatus(e.target.value) }}
					/>
					<TextField
						label='Название подписи компании'
						variant='outlined'
						margin="normal"
						value={companySignatureName}
						onChange={(e) => { setCompanySignatureName(e.target.value) }}
					/>
					<TextField
						label='Номер сотрудника'
						variant='outlined'
						margin="normal"
						value={employeeNumber}
						onChange={(e) => { setEmployeeNumber(e.target.value) }}
					/>
					<TextField
						label='Название подписи сотрудника'
						variant='outlined'
						margin="normal"
						value={employeeSignatureName}
						onChange={(e) => { setEmployeeSignatureName(e.target.value) }}
					/>
					<Box sx={{ marginTop: '15px', position: 'relative', width: '100%' }}>
						<Button variant='contained' disabled={isLoading} sx={{ width: '100%' }} onClick={() => handlerClick()}>
							{contract ? 'Сохранить' : 'Создать'}
						</Button>
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
		</>
	)
}

export default ContractItem