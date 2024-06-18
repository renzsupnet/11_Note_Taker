const notes = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
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
            id: uuid()
        };

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


   notes.delete('/:id', (req, res) => {

        const id = req.params.id;

        readFromFile('./db/db.json').then((data) =>{

            data =JSON.parse(data);
            for(let i = 0; i < data.length; i++){
                console.info(data[i])
                if(data[i].id === id){
                    data.splice(i, 1);
                    writeToFile('./db/db.json', data);
                    const response = {
                        status: 'success',
                        body: data,
                      };
                    res.json(response);     
                }
    
            }


        } );

   });


module.exports = notes;