import React from 'react'
import note from '../images/note-icon.png'
import alarm from '../images/alarm-icon.png'
import add from '../images/add-icon.png'
import archive from '../images/archived-icon.png'
import { Link, useLocation } from 'react-router-dom';
import '../css/Sidebar.css'

const Sidebar = () => {
    let location = useLocation();
    return (
        <>
            <div className={`d-flex flex-column flex-shrink-0 mt-2 text-bg-dark ${!(localStorage.getItem("token"))?"d-none":""}`} style={{ width: 280, height: "100vh" }}>
                <ul className="nav nav-pills flex-column mb-auto">
                    <Link className='text-decoration-none text-white' to={'/home'}>
                        <li id='add' className={`nav-item rounded-end ${(location.pathname==="/home")? "fixbgc":"hover"}`}>
                            <img className='iconsize' src={add} alt="" />
                            <span>Create</span>
                        </li>
                    </Link>
                    <Link className='text-decoration-none text-white' to={'/notes'}>
                        <li id='note' className={`nav-item rounded-end ${(location.pathname==="/notes")? "fixbgc":"hover"}`}>
                            <img className='iconsize' src={note} alt="" />
                            <span>Notes</span>
                        </li>
                    </Link>
                    <Link className='text-decoration-none text-white' to={'/remainders'}>
                        <li id='remainder' className={`nav-item rounded-end ${(location.pathname==="/remainders")? "fixbgc":"hover"}`}>
                            <img className='iconsize' src={alarm} alt="" />
                            <span>Remainder</span>
                        </li>
                    </Link>
                    <Link className='text-decoration-none text-white' to={'/archived'}>
                        <li id='archived' className={`nav-item rounded-end ${(location.pathname==="/archived")? "fixbgc":"hover"}`}>
                            <img className='iconsize' src={archive} alt="" />
                            <span>Archived</span>
                        </li>
                    </Link>
                </ul>
            </div>
            <div />
        </>
    )
}

export default Sidebar;
