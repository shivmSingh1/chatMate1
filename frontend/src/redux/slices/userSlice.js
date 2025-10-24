import { createSlice } from '@reduxjs/toolkit'

const userInitialState = {
	data: {},
	otherUsers: [],
	selectedUser: {},
	onlineUsers: [],
	socket: null,
	searchUser: []
}

export const userDetailsSlice = createSlice({
	name: "User",
	initialState: userInitialState,
	reducers: {
		setUserData: (state, action) => {
			console.log(action.payload)
			state.data = action.payload
		},
		setAllOtherUsers: (state, action) => {
			console.log(action.payload)
			state.otherUsers = action.payload
		},
		setSelectedUser: (state, action) => {
			console.log(action.payload)
			state.selectedUser = action.payload
		},
		clearUserData: (state) => {
			state.data = {};
			state.otherUsers = [];
			state.selectedUser = {}
			state.onlineUsers = [];
			state.socket = null;
			state.searchUser = []
		},
		setOnlineUsers: (state, action) => {
			state.onlineUsers = action.payload
		},
		setSocket: (state, action) => {
			state.socket = action.payload
		},
		setSearchUser: (state, action) => {
			state.searchUser = action.payload
		},
	}
})

export const { setUserData, setAllOtherUsers, setSelectedUser, clearUserData, setOnlineUsers, setSocket, setSearchUser } = userDetailsSlice.actions

export default userDetailsSlice.reducer