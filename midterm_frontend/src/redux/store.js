import { configureStore } from '@reduxjs/toolkit'
import  {appReducer}  from '../redux/app-redux'
import{combineReducers} from 'redux'

export default configureStore({
    reducer: combineReducers({
        appointment:appReducer
    })
})