import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const addApp = createAsyncThunk(
    'add',
    async(appState, thunkAPI)=>{
        const response = await axios.post("/api/app/post",appState,{
            headers:{
                "Content-Type": "Application/json"
            }
        }).catch(error=>{
            console.log(error)
            return error
        })

        if(response.status > 299){
            return thunkAPI.rejectWithValue(response)
        }

        return response.data        }
)

export const deleteApp = createAsyncThunk(
    'delete',
    async(app_id, thunkAPI)=>{
        const response = await axios.delete(`/api/app/${app_id}`,{
            headers:{
                "Content-Type": "Application/json"
            }
        })

        if(response.status > 299){
            return thunkAPI.rejectWithValue(response)
        }
        return response.data
    }
)

export const getAll = createAsyncThunk(
    'all',
    async(appState, thunkAPI)=>{
        const response = await axios.get("/api/app/all",{
            headers:{
                "Content-Type": "Application/json"
            }
        })

        if(response.status > 299){
            return thunkAPI.rejectWithValue(response)
        }
        return response.data
    }
)

const initialState =  {
    appointments: [],
    loading: false,
    errors: {}
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        setApp:(state,action) => {
            state.appointments = action.payload 
        }
    },
    extraReducers:(builder)=>(
        builder.addCase(addApp.fulfilled, (state, action) => {
            if(action.payload){
                state.appointments = [action.payload.data]
            }
			
			state.loading = false
			state.errors = initialState.errors
		}),
		builder.addCase(addApp.rejected, (state, action) => {
            console.log(action.payload)
            if(action.payload){
                state.errors = action.payload.error.errors
            }else{
                state.errors = {error:'validation error'}
            }	
			state.loading = false
		}),
		builder.addCase(addApp.pending, (state) => {
			state.loading = true
		}),
        builder.addCase(deleteApp.fulfilled, (state, action) => {
			state.loading = false
			state.errors = initialState.errors
		}),
		builder.addCase(deleteApp.rejected, (state, action) => {
			state.errors = action.payload.error.errors
			state.loading = false
		}),
		builder.addCase(deleteApp.pending, (state) => {
			state.loading = true
		}),
        builder.addCase(getAll.fulfilled, (state, action) => {
			state.appointments = action.payload.data
			state.loading = false
			state.errors = initialState.errors
		}),
		builder.addCase(getAll.rejected, (state, action) => {
			state.errors = action.payload.error.errors
			state.loading = false
		}),
		builder.addCase(getAll.pending, (state) => {
			state.loading = true
		})
    )
})

export const { setApp } = appSlice.actions
export const appReducer = appSlice.reducer