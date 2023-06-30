const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const stuffController = require('../controllers/stuff');

  // ajout d'un nouvel item avec POST
router.post ('/', auth, multer, stuffController.createBook);

// modification de la note d'un livre (ajout d'une note par un autre user)
router.post('/:id/rating', auth, stuffController.addRating)

// modification d'un objet
router.put('/:id', auth, multer, stuffController.modifyBook)

// suppression d'un item
router.delete('/:id', auth, stuffController.deleteBook)

// récupération des données d'un seul item pour la page d'un objet
router.get('/:id', stuffController.getBook)

// récupération des données de tous les items pour la page d'accueil
router.get('/', stuffController.getBooks)

module.exports = router;