const mongoose = require('mongoose');

// Define a schema
const guestbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Define a model
module.exports = mongoose.model('Guestbook', guestbookSchema);