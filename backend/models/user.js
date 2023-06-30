const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    // unique: true évite d'utiliser plusieurs fois le même email
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true} 
});

userSchema.plugin(uniqueValidator);
// plugin permettant qu'une adresse email ne soit utilisée qu'une seule fois

module.exports = mongoose.model('User', userSchema);