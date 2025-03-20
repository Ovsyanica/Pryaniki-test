import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import { authUser } from "../../api/APIService";



export interface IAuthState {
	isAuth: boolean;
	status: 'idle' | 'loading' | 'completed' | 'rejected';
	error: string | null
}

const initialState: IAuthState = {
	isAuth: false,
	status: 'idle',
	error: null
}

export const authUserThunk = createAppAsyncThunk<boolean, { username: string, password: string }, { rejectValue: string }>(
	'auth/authUser',
	async ({ username, password }, thunkApi) => {
		try {
			const response = await authUser(username, password)

			if (typeof response === 'string') throw new Error(response)
			if (!response.data?.token) throw new Error('Токен не обнаружен')

			window.localStorage.setItem('TOKEN', response.data.token)
			return true
		} catch (err) {
			let errorMessage = ''
			if (err instanceof Error) errorMessage = err.message
			return thunkApi.rejectWithValue(errorMessage)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuth = action.payload
		}
	},
	extraReducers(builder) {
		builder
			.addCase(authUserThunk.pending, (state) => {
				state.status = "loading"
			})
			.addCase(authUserThunk.fulfilled, (state, action) => {
				state.status = "completed"
				state.error = null
				state.isAuth = action.payload
			})
			.addCase(authUserThunk.rejected, (state, action) => {
				state.status = "rejected"
				state.error = action.payload ?? 'Неизвестная ошибка'
				state.isAuth = false
			})
	},
	selectors: {
		selectAuthStatus: (state) => state.status,
		selectIsAuth: (state) => state.isAuth,
		selectAuthError: (state) => state.error,
	}
})

export default authSlice.reducer

export const {
	selectAuthStatus,
	selectAuthError,
	selectIsAuth

} = authSlice.selectors

export const { setAuth } = authSlice.actions