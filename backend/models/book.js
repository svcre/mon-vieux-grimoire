const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    // required: true indique que l'info est obligatoire
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type:String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    // file: { type: String, required: false },
    ratings: [{ userId: String, grade: Number }],
    averageRating: { type: Number, required: false},
    // id: { type: String, required: false }
});

module.exports = mongoose.model('Book', bookSchema);