// Import the required routes
const router = require('express').Router();

const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;