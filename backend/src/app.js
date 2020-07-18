const express = require('express');//Codigo de ES5
const cors = require('cors');
const app = express();


//Setting 
app.set('port', process.env.PORT || 4000);
//Middlewares
app.use(cors());
//Hacemos que envie por formato json
app.use(express.json());

//routes
//Aca se juntaran todas las rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

//Aca solamente definimos el servidor
module.exports = app;