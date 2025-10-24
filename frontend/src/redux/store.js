import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userDetailsSlice } from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web\
import { messageSlice } from './slices/messageSlice'

const rootReducer = combineReducers({
	User: userDetailsSlice.reducer,
	Msg: messageSlice.reducer
})

const persistConfig = {
	key: 'root',       // key for storage
	storage,           // storage type (localStorage)
	whitelist: ['User'] // which reducers to persist
}

const persistedReducer = persistReducer(
	persistConfig,
	rootReducer
)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // important for redux-persist
		}),
})



export const persistor = persistStore(store)
