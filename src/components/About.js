import React, { useState } from 'react'
import logo from '../images/Keeper-logo.png'
import '../css/About.css'
const About = () => {
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
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-5 fw-bold text-white">{names.Name}</h1>
          <div className='col-lg-6 mx-auto animation'>
            <p className="fs-5 mb-1"><b>Email:</b> {names.Email}</p>
            <p className="fs-5 mb-4"><b>Date joined Keeper:</b> {names.Date}</p>
          </div>
          <img onLoad={getName} className="rounded-circle" height="50px" width="50px" src={logo} alt="" /> 
          <span className='fs-5 fw-bold ms-2'>Keeper</span>
        </div>
      </div>
    </>
  )
}

export default About
