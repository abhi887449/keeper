import React,{useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../notes-context/AlertContext';

const Login = () => {
  const context =useContext(alertContext);
  const {setAlert,showAlert}=context;
  const [credentials,setCredentials] = useState({email: "",password:""})
  let navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login"
    const response = await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:credentials.email,password:credentials.password})
    });
    const json = await response.json()
    if(json.success){
      //login user
      localStorage.setItem("token",json.authtoken);
      setAlert({msg:"Login successfully",type:"success"})
      showAlert();
      navigate("/home")
    }
    else{
      let mess = json.errors;
      setAlert({msg:mess,type:"warning"})
      showAlert();
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}
  return (
    <>
     <div className="card shadow-sm text-center container text-bg-secondary mt-5" style={{height:"250px",width:"500px"}}>
    <div className="card-body">
    <main className="form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-bold">Login</h1>
    
        <div className="form-floating">
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" placeholder="Email" required />
        </div>
        </div>
        <div className="form-floating">
        <div className="input-group mb-3">
          <span className="input-group-text">Password</span>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" minLength={8} required />
        </div>
        </div>
        <button type='submit' className="btn btn-success ms-2">Submit</button>
        <button type='reset' className="btn btn-success ms-2">Reset</button>
      </form>
    </main>
    </div>
    </div> 
    </>
  )
}

export default Login
