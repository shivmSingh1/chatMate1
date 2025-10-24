import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	messages: {}
}

export const messageSlice = createSlice({
	name: "Msg",
	initialState,
	reducers: {
		setConverstation: (state, action) => {
			state.messages = action.payload
		}
	}
})

export const { setConverstation } = messageSlice.actions

export default messageSlice.reducer