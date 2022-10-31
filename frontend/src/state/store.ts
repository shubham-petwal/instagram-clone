import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/index'

export const store = configureStore({reducer : userReducer , middleware:[]})
