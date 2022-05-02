import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, deleteUserById } from './usersAPI'

const initialState = {
  data: [],
  loading: false,
  errors: []
}

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    pending: (state) => {
      state.loading = true
      state.errors = []
    },
    fulfilled: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.errors = []
    },
    rejected: (state, action) => {
      state.loading = false
      state.errors = action.payload
    },
    cleanData: (state) => {
      state.data = []
      state.loading = false
      state.errors = []
    }
  }
})

export default usersSlice.reducer;

export const { pending, fulfilled, rejected, cleanData, removeUser } = usersSlice.actions;

export const selectUsers = (state) => state.users.data

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch(pending())

  const { error } = await deleteUserById(id)

  if (error) {
    return dispatch(rejected(error.message))
  }

  const users = selectUsers(getState()).filter(user => user.id !== id)

  dispatch(fulfilled(users))
}

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(pending())

  const { error, data } = await fetchUsers()

  if (error) {
    return dispatch(rejected(error.message))
  }

  const users = addFakeImagesToUsers(data)

  dispatch(fulfilled(users))
}

const addFakeImagesToUsers = (data) => {
  const randomUser = Math.floor(Math.random() * 101);

  if (!data) return []

  return data.map(user => ({
    ...user,
    image: `https://randomuser.me/api/portraits/thumb/${randomUser % 2 === 0 ? 'women' : 'men'}/${randomUser}.jpg`
  }))
}