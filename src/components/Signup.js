import React, { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../notes-context/AlertContext'
const Signup = () => {
  const context = useContext(alertContext);
  const { setAlert, showAlert } = context;
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    if (password === cpassword) {
      const url = "http://localhost:5000/api/auth/createuser"
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      const json = await response.json()
      if (json.success) {
        //login user
        localStorage.setItem("token", json.authtoken);
        setAlert({ msg: "Account Created successfully", type: "success" })
        showAlert();
        navigate("/home")
      }
      else {
        let mess = json.errors;
        console.log(mess)
        setAlert({ msg: mess, type: "warning" })
        showAlert();
      }
    }
    else {
      setAlert({ msg: "Password and Confirm password not matched", type: "warning" })
      showAlert();
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className="card shadow-sm text-center container text-bg-secondary mt-5" style={{ height: "350px", width: "500px" }}>
        <div className="card-body">
          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-bold">Sign up</h1>

              <div className="form-floating">
                <div className="input-group mb-3">
                  <span className="input-group-text">Name</span>
                  <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} placeholder="Full Name" required />
                </div>
              </div>
              <div className="form-floating">
                <div className="input-group mb-3">
                  <span className="input-group-text">Email</span>
                  <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} placeholder="Email" required />
                </div>
              </div>
              <div className="form-floating">
                <div className="input-group mb-3">
                  <span className="input-group-text">Password</span>
                  <input type="password" className="form-control" id="password" onChange={onChange} value={credentials.password} minLength={8} name="password" placeholder="Password" required />
                </div>
              </div>
              <div className="form-floating">
                <div className="input-group mb-3">
                  <span className="input-group-text">Confirm Password</span>
                  <input type="password" className="form-control" id="cpassword" onChange={onChange} value={credentials.cpassword} minLength={8} name="cpassword" placeholder="Confirm Password" required />
                </div>
              </div>
              <button type='submit' className="btn btn-success ms-2" onSubmit={handleSubmit}>Submit</button>
              <button type='reset' className="btn btn-success ms-2">Reset</button>
            </form>
          </main>
        </div>
      </div>
    </>
  )
}

export default Signup
