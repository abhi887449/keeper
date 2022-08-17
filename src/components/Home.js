import React,{ useContext } from 'react'
import noteContext from "../notes-context/NoteContext"
import { useState } from 'react';
import alertContext from '../notes-context/AlertContext';

const Home = () => {
  const contxt =useContext(alertContext);
  const {setAlert,showAlert}=contxt;
  const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({ id: "", title: "", description: "", archived:"false", alarm_date:"NaN", alarm_time:"NaN"})
    const handleAddNote = (e)=>{
      e.preventDefault();
      addNote(note.title,note.description,note.archived,note.alarm_date,note.alarm_time)
      let inp1 = document.getElementById("title")
      inp1.value=""
      let inp2 = document.getElementById("description")
      inp2.value=""
      let inp3 = document.getElementById("alarm_time")
      inp3.value=""
      let inp4 = document.getElementById("alarm_date")
      inp4.value=""
      setNote({title:"",description:"",alarm_date:"NaN",alarm_time:"NaN"})
      setAlert({msg:"Note added successfully",type:"success"})
      showAlert();
    }
    const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }
    const resetinputs = (e)=>{
      let inp1 = document.getElementById("title")
      inp1.value=""
      let inp2 = document.getElementById("description")
      inp2.value=""
      let inp3 = document.getElementById("alarm_time")
      inp3.value=""
      let inp4 = document.getElementById("alarm_date")
      inp4.value=""
      setNote({title:"",description:"",alarm_date:"NaN",alarm_time:"NaN"})
    }
  return (
    <>
    <div className={`card text-center text-bg-secondary mt-3 ${!(localStorage.getItem("token"))?"d-none":""}`}>
      <div className="card-header fs-5">
        Take a note...
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text">Title</span>
          <input type="text" className="form-control" id="title" name="title" placeholder="Write title here..." onChange={onChange} required="" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Description</span>
          <textarea className="form-control" placeholder='Write description here...' id="description" name='description' onChange={onChange}></textarea>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Set Remainder(optional)</span>
          <input type="time" className="form-control" onChange={onChange} name="alarm_time" id="alarm_time" required="" />
          <input type="date" className="form-control" onChange={onChange} name="alarm_date" id="alarm_date" required="" />
        </div>

        <button disabled={note.title.length<2 || note.description.length<5} className="btn btn-success me-2" onClick={handleAddNote}>Add Note</button>
        <button type='reset' className="btn btn-success ms-2" onClick={resetinputs}>Reset</button>
      </div>
    </div>
    </>
  )
}

export default Home
