const mongoose = require('mongoose');
const RoleModel = require('./RoleModel');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    }]
})

module.exports = mongoose.model('User', UserSchema);