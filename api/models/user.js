const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    teamname: { type: String, required: true },
    password: { type: String, required: true },
    moves: { type: Number },
    time: { type: String },
    started: { type: Boolean}
});

module.exports = mongoose.model('User', UserSchema);