import { IContract } from "../features/contracts/contractsSlice";

export interface IAuthData {
	data?: { token: string };
	error_code: number;
	error_text: string;
}

export interface IGetData {
	data: IContract[];
	error_code: number;
	error_message: string;
}

export interface IRemoveData {
	error_code: number;
	error_message: string;
}

export interface IPostData {
	data: IContract;
	error_code: number;
	error_message: string;
}



const HOST = 'https://test.v5.pryaniky.com'
const AUTH_URL = '/ru/data/v3/testmethods/docs/login'
const GET_URL = '/ru/data/v3/testmethods/docs/userdocs/get'
const POST_URL = '/ru/data/v3/testmethods/docs/userdocs/create'
const DELETE_URL = '/ru/data/v3/testmethods/docs/userdocs/delete/'
const UPDATE_URL = '/ru/data/v3/testmethods/docs/userdocs/set/'



export async function authUser(username: string, password: string) {
	try {
		const response = await fetch(`${HOST}${AUTH_URL}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ username: username, password: password })
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Что-то пошло не так...')
		}

		const data: IAuthData = await response.json()

		if (!data.data) throw new Error(`Произошла ошибка с кодом: ${data.error_code}, текс ошибки: ${data.error_text}`)

		return data
	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message
		return errorMessage
	}
}

export async function getContracts() {
	try {
		const token = window.localStorage.getItem('TOKEN')
		if (!token) throw new Error('Токен не обнаружен')

		const response = await fetch(`${HOST}${GET_URL}`, {
			method: 'GET',
			headers: {
				'x-auth': token
			}
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Что-то пошло не так...')
		}

		const data: IGetData = await response.json()

		if (!data.data) throw new Error(`Произошла ошибка с кодом: ${data.error_code}, текс ошибки: ${data.error_message}`)

		return data
	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message
		return errorMessage
	}
}

export async function deleteContract(id: string) {
	try {
		const token = window.localStorage.getItem('TOKEN')
		if (!token) throw new Error('Токен не обнаружен')

		const response = await fetch(`${HOST}${DELETE_URL}${id}`, {
			method: 'POST',
			headers: {
				'x-auth': token
			}
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Что-то пошло не так...')
		}

		const data: IRemoveData = await response.json()

		if (data.error_code !== 0) throw new Error(`Произошла ошибка с кодом: ${data.error_code}, текс ошибки: ${data.error_message}`)

		return data
	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message
		return errorMessage
	}
}

export async function postContract(contract: Omit<IContract, 'id'>) {
	try {
		const token = window.localStorage.getItem('TOKEN')
		if (!token) throw new Error('Токен не обнаружен')

		const response = await fetch(`${HOST}${POST_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth': token
			},
			body: JSON.stringify(contract)
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.title || 'Что-то пошло не так...')
		}

		const data: IPostData = await response.json()

		if (data.error_code !== 0) throw new Error(`Произошла ошибка с кодом: ${data.error_code}, текс ошибки: ${data.error_message}`)

		return data
	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message
		return errorMessage
	}
}

export async function patchContract(contract: IContract) {
	try {
		const token = window.localStorage.getItem('TOKEN')
		if (!token) throw new Error('Токен не обнаружен')

		const response = await fetch(`${HOST}${UPDATE_URL}${contract.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-auth': token
			},
			body: JSON.stringify(contract)
		})
		
		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.title || 'Что-то пошло не так...')
		}

		const data: IPostData = await response.json()

		if (data.error_code !== 0) throw new Error(`Произошла ошибка с кодом: ${data.error_code}, текс ошибки: ${data.error_message}`)

		return data
	} catch (error) {
		let errorMessage = ''
		if (error instanceof Error) errorMessage = error.message
		return errorMessage
	}
}