const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{type: String, required:true},
    password:{type: String, required:true}
});

// Hashear a senha antes de salvar
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.valida = async function () {
    let errors = [];
    let success = [];
  
  
    if (!validator.isLength(this.password, { min: 3, max: 150 })) {
      errors.push ('A senha deve ter entre 3 e 150 caracteres');
    }
  
    if (validator.isEmail(this.email) && validator.isLength(this.password, { min: 3, max: 150 })) {
      success = ['Cadastro realizado com sucesso!'];
    }
  
    const User = mongoose.model('User'); // Mova essa linha para dentro do método
  
    const existingUser = await User.findOne({ email: this.email });
    if (existingUser) {
      errors.push('Usuário já existe');
    }
  
    return { errors, success };
  };

  
const User = mongoose.model('User', userSchema);

module.exports = User;