
import './Container/Container.css'
import './App.css'
import List from './List/List'
import SadeBar from './Components/Sidebar'
import Table from '../list/src/Table'

function App() {


  return (
    <>
    <div className='bigCont'>
      <SadeBar className='sidebar' />
      <List className='list' />


    </div>
    <Table/>
    </>
  )
}

export default App
