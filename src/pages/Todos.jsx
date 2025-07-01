import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { asyncCreatetodo, asyncDeletetodo, asyncTogglecompleted, asyncUpdatetodo } from '../store/acitons/Todoactions'

import { toast } from 'react-toastify'

const Todos = () => {
  const dispatch = useDispatch()
 

  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const todos = useSelector((state) => state.todoReducers.todos)  // 👈 Grab todos from redux
  console.log(todos);
  

  const loadtodohandler = (todo) => {
    todo.id = nanoid()
    todo.completed=false
    dispatch(asyncCreatetodo(todo))
    reset()
  }

const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");

const updateHandler = (todo) => {
  setEditingId(todo.id);
  setEditText(todo.task);
};

const saveHandler = (id) => {
  dispatch(asyncUpdatetodo(id, editText));
  setEditingId(null);
  setEditText("");
};

const cancelHandler = () => {
  setEditingId(null);
  setEditText("");
};

const deleteHandler = (id, todos) => {
  const istrue=window.confirm("are you sure to delete this todo ??")
  console.log(istrue);
  if(istrue){

    dispatch(asyncDeletetodo(id, todos));
  }
  else{
    toast.info("todo is safe")
  }
  

};
const [completed, setcompleted] = useState(false);
const date=new Date();
// console.log(date.toLocaleDateString());




  return (
    <div className='w-full flex flex-col items-center min-h-screen  py-10'>
      
      {/* Input Form */}
      <form
        className='w-full max-w-xl  p-6 rounded-lg  flex  gap-4'
        onSubmit={handleSubmit(loadtodohandler)}
      >
        <div className='flex flex-col'>
          <input
            {...register("task", {
              required: "Task is required!",
              minLength: {
                value: 6,
                message: "Minimum length is 6"
              }
            })}
            type='text'
            placeholder='Enter task'
            className='px-4 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
          />
          {errors.task && (
            <small className='text-red-500 mt-1'>{errors.task.message}</small>
          )}
        </div>

        <button
          className='bg-white h-fit border-2 text-[#3c6473] hover:bg-[#3c6473] hover:text-white  hover:border- px-4 py-2 rounded-md font-semibold'
          type='submit'
        >
          Add Task
        </button>
      </form>

      {/* Todo List */}
     <div className='w-full flex flex-col items-center  '>
  <h2 className='text-xl font-bold text-gray-700 mb-4'>Your Tasks</h2>

  {todos.length === 0 ? (
    <p className='text-gray-500 text-center'>No tasks yet.</p>
  ) :(
     
    <div className="flex flex-col gap-4">

      {todos.map((todo,index)=>(
          <div key={todo.id} className="bg-white p-4 flex  justify-between items-center rounded-lg shadow-sm border-l-4 border-[#518399]">

            {editingId ==todo.id ?(
            <input
            value={editText}
            onChange={(e)=>setEditText(e.target.value)}
            className='border px-3 py-1 rounded w-1/2 text-sm outline-none shadow-md shadow-green-200'
            />)
            
:(
  <div className='flex items-center sm:flex-col justify-center gap-4'>
    <input
      type="checkbox"
      onChange={()=>dispatch(asyncTogglecompleted(todo.id))}
      checked={todo.completed}
      className="w-5 h-5 accent-green-500 mr-2"
    />
    <h1 className={`text-xl  font-medium transition-all duration-200 ${todo.completed ? 'line-through text-red-500' : ''}`}>
      {todo.task}
      <p className='text-sm'>

      {date.toLocaleDateString()}
      </p>
    </h1>
  </div>
)}



            <div className="flex  gap-2">
            {todo.id==editingId?(
              <>
                <button className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm' onClick={()=>saveHandler(todo.id)}>Save</button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm" onClick={cancelHandler}>Cancle</button>
                </>
              
            ):
            (
              
              
              <>
                <button className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded text-sm' onClick={()=>updateHandler(todo)}>Update</button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" onClick={()=>deleteHandler(todo.id,todo)}>Delete</button>
                </>


            )
            
            }

            </div>

          </div>

      ))}

    </div>

  )
  //  ( 
  //  <div className='flex flex-col gap-4'>
  //     {todos.map((todo) => (
  //       <div
  //         key={todo.id}
  //         className='bg-white p-4 flex justify-between items-center rounded-lg shadow-sm border-l-4 border-[#518399]'
  //       >
  //         {editingId === todo.id ? (
  //           <input
  //             value={editText}
  //             onChange={(e) => setEditText(e.target.value)}
  //             className='border px-3 py-1 rounded w-2/3 text-sm outline-none'
  //           />
  //         ) : (
  //           <p className='text-gray-800 font-medium'>{todo.task}</p>
  //         )}

  //         <div className='flex gap-2'>
  //           {editingId === todo.id ? (
  //             <>
  //               <button
  //                 onClick={() => saveHandler(todo.id)}
  //                 className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm'
  //               >
  //                 Save
  //               </button>
  //               <button
  //                 onClick={cancelHandler}
  //                 className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm'
  //               >
  //                 Cancel
  //               </button>
  //             </>
  //           ) : (
  //             <>
  //               <button
  //                 onClick={() => updateHandler(todo)}
  //                 className='bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm'
  //               >
  //                 Update
  //               </button>
  //               <button
  //                 onClick={() => deleteHandler(todo.id, todos)}
  //                 className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm'
  //               >
  //                 Delete
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     ))}
  //   </div>)
  }
</div>

    </div>
  )
}

export default Todos
