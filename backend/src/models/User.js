const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true, //Esta propiedad se encarga de limpiar los espacios innecesarios en los textos o repetidos
        unique: true//Valida que solo exista un usuario
    }
},{
    timestamps: true
});

//En la base se crea una colección llamada users por defecto
module.exports = model('User', userSchema);