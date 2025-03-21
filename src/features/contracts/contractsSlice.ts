import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import { deleteContract, getContracts, IGetData, IPostData, patchContract, postContract } from "../../api/APIService";

export interface IContract {
	id: string;
	companySigDate: string;
	companySignatureName: string;
	documentName: string;
	documentStatus: string;
	documentType: string;
	employeeNumber: string;
	employeeSigDate: string;
	employeeSignatureName: string;
}

interface IContractsState {
	contracts: IContract[],
	status: 'idle' | 'loading' | 'completed' | 'rejected',
	error: string | null,
	isFormOpen: boolean,
	currentContract: IContract | null
}

const initialState: IContractsState = {
	contracts: [],
	status: 'idle',
	error: null,
	isFormOpen: false,
	currentContract: null,
}

export const getContractsThunk = createAppAsyncThunk<IGetData, undefined, { rejectValue: string }>(
	'contracts/getContracts',
	async (_, thunkApi) => {
		try {
			const response = await getContracts()

			if (typeof response === 'string') throw new Error(response)

			return response
		} catch (err) {
			let errorMessage = ''
			if (err instanceof Error) errorMessage = err.message
			alert(errorMessage)
			return thunkApi.rejectWithValue(errorMessage)
		}
	}
)

export const removeContractThunk = createAppAsyncThunk<string, string, { rejectValue: string }>(
	'contracts/removeContract',
	async (id, thunkApi) => {
		try {
			const response = await deleteContract(id)

			if (typeof response === 'string') throw new Error(response)

			return id
		} catch (err) {
			let errorMessage = ''
			if (err instanceof Error) errorMessage = err.message
			alert(errorMessage)
			return thunkApi.rejectWithValue(errorMessage)
		}
	}
)

export const createContractThunk = createAppAsyncThunk<IPostData, Omit<IContract, 'id'>, { rejectValue: string }>(
	'contracts/createContract',
	async (contract, thunkApi) => {
		try {
			const response = await postContract(contract)

			if (typeof response === 'string') throw new Error(response)

			return response
		} catch (err) {
			let errorMessage = ''
			if (err instanceof Error) errorMessage = err.message
			return thunkApi.rejectWithValue(errorMessage)
		}
	}
)

export const updateContractThunk = createAppAsyncThunk<IPostData, IContract, { rejectValue: string }>(
	'contracts/updateContract',
	async (contract, thunkApi) => {
		try {
			const response = await patchContract(contract)

			if (typeof response === 'string') throw new Error(response)

			return response
		} catch (err) {
			let errorMessage = ''
			if (err instanceof Error) errorMessage = err.message
			return thunkApi.rejectWithValue(errorMessage)
		}
	}
)

const contractsSlice = createSlice({
	name: 'contracts',
	initialState: initialState,
	reducers: {
		setIsFormOpen: (state, action: PayloadAction<boolean>) => {
			state.isFormOpen = action.payload
		},
		setCurrentContract: (state, action: PayloadAction<IContract | null>) => {
			state.currentContract = action.payload
			state.error = null
			state.status = 'idle'
		}
	},
	extraReducers(builder) {
		builder
			.addCase(getContractsThunk.pending, (state) => {
				state.status = "loading"
			})
			.addCase(getContractsThunk.fulfilled, (state, action) => {
				state.status = "completed"
				state.contracts = action.payload.data
				state.error = null
			})
			.addCase(getContractsThunk.rejected, (state, action) => {
				state.status = "rejected"
				state.error = action.payload ?? 'Неизвестная ошибка'
			})
			.addCase(removeContractThunk.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(removeContractThunk.fulfilled, (state, action) => {
				state.status = 'completed'
				state.contracts = state.contracts.filter(contract => contract.id !== action.payload)
				state.error = null
			})
			.addCase(removeContractThunk.rejected, (state, action) => {
				state.status = "rejected"
				state.error = action.payload ?? 'Неизвестная ошибка'
			})
			.addCase(createContractThunk.pending, (state) => {
				state.status = "loading"
			})
			.addCase(createContractThunk.fulfilled, (state, action) => {
				state.status = "completed"
				state.contracts.push(action.payload.data)
				state.error = null
			})
			.addCase(createContractThunk.rejected, (state, action) => {
				state.status = "rejected"
				state.error = action.payload ?? 'Неизвестная ошибка'
			})
			.addCase(updateContractThunk.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateContractThunk.fulfilled, (state, action) => {
				state.status = 'completed'
				state.contracts = state.contracts.map(contract => contract.id === action.payload.data.id ? action.payload.data : contract)
				state.error = null
			})
			.addCase(updateContractThunk.rejected, (state, action) => {
				state.status = "rejected"
				state.error = action.payload ?? 'Неизвестная ошибка'
			})
	},
	selectors: {
		selectContractsAll: (state) => state.contracts,
		selectContractById: (state, id) => state.contracts.find(contract => contract.id === id),
		selectCurrentContract: (state) => state.currentContract,
		selectContractsStatus: (state) => state.status,
		selectContractsError: (state) => state.error,
		selectContractIsFormOpen: (state) => state.isFormOpen,
	}
})

export default contractsSlice.reducer

export const {
	selectContractsAll,
	selectContractById,
	selectCurrentContract,
	selectContractsError,
	selectContractsStatus,
	selectContractIsFormOpen,
} = contractsSlice.selectors

export const {
	setCurrentContract,
	setIsFormOpen,
} = contractsSlice.actions