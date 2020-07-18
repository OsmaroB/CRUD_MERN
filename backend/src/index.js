//Traemos la posibilidad de guardar variables documentales
require('dotenv').config();
const app = require('./app');
require('./database');
//Funcion principal que ejecuta el programa
async function main (){
    await app.listen(app.get('port'));
    console.log('Server on port 4000');
}


main();