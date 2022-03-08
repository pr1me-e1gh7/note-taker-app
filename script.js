
// Definitions
const express = require('express');
const script = express();
const pathdir = require('path');
const port = process.env.PORT || 5000;
const route = require('./routes/route.js');
script.use(express.json());
script.use(express.urlencoded({ extended: true }));
script.use(express.static('public'));

// Route.js
script.use('/api', route);

// Notes HTML
script.get('/notes', (req, res) => {
	res.sendFile(pathdir.join(__dirname, './public/notes.html'));
});

// Index HTML
script.get('*', (req, res) => {
	res.sendFile(pathdir.join(__dirname, './public/index.html'));
});

// Log for nodemon port post
script.listen(port, () =>
	console.log(`note-taking-app is using http://localhost:5000`)
);
