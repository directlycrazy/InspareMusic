import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: {title: "Not Playing"},
    queue: [],
    queue_pos: 0
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
    set_queue: (state, action) => {
      state.queue = action.payload.tracks;
      state.queue_pos = action.payload.queue_pos;
    },
  }
})

export const { set } = playerSlice.actions
export const { set_queue } = playerSlice.actions

export default playerSlice.reducer