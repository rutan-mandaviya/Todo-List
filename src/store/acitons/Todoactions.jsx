import React from 'react'
import { Loadtodo, Removetodo, Togglecompleted, Updatetodo } from '../reducers/TodoSlice'




export const asyncCreatetodo=(todos)=>(dispatch,getState)=>{
   dispatch(Loadtodo(todos))
   
}
export const asyncDeletetodo=(id)=>(dispatch,getState)=>{
   
   dispatch(Removetodo(id))
   
}
export const asyncTogglecompleted=(id)=>(dispatch,getState)=>{
   
   dispatch(Togglecompleted(id))
   
}


export const asyncUpdatetodo = (id, updatedTask) => (dispatch) => {
  dispatch(Updatetodo({ id, updatedTask }));
};
