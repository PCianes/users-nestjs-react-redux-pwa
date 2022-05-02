import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, getMe } from './authAPI'
import { cleanData } from "../users/usersSlice";

const initialState = {
  isLogged: false,
  user: {},
  loading: false,
  errors: []
}

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    pending: (state) => {
      state.loading = true
      state.errors = []
    },
    fulfilled: (state, action) => {
      state.isLogged = true
      state.user = action.payload
      state.loading = false
      state.errors = []
    },
    rejected: (state, action) => {
      state.isLogged = false
      state.user = {}
      state.loading = false
      state.errors = action.payload
    },
    logout: (state) => {
      state.isLogged = false
      state.user = {}
      state.loading = false
      state.errors = []
    },
  }
})

export default authSlice.reducer;

export const { pending, fulfilled, rejected, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user

export const logOutUser = () => async (dispatch) => {
  dispatch(pending())

  window.localStorage.removeItem("token");

  dispatch(cleanData())
  dispatch(logout())
}

export const signUpUser = (user) => async (dispatch) => {
  dispatch(pending())

  const { error } = await signUp(user)

  if (error) {
    return dispatch(rejected(error.message))
  }

  //Auto login after signUp
  dispatch(signInUser(user.email, user.password))
}

export const signInUser = (email, password) => async (dispatch) => {
  dispatch(pending())

  const { error, data } = await signIn(email, password)

  if (error) {
    return dispatch(rejected(error.message))
  }

  if (data) {
    window.localStorage.setItem('token', data?.accessToken)
  }

  dispatch(fetchUser())
}

export const fetchUser = () => async (dispatch) => {
  const { error, data } = await getMe()

  if (error) {
    return dispatch(rejected(error.message))
  }

  if (data) {
    const user = addFakeImageToUser(data)

    dispatch(fulfilled(user))
  }
}

const addFakeImageToUser = (data) => {
  const randomUser = Math.floor(Math.random() * 101);

  return {
    ...data,
    image: `https://randomuser.me/api/portraits/thumb/${randomUser % 2 === 0 ? 'women' : 'men'}/${randomUser}.jpg`
  }
}