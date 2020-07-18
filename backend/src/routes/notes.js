const { Router }  = require('express');
const router = Router();
const { getNotes, createNote, getNote, updateNote,deleteNote } = require('../controllers/notes.controllers');

router.route('/')//Esto sirve para poner la rita api inicial de notes
    .get(getNotes)
    .post(createNote)

router.route('/:id')
    .get(getNote)
    .put(updateNote)
    .delete(deleteNote)


module.exports = router;