import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import TodoSlice from "./reducers/TodoSlice"



export const store=configureStore({

        reducer:{
           todoReducers:TodoSlice,
        }

    }
)

 


