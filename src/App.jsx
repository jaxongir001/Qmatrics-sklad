import './Container/Container.css'
import './App.css'
import SadeBar from './Components/Sidebar'

import List from './List/List'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Detail/Detail'
import { MainLayout } from './Main.layout'
// import Table from './assets/src/Table'

function App() {


  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<List />} />
          <Route path='/detail' element={<Dashboard />} />
        </Route>
      </Routes>
      {/* <Table/> */}
    </>
  )
}

export default App
