// Definitions
const fs = require('fs');
const route = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { scanandpush, checkinFile, addtoFile } = require('./utility.js');

// Fetch notes from db.json
route.get('/notes', (req, res) => {
	checkinFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// ADDING
route.post('/notes', (req, res) => {
	// Adds user's note
	const { title: noteTitle, text: noteText } = req.body;
	if (noteTitle && noteText) {
		const noteNew = {
			title: noteTitle, text: noteText, id: uuidv4(), };
		scanandpush(noteNew, './db/db.json');
		// Status Successful
		const resp = {
			status: 'Successful', body: noteNew };
		res.json(resp);

	} else {
		// Status Error
		res.json('Could not add new note');
	}

});

// DELETING
route.delete('/notes/:id', (req, res) => {
	// Fetch Saved Notes
	const savedNotes = JSON.parse(fs.readFileSync('./db/db.json'));
	// Pull Note
	const userNote = savedNotes.find((note) => note.id === req.params.id);
	if (!userNote)
		return res
			.send(`Can't find note ${req.params.id}`)
			.status(404);
	// Delete Note
	const index = savedNotes.indexOf(userNote);
	savedNotes.splice(index, 1);
	addtoFile('./db/db.json', savedNotes);
	// Status Successful
	const resp = {
		status: 'Successful', body: userNote };
	res.json(resp);

});

module.exports = route;
