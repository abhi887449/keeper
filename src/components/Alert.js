import React, { useContext } from 'react'
import alertContext from '../notes-context/AlertContext';

const Alert = () => {
  const context =useContext(alertContext);
  const {Alert}=context;
  const capitalise = (word)=>{
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <>
      <div className={`alert alert-${Alert.type} alert-dismissible fade show ${(Alert.type === "")? "d-none":""}`} role="alert">
      <strong>{capitalise(Alert.type)}</strong>: {Alert.msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </>
  )
}

export default Alert
