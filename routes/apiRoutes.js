const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// get notes from db.json
router.get('/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(db);
})

// post new note
router.post('/notes', (req, res) => {
    const postNote = req.body;
    postNote.id = uuidv4();
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    db.push(postNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
})

// delete specified note
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    const deleteNote = db.filter(entry => (entry.id !== id));
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
    res.json(db);
})

module.exports = router;