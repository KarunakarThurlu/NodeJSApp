
const mongose = require('mongoose');

const ProductSchema = new mongose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
})

module.exports = mongose.model(`Product`, ProductSchema);