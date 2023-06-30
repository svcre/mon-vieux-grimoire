const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const stuffController = require('../controllers/stuff');


// POST /API/BOOKS
// ajout d'un nouvel item avec POST avec le controleur createBook, en passant par les middlewares auth et multer
router.post ('/', auth, multer, stuffController.createBook);

// POST API/BOOKS/:ID/RATING
// modification de la note d'un livre avec le controleur addRating, en passant par le middleware auth
router.post('/:id/rating', auth, stuffController.addRating)

// PUT /API/BOOKS/:ID
// modification d'un objet avec le controleur modifyBook, en passant par les middlewares auth et multer
router.put('/:id', auth, multer, stuffController.modifyBook)

// DELETE /API/BOOKS/:ID
// suppression d'un item avec le controleur deleteBook, en passant par le middleware auth
router.delete('/:id', auth, stuffController.deleteBook)

// GET API/BOOKS/BESTRATING
// permet de générer un tableau des 3 livres avec la meilleure note moyenne
router.get('/bestrating', stuffController.bestRating)

//GET /API/BOOKS/:ID
// récupération des données d'un seul item pour la page d'un objet avec le controleur getBook, sans besoin de middleware d'authentitfication
router.get('/:id', stuffController.getBook)

// GET /API/BOOKS
// récupération des données de tous les items pour la page d'accueil avec le controleur getBooks, sans besoin de middleware d'authentitfication
router.get('/', stuffController.getBooks)

module.exports = router;