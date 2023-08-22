const User = require('../models/loginModel')
const bcryptjs = require('bcryptjs');
const validator = require('validator');

exports.mostrarPaginaLogin = (req, res) => {
    const errors = [];
    const success = [];
    res.render('login', { errors, success });
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar se o usuário existe
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    res.render('login', { errors: ['Usuário não encontrado'], success: [] });
    return;
  }

  // Verificar se a senha está correta
  const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
  const isEmailValid = validator.isEmail(email)

  if (!isPasswordValid || !isEmailValid ) {
    res.render('login', { errors: ['E-mail ou senha incorretos'], success: [] });
    return;
  }

  // Login bem-sucedido
  res.render('index', { user: existingUser });
};
