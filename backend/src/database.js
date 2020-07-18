const mongoose= require('mongoose');
console.log(process.env.MONGODB_URI);
const URI= process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost/databasetest';//Con el process objeto global del navegador acceso a todo el sistema
//Validacion con operador terniario

mongoose.connect(URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB is connected');
});