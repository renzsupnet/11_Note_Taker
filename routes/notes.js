// Import the required packages
const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile, deleteAndRewrite } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const db = './db/db.json';

// Returns the db.json content
notes.get('/', (req, res) => {
    readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

// Creates a new note the appends an id using uuid() as a randomizer
notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if(title && text){

        const newNotes = {
            title,
            text,
            id: uuid()
        };

        // From the helper fsUtils that reads and writes into db.json
        readAndAppend(newNotes, db);

        const response = {
            status: 'success',
            body: newNotes,
          };
          res.json(response);
        } else {
          res.json('Error in posting notes');
        }
   });

// Deletes the note by splicing it from db.json using its id as condition
   notes.delete('/:id', (req, res) => {

        const id = req.params.id;
        
        // Function can be found in the fsUtils.js in the helpers folder
        res.json(deleteAndRewrite(id, db));

   });


module.exports = notes;