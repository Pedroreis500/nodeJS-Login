const User = require('../models/loginModel')
const bcryptjs = require('bcryptjs');
const validator = require('validator');


exports.mostrarPaginaRegistro = (req, res) => {
    const errors = [];
    const success = [];
    res.render('register', { errors, success });
};

exports.register = async (req, res) => {
    const { email, password } = req.body;
  
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      res.render('register', { errors: ['Usuário já existe'], success: [] });
      return;
    }
  
    try {
      const newUser = new User({ email, password });
      const { errors, success } = await newUser.valida();
  
      if (errors.length > 0) {
        res.render('register', { errors, success: [] });
        return;
      }
  
      const savedUser = await newUser.save();
      console.log('Usuário salvo com sucesso:', savedUser);
      res.render('login', { errors: [], success: ['Cadastro realizado com sucesso'] });
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      res.redirect('/register?message=error');
    }
  };