import React, { useContext, useEffect, useRef, useState } from 'react'
import ContextNote from "../context/notes/ContextNote"
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'
export default function Notes() {
    let history=useNavigate()
    const a = useContext(ContextNote)
    const { note, getNote,editNote  } = a
    const [notes, UpdateNote] = useState({id:"" , tittle: "", description: "", tag: "" })
    useEffect(() => {
        if(localStorage.getItem("token")){

            getNote()
        }
        else{
            history("/login") 
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null) 
    const refclose = useRef(null)
    const updatenote = (currentNote) => {
        ref.current.click()
   
        UpdateNote({id:currentNote._id,tittle:currentNote.tittle,description:currentNote.description,tag:currentNote.tag})
    }
    let handelAdd = (e) => {
        editNote(notes.id,notes.tittle,notes.description,notes.tag)
    refclose.current.click()
    }
    let onChange = (e) => {
        UpdateNote({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <>

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form className='p-4'>
                            <div>
                                <label className="form-label" >tittle</label>
                                <input type="text" value={notes.tittle} className="form-control" name='tittle' id="tittle" required minLength={5} onChange={onChange} aria-describedby="emailHelp" />
                                <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">description</label>
                                <input type="text" className="form-control"value={notes.description} name='description' required minLength={5} onChange={onChange} id="description" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">tag</label>
                                <input type="text" className="form-control" value={notes.tag} name='tag' onChange={onChange} required minLength={5} id="tag" />
                            </div>



                        </form>

                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handelAdd} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className='container'>
                <div className='row my-3 '>
                    <h1 className='text-center'>Notes</h1>
                    {notes.length ===0 && "no notes avalibal"}
                    {
                        note.map((notes) => {
                            return <NoteItem key={notes._id} updatenote={updatenote} note={notes}></NoteItem>
                        })
                    }
                </div>
            </div>
        </>

    )
}
