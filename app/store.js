import { configureStore } from '@reduxjs/toolkit'
import playerSlice from './(stores)/playerSlice'

export default configureStore({
  reducer: {
		player: playerSlice
	}
})