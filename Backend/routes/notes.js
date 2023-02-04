const express = require('express');
const router = express.Router()
const fetchuser = require("../middelware/fetchuser")
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');
const { schema } = require('../models/Notes');
router.get('/fetch', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id })
  res.json(notes)
})
router.post('/addNotes', fetchuser, [

], async (req, res) => {

  try {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }


    let notes = Notes.findOne({ tittle: req.body.tittle })
    let { tittle, description, tag } = req.body
    notes = new Notes({
      tittle, description, tag, user: req.user.id // for user to chace only thier own
    })
    const savenote = await notes.save()





    res.json(savenote)

  } catch (err) {
    console.log("Some Error plz enter true info", err);
    res.status(500)
  }
})

router.put('/updateNote/:id', fetchuser, async (req, res) => {


  // fetch schema 
  let { tittle, description, tag } = req.body
  
    const newNote = {}
    if (tittle) {
      newNote.tittle = tittle
    }
    if (description) {
      newNote.description = description
    }
    if (description) {
      newNote.tag = tag
    }
    
    //  we are checking that user notes exist which they want to update
      let note = await Notes.findById(req.params.id)
      // if not then err
      if (!note) {
       return  res.status(404).send("Not found")
      }
      
      // if exist then check  notes id and notes owner id to verify same owner
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("fucke you")
      }
    
      note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    
      res.json(note)
 

})


// Deletenote

router.delete('/delete/:id', fetchuser, async (req, res) => {

    //  we are checking that user notes exist which they want to update
      let note = await Notes.findById(req.params.id)
      // if not then err
      if (!note) {
       return  res.status(404).send("Not found")
      }
      
      // if exist then check  notes id and notes owner id to verify same owner
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("fucke you")
      }
    
      note = await Notes.findByIdAndDelete(req.params.id)
    
      res.json("delete")
 

})
module.exports = router