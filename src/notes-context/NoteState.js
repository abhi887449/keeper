import { useState } from 'react'
import NoteContext from './NoteContext'
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // get notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  // add notes
  const addNote = async (title, description,archived,alarm_date,alarm_time) => {
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,archived,alarm_date,alarm_time})
    });
    const json = await response.json();
    const note = json
    setNotes(notes.concat(note))
  }
  // delete notes
  const deleteNote = async (id) => {
    const url = `${host}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const newnotes = notes.filter((note) => { return note._id !== id })
    setNotes(newnotes)
  }
  // edit notes
  const editNote = async (id, title, description,archived,alarm_date,alarm_time) => {
    const url = `${host}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,archived,alarm_date,alarm_time})
    });

    // editing note of given id
    let newnote = JSON.parse(JSON.stringify(notes))
    for (let i = 0; i < newnote.length; i++) {
      if (newnote[i]._id === id) {
        newnote[i].title = title
        newnote[i].description = description
        newnote[i].archived = archived
        newnote[i].alarm_date = alarm_date
        newnote[i].alarm_time = alarm_time
        break;
      }
    }
    setNotes(newnote)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;