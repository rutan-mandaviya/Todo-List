import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Pagenotfound from '../pages/Pagenotfound'
import Todos from '../pages/Todos/'
import MyList from '../pages/MyList'
// import Todos from '../pages/Todos/'
const MainRoutes = () => {
  return (
    <div>

        <Routes>
            <Route path='/' element={<MyList></MyList>}/>
            <Route path='/todos' element={<Todos></Todos>}>
            {/* <Route path='/todos' element={<Todostask></Todostask>}></Route> */}
            </Route>
            <Route path='*' element={<Pagenotfound></Pagenotfound>}></Route>
        </Routes>

    </div>
  )
}

export default MainRoutes