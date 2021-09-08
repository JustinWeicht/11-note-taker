const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// get notes from db.json
router.get('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    res.json(db);
})

// post new note
router.post('/api/notes', (req, res) => {
    const saveNote = req.body;
    saveNote.id = uuidv4();
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    db.push(saveNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);
})

// delete specified note
router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const db = JSON.parse(fs.readFileSync('db/db.json'));
    const deleteNote = db.filter(entry => (entry.id !== id));
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
    res.json(db);
})

module.exports = router;