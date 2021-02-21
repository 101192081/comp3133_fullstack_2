const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    user_id: { type: String },
    username: { type: String },
    password: { type: String },
    email: { type: String }
});

module.exports = mongoose.model("Users", usersSchema);