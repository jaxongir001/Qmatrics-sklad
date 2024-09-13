import { useState } from 'react';
import { HiOutlineUsers, HiOutlineBars3 } from 'react-icons/hi2';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';
import logo from "../assets/logo.Webp";
import '../Css/Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Overlay faqat sidebar ochilganda paydo bo'ladi */}
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
              {/* Ikonlar sidebar yopilganda ham ko'rinadi */}
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