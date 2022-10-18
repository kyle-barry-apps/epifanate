import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEpifanies } from "../epifanies/epifanySlice";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  epifaniesArray: []
}

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userData) => {
    const response = await fetch('http://localhost:8000/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      return new Promise.reject('Unable to create a user, status: ' + response.status)
    }
    const data = response.json()
    return data 
  }
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (userData) => {
    const response = await fetch('http://localhost:8000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      return new Promise.reject('Unable to log in user, status: ' + response.status)
    }
    const data = await response.json()
    localStorage.setItem('user', JSON.stringify(data))
    return data  
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    localStorage.removeItem('user')
  }
)

export const updateFavorites = createAsyncThunk(
  'users/updateFavorites',
  async (userData) => {
    const userId = userData[0]._id
    const epifanyId = userData[1]
    const response = await fetch(`http://localhost:8000/users/${userId}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"favoriteId": epifanyId}) 
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post like, status: ' + response.status)
    }
    const data = await response.json()
    return data
  }
)

export const updateLikes = createAsyncThunk(
  'users/updateLikes',
  async (userData) => {
    const userId = userData[0]._id
    const epifanyId = userData[1]
    const response = await fetch(`http://localhost:8000/users/${userId}/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"likeId": epifanyId}) 
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post like, status: ' + response.status)
    }
    const data = await response.json()
    return data
  }
)


export const updateBio = createAsyncThunk(
  'users/updateBio',
  async (userData) => {
    const token = userData[2]
    const newBio = userData[1]
    const response = await fetch(`http://localhost:8000/users/${userData[0]._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({...userData[0], bio: newBio})
    })
    if(!response.ok) {
      return new Promise.reject('Unable to remove favorite, status: ' + response.status)
    }
    const data = await response.json()
    return data
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.message = ''
      state.isSuccess = false
    }
  },
  extraReducers: {
    [updateBio.pending]: (state) => {
      state.isLoading = true
    },
    [updateBio.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = {...state.user, user: action.payload}
      localStorage.setItem('user', JSON.stringify({...state.user, user: action.payload}))
    },
    [updateBio.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    [updateFavorites.pending]: (state) => {
      state.isLoading = true
    },
    [updateFavorites.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = {...state.user, user: action.payload}
      localStorage.setItem('user', JSON.stringify({...state.user, user: action.payload}))
    },
    [updateFavorites.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    [updateLikes.pending]: (state) => {
      state.isLoading = true
    },
    [updateLikes.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = {...state.user, user: action.payload}
      localStorage.setItem('user', JSON.stringify({...state.user, user: action.payload}))
    },
    [updateLikes.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    [fetchEpifanies.pending]: (state) => {
      state.isLoading = true
    },
    [fetchEpifanies.fulfilled]: (state, action) => {
      state.isLoading = false
      state.epifaniesArray = action.payload
    },
    [fetchEpifanies.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.isSuccess = true
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = 'Please choose another username'
      state.user = null
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.user = action.payload
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    },
    [logoutUser.fulfilled]: (state) => {
      state.user = null
    }
}
}
)

export const { reset } = userSlice.actions

export default userSlice.reducer