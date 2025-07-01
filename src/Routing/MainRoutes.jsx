import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Pagenotfound from '../pages/Pagenotfound'
import Todos from '../pages/Todos/'
// import Todos from '../pages/Todos/'
const MainRoutes = () => {
  return (
    <div>

        <Routes>
            <Route path='/' element={<Todos></Todos>}>
            {/* <Route path='/todos' element={<Todostask></Todostask>}></Route> */}
            </Route>
            <Route path='*' element={<Pagenotfound></Pagenotfound>}></Route>
        </Routes>

    </div>
  )
}

export default MainRoutes