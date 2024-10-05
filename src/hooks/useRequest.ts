import { useState } from "react"


export default function useRequest(callback: (...args: any[]) => void): [(...args: any[]) => void, boolean] {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const request = async (...args: any[]) => {
		setIsLoading(true)

		try {
			await callback(...args)
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}

	return [request, isLoading]
}