import { configureStore } from "@reduxjs/toolkit"
import authSlice from '../features/auth/authSlice.ts'
import contractsSlice from '../features/contracts/contractsSlice.ts'


export const store = configureStore({
	reducer: {
		auth: authSlice,
		contracts: contractsSlice
	}
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>