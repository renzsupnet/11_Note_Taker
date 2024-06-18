// Import the required packages
const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// Returns the db.json content
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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
        readAndAppend(newNotes, './db/db.json');

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

        readFromFile('./db/db.json').then((data) =>{

            data =JSON.parse(data);
            if(data){
            // Loop through db.json to see if such note id exists
                for(let i = 0; i < data.length; i++){
                    console.info(`Deleted note ${JSON.stringify(data[i])}`);
                    if(data[i].id === id){
                        // Splice to remove if it exists then rewrite db.json to reflect change
                        data.splice(i, 1);
                        writeToFile('./db/db.json', data);
                        const response = {
                            status: 'success',
                            body: data,
                        };
                        res.json(response);   
                        break;  
                    }
                    else{
                        if(i === data.length - 1){
                            res.json('Note ID not found! No actions was taken.');
                    }
        
                }}
        }else
        {
            res.json('There are currently no existing notes!');
        }

        } );

   });


module.exports = notes;