const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route1 Fetching logged in user notes:GET"http://localhost:5000/api/fetchnotes" Login required
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

//Route2 Add new notes: POST "http://localhost:5000/api/addnote" Login required
router.post("/addnote", fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 2 }),
    body('description', 'description length must be greater than 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        // when errors return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, archived, alarm_date ,alarm_time} = req.body;
        const note = new Note({
            title, description, archived,alarm_date,alarm_time, user: req.user.id
        })
        const saveNotes = await note.save();
        res.json(saveNotes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
//Route3 Updating note: PUT "http://localhost:5000/api/updatenote" Login required
router.put("/updatenote/:id", fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 2 }),
    body('description', 'description length must be greater than 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, archived, alarm_date ,alarm_time} = req.body;
        // new note obj
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (archived) { newNote.archived = archived };
        if (alarm_date) { newNote.alarm_date = alarm_date };
        if (alarm_time) { newNote.alarm_time = alarm_time };
        //checking note is present or not
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        // confirming the note belong to user who is accessing that node 
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})


//Route4 Delete note: DELETE "http://localhost:5000/api/deletenote" Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //checking note is present or not
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        // confirming the note belong to user who is accessing that node 
        if (note.user.toString() != req.user.id) {
            return res.status(404).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted successfully", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

module.exports = router;