const Book = require('../models/book.js');

// Good
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    book.save()
    .then(() => {res.status(201).json({message: 'objet enregistré !'})})
    .catch(error => {res.status(400).json({error})})
};

// Good
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Good
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({message: 'objet supprimé'}))
        .catch(error => res.status(400).json({error}))
};


// Good
exports.getBooks = (req, res, next) => {
    Book.find()
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({error}))

};

// Good
exports.getBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({error}))
};

exports.addRating = (req, res, next) => {
    console.log(req.body)
    Book.findOne({ _id: req.params.id })
        .then(book => {
            // Ajout de la note dans la bdd
            if(!(book.ratings.some(e => e.userId === req.body.userId))) {
                book.ratings.push({userId: req.body.userId, grade: req.body.rating })
                book.save().then(() => {
                    // Re calcul de la note moyenne
                    let sumRating = 0;
                    book.ratings.map(value => {
                        sumRating = sumRating + value.grade
                    })
                    book.averageRating = parseFloat((sumRating / book.ratings.length)).toFixed(1) 
                    book.save().then((bk) => {
                        res.status(200).json(bk)
                    })
                })
            }
        })
        .catch(error => res.status(400).json({error}))
}