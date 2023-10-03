import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: {title: "Not Playing"}
  },
  reducers: {
    set: (state, action) => {
      console.log('a', action)
      state.value = action.payload
    }
  }
})

export const { set } = counterSlice.actions

export default counterSlice.reducer