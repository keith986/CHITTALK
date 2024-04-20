const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    relationship: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    images: {
        type: String,
        require: true
    },
    passcode: {
        type: String,
        require: true
    }
}, {timestamps: true});

const users = mongoose.model('users', usersSchema);
module.exports = users;