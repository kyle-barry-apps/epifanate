import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  errMsg: '',
  epifaniesArray: [],
}

export const fetchEpifanies = createAsyncThunk(
  'epifanies/fetchEpifanies',
  async () => {
    const response = await fetch('http://localhost:8000/epifany')
    if(!response.ok) {
      return new Promise.reject('Unable to fetch, status: ' + response.status)
    }
    const data = await response.json()
    return data 
  }
)

export const postEpifany = createAsyncThunk(
  'epifanies/postEpifany',
  async (newEpifany, { dispatch }) => {
    const token = newEpifany.token
    delete newEpifany.token
    const response = await fetch('http://localhost:8000/epifany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newEpifany) 
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post epifany, status: ' + response.status)
    }

    const data = await response.json()
    dispatch(addEpifany(data))
  }
)

export const postLike = createAsyncThunk(
  'epifanies/postLike',
  async (epifanyList, { dispatch }) => {
    const epifany = epifanyList[0]
    const likeStatus = epifanyList[1]
    const addToLikes = likeStatus === 'like' ? 1 : -1
    const response = await fetch(`http://localhost:8000/epifany/${epifany._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...epifany, likes: epifany.likes + addToLikes}) 
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post like, status: ' + response.status)
    }
    const data = await response.json()
    dispatch(updateLike(data))
  }
)

export const postFavorite = createAsyncThunk(
  'epifanies/postFavorite',
  async (epifanyList, { dispatch }) => {
    const epifany = epifanyList[0]
    const favoriteStatus = epifanyList[1]
    const addToFavorites = favoriteStatus === 'favorite' ? 1 : -1
    const response = await fetch(`http://localhost:8000/epifany/${epifany._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...epifany, favorites: epifany.favorites + addToFavorites}) 
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post favorite, status: ' + response.status)
    }
    const data = await response.json()
    dispatch(updateFavorite(data))
  }
)

export const deleteEpifany = createAsyncThunk(
  'epifanies/deleteEpifany',
  async (epifanyData , { dispatch }) => {
    const token = epifanyData[1]
    const response = await fetch(`http://localhost:8000/epifany/${epifanyData[0]._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    if(!response.ok) {
      return new Promise.reject('Unable to post favorite, status: ' + response.status)
    }
    const data = await response.json()
    return data
  }
)

const epifanySlice = createSlice({
  name: 'epifany',
  initialState,
  reducers: {
    addEpifany: (state, action) => {
      state.epifaniesArray.push(action.payload)
    },
    updateLike: (state, action) => {
      state.epifaniesArray.map((epifany) => {
        if(epifany._id === action.payload._id) {
          epifany.likes = action.payload.likes
        }
      })
    },
    updateFavorite: (state, action) => {
      state.epifaniesArray.map((epifany) => {
        if(epifany._id === action.payload._id) {
          epifany.favorites = action.payload.favorites
        }
      })
    },
  },
  extraReducers: {
    [deleteEpifany.pending]: (state) => {
      state.isLoading = true
    },
    [deleteEpifany.fulfilled]: (state, action) => {
      state.isLoading = false
      state.errMsg = ''
      state.epifaniesArray = state.epifaniesArray.filter(epifany => epifany._id !== action.payload._id)
    },
    [deleteEpifany.rejected]: (state, action) => {
      state.isLoading = false
      state.errMsg = action.error ? action.error.message : 'Fetch failed'
    },
    [fetchEpifanies.pending]: (state) => {
      state.isLoading = true
    },
    [fetchEpifanies.fulfilled]: (state, action) => {
      state.isLoading = false
      state.errMsg = ''
      state.epifaniesArray = action.payload
    },
    [fetchEpifanies.rejected]: (state, action) => {
      state.isLoading = false
      state.errMsg = action.error ? action.error.message : 'Fetch failed'
    }
  }
})

export const { addEpifany, updateLike, updateFavorite, removeEpifany } = epifanySlice.actions


export default epifanySlice.reducer