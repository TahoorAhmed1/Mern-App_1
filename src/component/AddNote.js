import React, { useState,useContext } from 'react'
import ContextNote from "../context/notes/ContextNote"
function AddNote() {
    const a=useContext(ContextNote)
    const {addNote}=a
    const [note,UpdateNote]=useState({tittle:"",description:"",tag:""})
    let handelAdd=(e)=>{
        e.preventDefault()
      addNote(note.tittle,note.description,note.tag)
    }
    let onChange=(e)=>{
        UpdateNote({...note,[e.target.name]:e.target.value})
    }
  return (
   <>
       <div className='container my-4'>
        <h1 className='text-center'>Welcome come to Notes app</h1>
        <form>
          <div className="mb-3">
            <label  className="form-label">tittle</label>
            <input type="text" className="form-control" name='tittle' id="tittle" onChange={onChange} required minLength={5} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label  className="form-label">description</label>
            <input type="text" className="form-control"  name='description' onChange={onChange} required minLength={5} id="description" />
          </div>
          <div className="mb-3">
            <label  className="form-label">tag</label>
            <input type="text" className="form-control"  name='tag' onChange={onChange} required minLength={5} id="tag" />
          </div>
        
          <button type="submit" className="btn btn-primary" onClick={handelAdd}>AddNote</button>
        
        </form>
    
      </div>
   
   </>
  )
}

export default AddNote
