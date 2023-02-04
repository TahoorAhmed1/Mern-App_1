import React, { useState } from 'react'
import ContextNote from './ContextNote'

const NoteState = (props) => {
  let host = 'http://localhost:80'
  let Notes = []
  let [note, updateState] = useState(Notes)

  // Get ALL notes
  const getNote = async () => {
    let url = `${host}/api/notes/fetch`
    let data = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    }
    let responce = await fetch(url, data)
    const result = await responce.json()
    console.log(result);
    updateState(result)
  }



  //  Note add 
  const addNote = async (tittle, description, tag) => {
    //  for backend
    let url = `${host}/api/notes/addNotes`
    let data = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ tittle, description, tag })
    }
    let responce = await fetch(url, data)
    const notes = await responce.json()
    console.log(notes);



    updateState(Notes.concat(notes))

  }

  // note delete

  const deletNote = async (id) => {
    let url = `${host}/api/notes/delete/${id}`
    let data = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    }
    let responce = await fetch(url, data)
    const result = await responce.json()
    console.log(result);








    console.log("delete" + id);
    let newNote = note.filter((notes) => {
      return notes._id !== id

    })
    updateState(newNote)
  }
  // note Edit

  const editNote = async (id, tittle, description, tag) => {

    //  for backend
    let url = `${host}/api/notes/updateNote/${id}`
    let params = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ tittle, description, tag })
    }

    let output = await fetch(url, params)
    let notes = await output.json();
    console.log(notes);




 let newNotes=JSON.parse(JSON.stringify(note))
  
    // for client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].tittle = tittle
        newNotes[index].description = description
        newNotes[index].tag = tag
        break;
      }

    }
    updateState(note)

  }



  // sign

  // const signUp =async()=>{
  //   let url = `${host}/api/notes/updateNote/${id}`
  //   let params = {
  //     method: "PUT",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-token': 'localStorage.getItem('token')
  //     },
  //     body: JSON.stringify({ tittle, description, tag })
  //   }

  //   let output = await fetch(url, params)
  //   let notes = await output.json();
  //   console.log(notes);
  // }


  return (
    <>
      <ContextNote.Provider value={{ note, updateState, addNote, deletNote, editNote, getNote }}>
        {props.children}
      </ContextNote.Provider>

    </>
  )
}

export default NoteState