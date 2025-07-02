import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks } from "react-icons/fa"
import { FiPlus } from "react-icons/fi"

const MyList = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center px-4'>
      <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[30%] h-[80%] bg-white rounded-xl shadow-md overflow-y-auto scrollbar scrollbar-thumb-[#66c4c2] scrollbar-track-[#fefaf4]  flex flex-col relative">

        {/* Title */}
        <h1 className='text-[rgb(84,141,164)] text-2xl font-semibold text-center py-4 sticky top-0 bg-white z-10'>My Lists</h1>

        {/* Task Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
          {Array.from({ length: 12 }).map((_, i) => (
            <Link key={i} to={'/todos'}>
              <button className='bg-[#fefaf4] text-[#e2c985] rounded-2xl w-full h-44 flex flex-col items-center justify-center gap-4'>
                <div className="bg-[#fcf1e0] rounded-full p-4">
                  <FaTasks className='text-[#e2c985] text-2xl' />
                </div>
                <div className="text-center">
                  <h1 className='font-semibold'>All Task</h1>
                  <p className='font-light text-sm'>137 items</p>
                </div>
              </button>
            </Link>
          ))}
        </div>

        {/* ✅ Fixed-Like Floating Button INSIDE scrollable container */}
        <div className="sticky bottom-4 flex justify-end pr-4 z-20  pt-4">
          <button className='bg-[#66c4c2] rounded-full p-4 shadow-md hover:bg-[#4eb8b6] transition'>
            <FiPlus className='text-3xl text-white' />
          </button>
        </div>

      </div>
    </div>
  )
}

export default MyList
