const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    hotel_id: { type: String },
    hotel_name: { type: String },
    street: { type: String },
    city: { type: String },
    postal_code: { type: String },
    price: { type: Number },
    email: { type: String}
});

module.exports = mongoose.model("Hotels", hotelsSchema);