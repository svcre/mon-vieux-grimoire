const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    // unique: true évite d'utiliser plusieurs fois le même email
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true} 
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);