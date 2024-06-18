// Import the required files and packages
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const api = require('./routes/index.js');

// Initialize the app to use json,urlencoded, public and /api as a route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);




// Returns notes.html as the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Returns index.html as the main page for any wildcard routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>{
    console.log(`App listening at http://localhost:${PORT}`);
});
