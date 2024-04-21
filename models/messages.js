const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mesgSchema = new Schema({
    fromid : {
        type: String,
        require: true
    },
    toid : {
        type: String,
        require: true
    },
    mesg: {
        type: String,
        require: true
    },
    dater: {
        type: String,
        require: true
    },
    timer: {
        type: String,
        require: true
    }
}, {timestamps: true}) 

const messages = mongoose.model('messages', mesgSchema);
module.exports = messages;