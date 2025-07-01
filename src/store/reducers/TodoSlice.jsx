import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initialState={
    todos:[]
}

const TodoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
       Loadtodo:(state,action)=>{
        state.todos=[...state.todos,action.payload] } ,
        
       Removetodo:(state,action)=>{
        state.todos=state.todos.filter((todos)=>todos.id !==action.payload)
     } ,
     Updatetodo: (state, action) => {
    const { id, updatedTask } = action.payload;
    state.todos = state.todos.map(todo =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    );
  },

  Togglecompleted:(state,action)=>{
   state.todos= state.todos.map((items)=>(action.payload ==items.id) ?{...items,completed:!items.completed}:items)
  }

    
    
    }
})



export default TodoSlice.reducer
export const {Loadtodo,Removetodo,Updatetodo,Togglecompleted} =TodoSlice.actions