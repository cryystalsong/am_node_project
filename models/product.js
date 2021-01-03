const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true    
    },
    depositRate: {
        type: Number,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);