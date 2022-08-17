import React, { useContext } from 'react'
import sicon from '../images/search-icon.png'
import logo from '../images/Keeper-logo.png'
import hamburger from '../images/hamburger-icon.png'
import '../css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import alertContext from '../notes-context/AlertContext'
import { useState } from 'react'
const Navbar = () => {
    const contxt = useContext(alertContext);
    const { setAlert, showAlert } = contxt;
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
        setAlert({ msg: "Logout successfully", type: "success" })
        showAlert();
    }
    const [names, setName] = useState({ Name: "", Email: "", Date: "" });
    const getName = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/getuserdata"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setName({ Name: json.name, Email: json.email, Date: json.date })
    }

    return (
        <>
            <div className="row gridgap">
                <div className={`col-sm-2 ${(localStorage.getItem("token"))? "d-none":""}`}>
                    <span className="d-flex justify-content-start">
                        <img onLoad={getName} src={hamburger} alt="logo" className="m-2 rounded-circle logo" />
                        <img src={logo} alt="logo" className="m-2 rounded-circle logo" />
                        <Link className="m-2 text-decoration-none keeper" to="/">Keeper</Link>
                    </span>
                </div>
                
                {(localStorage.getItem("token")) ? <>
                <div className="col-sm-2">
                    <span className="d-flex justify-content-start">
                        <img onLoad={getName} src={hamburger} alt="logo" className="m-2 rounded-circle logo" />
                        <img src={logo} alt="logo" className="m-2 rounded-circle logo" />
                        <Link className="m-2 text-decoration-none keeper" to="/">Keeper</Link>
                    </span>
                </div>
                <div className="col-sm-7">
                    <span className=" d-flex justify-content-center m-2 keeper">
                        <input className='rounded-pill p-2 fs-6 border border-secondary s-bar' type="search" placeholder='Search here' />
                        <i className='ms-2'><img src={sicon} height="30px" width="30px" alt="" /></i>
                    </span>
                </div>
                    <div className="col-sm-2">
                        <div className="dropdown m-2">
                            <Link to="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <strong>{names.Name}</strong>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><Link className="dropdown-item" to="/about">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/home">Home</Link></li>
                                <li><button className="dropdown-item" to="#" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    </div></> : <div className="col-sm-9 d-flex justify-content-end">
                    <Link class="btn btn-info m-2" to="/login" role="button">Login</Link>
                    <Link class="btn btn-info m-2" to="/signup" role="button">Signup</Link>
                </div>}
            </div>
        </>
    )
}

export default Navbar
