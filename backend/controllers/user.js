const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({message: 'user créé'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

exports.login = (req, res, next) => {
    console.log('User connexion in process')
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).send('Un champ est incorrect')
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Un champ est incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( // Création du token avec la lib jsonwebtoken
                            { userId: user._id }, // On met l'id de l'utilisateur dans le token
                            'RANDOM_TOKEN_SECRET', // Phrase qui permet de coder/decoder le token
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };