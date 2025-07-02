import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  asyncCreatetodo,
  asyncDeletetodo,
  asyncTogglecompleted,
  asyncUpdatetodo,
} from '../store/acitons/Todoactions'
import { toast } from 'react-toastify'

const Todos = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const todos = useSelector((state) => state.todoReducers.todos)

  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")
  const [completed, setCompleted] = useState(false)
  const date = new Date()

  const loadtodohandler = (todo) => {
    todo.id = nanoid()
    todo.completed = false
    dispatch(asyncCreatetodo(todo))
    reset()
  }

  const updateHandler = (todo) => {
    setEditingId(todo.id)
    setEditText(todo.task)
  }

  const saveHandler = (id) => {
    dispatch(asyncUpdatetodo(id, editText))
    setEditingId(null)
    setEditText("")
  }

  const cancelHandler = () => {
    setEditingId(null)
    setEditText("")
  }

  const deleteHandler = (id, todos) => {
    const isTrue = window.confirm("Are you sure to delete this todo?")
    if (isTrue) {
      dispatch(asyncDeletetodo(id, todos))
    } else {
      toast.info("Todo is safe")
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center px-4 py-10 '>
      {/* Input Form */}
      <form
        className='w-full max-w-2xl p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-4 bg-white shadow'
        onSubmit={handleSubmit(loadtodohandler)}
      >
        <div className='flex flex-col w-full sm:flex-1'>
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
            className='w-full px-4 py-2 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition duration-200'
          />
          {errors.task && (
            <small className='text-red-500 mt-1'>{errors.task.message}</small>
          )}
        </div>

        <button
          className='w-full sm:w-auto bg-white border-2 text-[#3c6473] hover:bg-[#3c6473] hover:text-white px-4 py-2 rounded-md font-semibold transition'
          type='submit'
        >
          Add Task
        </button>
      </form>

      {/* Todo List */}
      <div className='w-full max-w-2xl mt-8 h-[60vh] sm:h-[70vh] overflow-y-auto px-2 scrollbar-thin [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-[#66c4c2] [&::-webkit-scrollbar-thumb]:rounded-full'>
        <h2 className='text-xl font-bold text-gray-700 mb-4 text-center sm:text-left'>Your Tasks</h2>

        {todos.length === 0 ? (
          <p className='text-gray-500 text-center'>No tasks yet.</p>
        ) : (
          <div className='flex flex-col gap-4'>
            {todos.map((todo) => (
              <div key={todo.id} className={`${todo.completed ? "bg-zinc-100" : "bg-white"} p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 rounded-lg shadow-sm border-l-4 border-[#518399]`}>
                {editingId === todo.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className='border px-3 py-1 rounded w-full sm:w-1/2 text-sm outline-none shadow-md shadow-green-200'
                  />
                ) : (
                  <div className='flex items-start gap-3 flex-1'>
                    <input
                      type='checkbox'
                      onChange={() => dispatch(asyncTogglecompleted(todo.id))}
                      checked={todo.completed}
                      className='w-5 h-5 accent-green-500 mt-1'
                    />
                    <div>
                      <h1 className={`text-lg font-medium break-words ${todo.completed ? 'line-through text-red-500' : ''}`}>
                        {todo.task}
                      </h1>
                      <p className='text-sm text-gray-500'>{date.toLocaleDateString()}</p>
                    </div>
                  </div>
                )}

                <div className='flex gap-2 flex-wrap justify-end'>
                  {editingId === todo.id ? (
                    <>
                      <button
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm'
                        onClick={() => saveHandler(todo.id)}
                      >
                        Save
                      </button>
                      <button
                        className='bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm'
                        onClick={cancelHandler}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    todo.completed ? (
                      <>
                        <span className="text-green-600 font-semibold text-sm uppercase tracking-wide px-2 border border-green-400 rounded">
                          Completed
                        </span>
                        <button
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm'
                          onClick={() => deleteHandler(todo.id, todo)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className='bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 rounded text-sm'
                          onClick={() => updateHandler(todo)}
                        >
                          Update
                        </button>
                        <button
                          className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm'
                          onClick={() => deleteHandler(todo.id, todo)}
                        >
                          Delete
                        </button>
                      </>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Todos
