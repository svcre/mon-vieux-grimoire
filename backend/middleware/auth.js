const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupération du token dans le headers de la requête
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décodage du token grâce à la lib jsonwebtoken
        const userId = decodedToken.userId; // Récupération de l'id de l'utilisateur qui est "crypté" dans le token de base
        req.auth = { // stock l'id de l'utilisateur dans la rêquete pour une possible utilisation.
            userId: userId
        };
        next();
    } catch(error) {
        res.status(401).json({ error });
    }
};