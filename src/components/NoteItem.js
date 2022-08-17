import React, { useContext } from 'react'
import { useState } from 'react'
import alarm from '../images/alarm-icon.png'
import noteContext from '../notes-context/NoteContext'

const NoteItem = (props) => {
    const [remshow,setRemshow] = useState({rems:"false"})
    const { note, archivedNote, updateNote, del, adio } = props
    const context = useContext(noteContext);
    const { editNote } = context;
    const updatedate = (note) => {
        editNote(note._id, note.title, note.description, note.archived, "NaN", "N")
    }
    const updatetime = (note) => {
        editNote(note._id, note.title, note.description, note.archived, "NaN", "NaN")
    }
    let countDownDate = new Date(note.alarm_date + " " + note.alarm_time).getTime();
    if (note.alarm_date !== "NaN" && note.alarm_time !== "NaN") {
        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            if (distance < 0) {
                clearInterval(x);
                playA();
                updatedate(note);
            }
        }, 1000);
    }
    const playA = ()=>{
        setRemshow({rems:"true"})
        adio.play();
        setTimeout(() => {
        adio.pause();
        adio.currentTime = 0;
        }, 6000);
    }
    const pause = ()=>{
        setRemshow({rems:"false"})
        updatetime(note)
        adio.loop=false;
        adio.pause();
        adio.currentTime = 0;
    }
    return (
        <>
            <div className={`fixed-top ${(remshow.rems === "false")? "d-none" : ""}`} style={{left:"500px"}}>
                <div className="card text-bg-secondary" style={{width:"18rem;"}}>
                        <div className="card-body">
                            <h5 className="card-title"><strong>Time over for...</strong></h5>
                            <hr/>
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.description}</p>
                            <button className="btn btn-success" onClick={pause}>Close</button>
                        </div>
                </div>
            </div>

            {/* notes displayer */}
            <div className="col">
                <div className="card shadow-sm">
                    <div className="card-body text-bg-secondary">
                        <h5 className="card-title fw-bold">{note.title}<span id="timerid" className={`badge bg-warning ms-2 ${(note.alarm_date === "NaN" && note.alarm_time === "NaN") ? "d-none" : ""}`}><img height="20px" width="20px" src={alarm} alt="" />{note.alarm_date + " " + note.alarm_time}</span></h5>
                        <p className="card-text" >{note.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn-sm btn btn-success border-dark" onClick={() => { archivedNote(note) }}>Archived</button>
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
        </>
    )
}

export default NoteItem
