import './list.css';
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { BsPlus } from "react-icons/bs";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import project from './projects.json';
import { Link } from 'react-router-dom';

// ResponsiveToggleForm component
const ResponsiveToggleForm = ({ isOpen, onClose, projectData, onSubmit }) => {
    const [formData, setFormData] = useState({
        project_number: '',
        project_name: '',
        description: ''
    });

    useEffect(() => {
        if (projectData) {
            setFormData({
                project_number: projectData.project_number || '',
                project_name: projectData.project_name || '',
                description: projectData.description || ''
            });
        }
    }, [projectData]);

    
    useEffect(() => {
        // Функция для получения данных из API
        const fetchProjects = async () => {
          try {
            let response = await axios.get("https://66c9-2a05-45c2-2012-9300-352c-c719-df7-76ca.ngrok-free.app/api/projects", {
                headers: {
                    'Accept': 'application/json' // JSON formatida ma'lumot so'rovini yuborish
                }
            });
            console.log(response);
            
            // setProjects(response.data.projects);
            // setLoading(false);
          } catch (error) {
            console.log(error.message)
            // setError(error.message);
            // setLoading(false);
          }
        };
    
        fetchProjects();
      }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '400px',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '15px',
                    borderBottom: '1px solid #e0e0e0',
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>Loyihani tahrirlash</h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                        }}
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="project_number"
                            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                        >
                            Loyiha raqami
                        </label>
                        <input
                            type="text"
                            id="project_number"
                            name="project_number"
                            value={formData.project_number}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="project_name"
                            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                        >
                            Loyiha nomi
                        </label>
                        <input
                            type="text"
                            id="project_name"
                            name="project_name"
                            value={formData.project_name}
                            onChange={handleInputChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label
                            htmlFor="description"
                            style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                        >
                            Tavsif
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        Saqlash
                    </button>
                </form>
            </div>
        </div>
    );
};

// List component
function List() {
    const [projects, setProjects] = useState(project);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmAdd = () => {
        console.log('Yangi loyiha qo\'shish tasdiqlandi');
        closeModal();
    };

    const openEditForm = (project) => {
        setSelectedProject(project);
        setIsEditFormOpen(true);
        setActiveIndex(null);
    };

    const closeEditForm = () => {
        setIsEditFormOpen(false);
        setSelectedProject(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEditSubmit = (updatedProject) => {
        setProjects(prevProjects =>
            prevProjects.map(p =>
                p.id === selectedProject.id ? { ...p, ...updatedProject } : p
            )
        );
        closeEditForm();
    };
    

    const filteredProjects = projects.filter((item) =>
        item.project_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.project_name && item.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className='BigBox'>
                <div className='NavigationBox'>
                    <div className='Navigation'>
                        <div className='Box1'>
                            <IoReorderThreeOutline className='SidebarIcon' />
                            <div className='TextTitle'><h2>Сотрудники</h2></div>
                        </div>

                        <div className='search-bar-container'>
                            <div className='search-input-wrapper'>
                                <CiSearch className='SearchIcon' />
                                <input
                                    type="text"
                                    placeholder="Поиск"
                                    className="search-input"
                                    aria-label="Search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <button className="add-button" onClick={openModal}>
                                <BsPlus className='plus' />
                                <p className='AddButtonText'>Добавить</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='body'>
                    <div className='Main-List-Div'>
                        {filteredProjects.map((item, index) => (
                            <div key={item.id}>
                                <div className='List-div'>
                                    <Link className='Main-item-div' to={"/detail"}>
                                        <p className='P-name'>{item.project_number}</p>
                                        <p className='p-role'>{item.project_name || 'Loyiha nomi mavjud emas'}</p>
                                    </Link>

                                    <div className='Secondary-item-div'>
                                        <PiDotsThreeOutlineFill className='ThreeDots'
                                            onClick={() => toggleOptions(index)}
                                            aria-haspopup="true"
                                            aria-expanded={activeIndex === index} />

                                        {activeIndex === index && (
                                            <div className='options' ref={optionsRef}>
                                                <div className='sticky-options'>
                                                    <button className="edit-button" onClick={() => openEditForm(item)}>
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

            {isModalOpen && (
                <div className="modal-background">
                    <div className="modal-container">
                        <div className="modal-question">
                            Вы точно хотите добавить новый проект?
                        </div>
                        <div className="modal-buttons">
                            <button className="modal-button modal-button-yes" onClick={handleConfirmAdd}>
                                Да
                            </button>
                            <button className="modal-button modal-button-no" onClick={closeModal}>
                                Нет
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ResponsiveToggleForm
                isOpen={isEditFormOpen}
                onClose={closeEditForm}
                projectData={selectedProject}
                onSubmit={handleEditSubmit}
            />
        </>
    );
}

export default List;