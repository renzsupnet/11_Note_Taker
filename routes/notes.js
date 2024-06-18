const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if(title && text){

        const newNotes = {
            title,
            text,
            note_id: uuid()
        };

        readAndAppend(newNotes, './db/db.json');

        const response = {
            status: 'success',
            body: newNotes,
          };
          res.json(response);
        } else {
          res.json('Error in posting feedback');
        }
   });

   module.exports = notes;