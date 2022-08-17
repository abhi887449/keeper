import { useState } from 'react'
import AlertContext from './AlertContext';
const AlertState = (props) => {
    const [Alert,setAlert] = useState({msg:"",type:""})
    const showAlert = ()=>{
      setTimeout(() => {
        setAlert({msg:"",type:""})
      }, 2500);
    }
  return (
    <AlertContext.Provider value={{Alert,setAlert,showAlert}}>
      {props.children}
    </AlertContext.Provider>
  )
}
export default AlertState;