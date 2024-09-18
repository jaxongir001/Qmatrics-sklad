import { useState } from 'react';
import { HiOutlineUsers, HiOutlineBars3 } from 'react-icons/hi2';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import logo from "../assets/logo.Webp";
import '../Css/Sidebar.css';


const Sidebar = () => {
  // Set initial state to true to keep sidebar collapsed by default
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay appears only when the sidebar is open */}
      {!isCollapsed && <div className="overlay" onClick={handleToggle}></div>}
      <div className='Big_css'>
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="Logo" onClick={handleToggle}>
            <img src={logo} alt="Logo" className="logo_image" />
            {!isCollapsed && <h2 className="logo-title">Qmatrics SKLAD</h2>}
            <button className="sidebar-toggle" onClick={handleToggle}>
              {isCollapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
            </button>
          </div>

          <ul>
            <li>
              {/* Icons are always visible */}
              <HiOutlineUsers className="users icon" />
              <a className='user' href="#">Сотрудники</a>
            </li>
            <li>
              <HiOutlineBars3 className="line icon" />
              <a href="#">Проекты</a>
            </li>
          </ul>

        </div>

      </div>
      
    </>
  );
};

export default Sidebar;
