import React, { useContext, useState } from 'react'
import noteContext from "../notes-context/NoteContext"
import alarm from '../images/alarm-icon.png'
import { useEffect, useRef } from 'react';
import alertContext from '../notes-context/AlertContext';
import { useNavigate } from 'react-router-dom';
const Archived = () => {
    let navigate = useNavigate();
    const contxt = useContext(alertContext);
    const { setAlert, showAlert } = contxt;
    const context = useContext(noteContext);
    const { notes, deleteNote, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", earchived: "true", ealarm_date: "", ealarm_time: "" })
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, earchived: currentNote.archived, ealarm_date: currentNote.alarm_date, ealarm_time: currentNote.alarm_time })
    }
    const del = (id) => {
        deleteNote(id);
        setAlert({ msg: "Note deleted successfully", type: "success" })
        showAlert();

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const update = () => {
        editNote(note.id, note.etitle, note.edescription, note.earchived, note.ealarm_date, note.ealarm_time)
        refclose.current.click()
        setAlert({ msg: "Note updated successfully", type: "success" })
        showAlert();
    }
    const unarchivedNote = (currentNote)=>{
        editNote(currentNote._id, currentNote.title, currentNote.description,"false", currentNote.alarm_date, currentNote.alarm_time)
        setAlert({ msg: "Note marked unarchived successfully", type: "success" })
        showAlert();
    }

    return (
        <>
            {/* <!-- Button trigger modal --> */}
            <div ref={ref} type="button" className='d-none' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-bg-secondary">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Note...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Title</span>
                                <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" minLength={5} placeholder="Write title here..." onChange={onChange} required="" />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Description</span>
                                <textarea className="form-control" value={note.edescription} placeholder='Write description here...' minLength={5} id="edescription" name='edescription' onChange={onChange}></textarea>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Set Remainder(optional)</span>
                                <input type="time" className="form-control" value={note.ealarm_time} onChange={onChange} name="ealarm_time" id="etime" required="" />
                                <input type="date" className="form-control" value={note.ealarm_date} onChange={onChange} name="ealarm_date" id="edate" required="" />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Dismiss</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-success" onClick={update}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-white fs-1 font-monospace fw-bold d-flex justify-content-center">
                <div className={notes.length === 0 && 'my-5'}>
                    {notes.length === 0 && 'No note to display'}
                </div>
            </div>
            <div className="container mt-3">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {notes.map((note) => {
                        if(note.archived==="true"){
                        return (
                            <>
                                <div className="col" key={note._id}>
                                    <div className="card shadow-sm">
                                        <div className="card-body text-bg-secondary">
                                            <h5 className="card-title fw-bold text-decoration-line-through">{note.title}<span className={`badge bg-warning ms-2 ${(note.alarm_date === "NaN" && note.alarm_time === "NaN") ? "d-none" : ""}`}><img height="20px" width="20px" src={alarm} alt="" /> <span id="demo"></span></span></h5>
                                            <p className="card-text text-decoration-line-through">{note.description}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button type="button" className="btn-sm btn btn-success border-dark" onClick={() => { unarchivedNote(note) }}>Unarchived</button>
                                                    <button type="button" className="btn-sm btn btn-success border-dark" onClick={() => { updateNote(note) }}>Edit</button>
                                                    <button type="button" className="btn-sm btn btn-success border-dark" onClick={() => { del(note._id) }}>Delete</button>
                                                </div>
                                                <small className="text-white">{
                                                    note.date.substring(0, 10)
                                                }</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>)}
                    })}
                </div>
            </div>
        </>
    )
}

export default Archived
