import './list.css';
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState, useRef, useCallback, useEffect } from 'react';
import project from './projects.json';

function List() {
    const [activeIndex, setActiveIndex] = useState(null);
    const optionsRef = useRef(null);

    const toggleOptions = useCallback((index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    }, []);

    const handleClickOutside = useCallback((event) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setActiveIndex(null);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <>
        <div className='BigBox'>


            <div className='NavigationBox'>
                <div className='Navigation'>
                    <div className='Box1'>
                        < IoReorderThreeOutline className='SidebarIcon' />
                        <div className='TextTitle'><h2>Сотрудники</h2></div>
                    </div>

                    <div className='search-bar-container'>
                        <div className='search-input-wrapper'>
                            <CiSearch className='SearchIcon' />
                            <input type="text" placeholder="Поиск" className="search-input" aria-label="Search" />
                        </div>
                        <button className="add-button">
                            <BsPlus className='plus' />
                            <p className='AddButtonText'>Добавить</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className='body'>
                <div className='Main-List-Div'>
                    {project.map((item, index) => (
                        <div key={item.id}>
                            <div className='List-div'>
                                <div className='Main-item-div'>
                                    <p className='P-name'>{item.project_number}</p>
                                    <p className='p-role'>{item.project_name || 'Loyiha nomi mavjud emas'}</p>
                                </div>

                                <div className='Secondary-item-div'>
                                    <PiDotsThreeOutlineFill className='ThreeDots'
                                        onClick={() => toggleOptions(index)}
                                        aria-haspopup="true"
                                        aria-expanded={activeIndex === index} />

                                    {activeIndex === index && (
                                        <div className='options' ref={optionsRef}>
                                            <div className='sticky-options'>
                                                <button className="edit-button">
                                                    <p className='ButtonText'>Tahrirlash</p>
                                                </button>
                                                <button className="delete-button">
                                                    <p className='ButtonText'>Ochirish</p>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='Line'>
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

export default List;