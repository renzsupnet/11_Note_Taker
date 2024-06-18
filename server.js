const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) =>{
        if(err){
            console.error(error.message);
        }
        else{
            const parsedFile = JSON.parse(data);
            res.send(parsedFile);
        }
    })
});

app.post('/api/notes', (req, res) => {
        console.info(req.body);
        const { title, text } = req.body;
        const newNotes = {
            title,
            text
        };
        console.info(newNotes.title, newNotes.text);
        if(title && text){
            fs.readFile('./db/db.json', 'utf8', (err, data) => {
                if (err) {
                  console.error(err);
                } else {
                  console.info("HELLO");
                  const parsedData = JSON.parse(data);
                  parsedData.push(newNotes);
                  fs.writeFile('./db/db.json', JSON.stringify(parsedData), 'utf-8', (err) => {
                    if(err){
                      console.error(err);
                    }
                  });
                  res.json('Note added successfully');
                }
              });
        }

        }

);




app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT}`);
});
