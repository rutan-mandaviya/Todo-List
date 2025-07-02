import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import MyList from '../../pages/MyList'

const initialState={
    mylist:[]
}

const MyListSlice = createSlice({

    name:"mylist",
    initialState,
    reducers:{
        Addlist:(state,action)=>{
            state.mylist=[...state,action.payload]
        },
    }
})

export default MyListSlice