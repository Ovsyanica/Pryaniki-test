import axios from "axios"
import { IContract } from "../types/types"

export default class APIService {
	static #HOST = 'https://test.v5.pryaniky.com'
	static #AUTH_URL = '/ru/data/v3/testmethods/docs/login'
	static #GET_URL = '/ru/data/v3/testmethods/docs/userdocs/get'
	static #POST_URL = '/ru/data/v3/testmethods/docs/userdocs/create'
	static #DELETE_URL = '/ru/data/v3/testmethods/docs/userdocs/delete/'
	static #UPDATE_URL = '/ru/data/v3/testmethods/docs/userdocs/set/'

	static async authUser(username: string, password: string) {
		const response = await axios.post(`${APIService.#HOST}${APIService.#AUTH_URL}`, {
			username: username,
			password: password
		})
		return response
	}

	static async getContracts() {
		const response = await axios.get(
			`${this.#HOST}${this.#GET_URL}`, {
			headers: {
				'x-auth': window.localStorage.getItem('TOKEN')
			}
		})
		return response
	}

	static async addNewContract(contract: Omit<IContract, 'id'>) {
		const response = await axios.post(`${APIService.#HOST}${APIService.#POST_URL}`, contract, {
			headers: {
				'Content-Type': 'application/json',
				'x-auth': window.localStorage.getItem('TOKEN')
			}
		})
		return response
	}

	static async removeContract(id: string) {
		const response = await axios.post(
			`${APIService.#HOST}${APIService.#DELETE_URL}${id}`, {}, {
			headers: {
				'x-auth': window.localStorage.getItem('TOKEN')
			}
		})
		return response
	}

	static async updateContract(contract: IContract) {
		const response = await axios.post(
			`${APIService.#HOST}${APIService.#UPDATE_URL}${contract.id}`, contract, {
			headers: {
				'x-auth': window.localStorage.getItem('TOKEN')
			}
		})
		return response
	}
}