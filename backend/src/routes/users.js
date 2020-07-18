const { Router }  = require('express');
const router = Router();
//Se recolectan en una constante los eventos del controllador
const {getUsers,createUser,deleteUser} = require('../controllers/users.controllers');

//Se maneja la ruta inicial
router.route('/')
    .get(getUsers)
    .post(createUser);

//Se maneja la ruta con un id especifico
router.route('/:id')
    .delete(deleteUser);


module.exports = router;