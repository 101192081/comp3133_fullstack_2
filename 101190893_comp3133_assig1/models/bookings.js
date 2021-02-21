const mongoose = require('mongoose');

const bookingsSchema = new mongoose.Schema({
    hotel_id: { type: String },
    booking_date: { type: String },
    booking_start: { type: String },
    booking_end: { type: String },
    user_id: { type: String }
});

module.exports = mongoose.model("Bookings", bookingsSchema);