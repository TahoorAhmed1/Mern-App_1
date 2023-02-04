import React,{useContext} from 'react'
import ContextNote from '../context/notes/ContextNote'
export default function NoteItem(props) {
    const { note,updatenote } = props
    const a=useContext(ContextNote)
    const {deletNote,}=a
    return (
        <div className='col-md-4   '>
            <div className="card my-4" >
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body" >
                    <h5 className="card-title">{note.tittle}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash-can mx-2 text-muted"onClick={(e)=>{
                        e.preventDefault()
                        deletNote(note._id)
                    }}> Delete</i>
                    <i className="fa-solid fa-pen-to-square text-muted mx-2" onClick={()=>{updatenote(note)}}> Edit</i>
                    
                </div>
            </div>

        </div>
    )
}
