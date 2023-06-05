import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movies: [],
}

const movieSlice = createSlice({
  initialState,
  name: 'movieList',
  reducers: {
    storeMovie: (state, action) => {
      state.movies = action.payload
    },
  },
})

export const { storeMovie } = movieSlice.actions
export default movieSlice.reducer
