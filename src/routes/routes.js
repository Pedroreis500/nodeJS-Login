const express = require('express');
const route = express.Router();

const indexController = require('../controllers/indexController')
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

route.get('/', indexController.mostrarPaginaInicial);
route.get('/login', loginController.mostrarPaginaLogin);
route.get('/register', registerController.mostrarPaginaRegistro);
route.post('/register/register', registerController.register); // Corrigido para usar o controlador de registro
route.post('/login/login', loginController.login);

module.exports = route;