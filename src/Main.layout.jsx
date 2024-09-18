import { Outlet } from 'react-router-dom'
import SadeBar from './Components/Sidebar'

export const MainLayout = () => {
    return (
        <div className='bigCont'>
            <SadeBar className='sidebar' />
            <Outlet />
        </div>
    )
}