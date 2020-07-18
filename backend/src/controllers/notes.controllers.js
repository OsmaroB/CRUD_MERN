const notesControll = {};
const Note = require('../models/Note');

//RECOLECCION DE NOTAS
notesControll.getNotes = async (req,res) => {
    const notes = await Note.find();//Conseguimos un arreglo de objetos json con el contenido de notas
    res.json(notes);//Le debolvemos a la aplicacion cliente el arreglo json de notas 
};

//CREACION DE NOTAS
notesControll.createNote = async (req,res) => {
    const { title, content, date, author } = req.body;
    //Creamos el modelo que sera como se guardara por el req.body
    const newNote = new Note({
        title: title,
        content: content,
        date: date,
        author: author
    })
    await newNote.save();//Guardamos la nota en la base de datos
    res.json({message: 'POST Request'});
};
//RECOLECCION DE UNA NOTA
notesControll.getNote = async(req,res) => {
    const note = await Note.findById(req.params.id);
    res.json(note)
};

//Actualizar nota por medio del id
notesControll.updateNote = async (req,res) => {
    const {title,content,author} = req.body;
    await Note.findOneAndUpdate({_id: req.params.id}, {
        title: title,
        content: content,
        author: author
    });
    res.json({message: 'Note update'})
};

//ELIMINACION DE UNA NOTA
notesControll.deleteNote = async (req,res) => {
    //Eliminamos una nota por medio de su id
    await Note.findByIdAndDelete(req.params.id);
    res.json({message: 'Note '+req.params.id+' delete'})//Respondemos al servidor cliente
};


module.exports = notesControll;