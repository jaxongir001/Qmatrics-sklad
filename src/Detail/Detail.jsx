import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import './Detail.css';

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    // Sample data for the table, replace this with your actual data
    const tableData = [
        { col1: "Data 1", col2: "Data 2", col3: "Data 3" },
        { col1: "Data 4", col2: "Data 5", col3: "Data 6" },
        // Add more data as needed
    ];

    // Filter logic based on the search term
    const filteredData = tableData.filter(item =>
        Object.values(item).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="dashboard-container">
            <div className='dashboard-content'>
                <div className='breadcrumb'>
                    <span className='breadcrumb-span'>Проекты</span>
                    <MdArrowForwardIos className='breadcrumb-arrow' aria-label="Next" />
                    <IoIosArrowRoundBack className='breadcrumb-left-arrow' aria-label="Back" />
                </div>
                <div className='project-header'>
                    <h1>rztdtjlxQLWsYyVkKh2Dyg</h1>
                    <p>RP-24-001</p>
                </div>
                <div className='project-details-grid'>
                    <div className='detail-item'>
                        <span className='detail-label'>Статус</span>
                        <span className='detail-value'>
                            <span className='status-dot not-started'></span>
                            Не запущено
                        </span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Имя ответственного</span>
                        <span className='detail-value'>Project manager</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Дата начала</span>
                        <span className='detail-value'>21.08.2024</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Общей кол задач</span>
                        <span className='detail-value'>103</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Общей вып кол задач</span>
                        <span className='detail-value'>0</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Кол выпол от общей</span>
                        <span className='detail-value'>0 / 103</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Проценты</span>
                        <span className='detail-value'>0,00%</span>
                    </div>
                    <div className='detail-item'>
                        <span className='detail-label'>Место хранения папки</span>
                        <a href="https://drive.google.com/drive/folders/1s8vR7s9lljwnrhme35Pe-hh5LlYDueYS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='detail-value folder-link'>
                            https://drive.google.com/drive/folders/1s8v...
                        </a>
                    </div>
                </div>
                <div className='search-input-wrapper'>
                    <CiSearch className='SearchIcon' />
                    <input
                        type="text"
                        placeholder="Поиск"
                        className="search-input"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='table-container'>
                    <table className='details-table'>
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 2</th>
                                <th>Column 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.col1}</td>
                                        <td>{item.col2}</td>
                                        <td>{item.col3}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;