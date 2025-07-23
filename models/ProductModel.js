const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        enum: [
            'OT Tables',
            'Surgical Ceiling Lights',
            'Examination Lights',
            'Derma Chair',
            'LED OT Lights',
            'Mobile OT Lights',
            'Surgical Cautery',
            'Hospital Bed',
            'Surgical Instrument'
        ]
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
