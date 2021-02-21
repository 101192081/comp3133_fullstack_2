const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const mongoose = require('mongoose');
const hotelsModel = require('./models/hotels');
const usersModel = require('./models/users');
const bookingsModel = require('./models/bookings');

const dotenv = require('dotenv');
dotenv.config();


// Connection to mongoDB
mongoose.connect(process.env.mongoDBPath, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .once("open", () => console.log("Connected to mongoDB"))
    .on("error", error => console.log(`Error: ${error}`))


// Schema for graphQL
const schema = buildSchema(`
    type Hotel {
        hotel_id: ID,
        hotel_name: String,
        street: String,
        city: String,
        postal_code: String,
        price: Float,
        email: String
    },

    type User {
        user_id: ID,
        username: String,
        password: String,
        email: String
    },

    type Booking {
        hotel_id: ID,
        booking_date: String,
        booking_start: String,
        booking_end: String,
        user_id: ID
    },

    type Query {
        hotels(hotel_name: String, city: String): [Hotel],
        bookings(hotel_id: ID, user_id: ID): [Booking]
    },

    type Mutation {
        addHotel(
            hotel_id: ID!,
            hotel_name: String!,
            street: String!,
            city: String!,
            postal_code: String!,
            price: Float!,
            email: String!
        ): Hotel

        addUser(
            user_id: ID!,
            username: String!,
            password: String!
            email: String!
        ): User

        addBooking(
            hotel_id: ID!,
            booking_date: String!,
            booking_start: String!,
            booking_end: String!,
            user_id: ID!
        ): Booking
    }
`);

// Functions for resolver
const getHotels = async (args) => {
    if (args.hotel_name && args.city) {
        return await hotelsModel.find({ "hotel_name" : args.hotel_name, "city" : args.city })
    } else if (args.hotel_name) {
        return await hotelsModel.find({ "hotel_name" : args.hotel_name });
    } else if (args.city) {
        return await hotelsModel.find({ "city" : args.city });
    } else {
        return await hotelsModel.find({});
    }
}

const getBookings = async (args) => {
    if (args.hotel_id && args.user_id) {
        return await bookingsModel.find({ "hotel_id": args.hotel_id, "user_id" : args.user_id });
    } else if (args.hotel_id) {
        return await bookingsModel.find({ "hotel_id": args.hotel_id });
    } else if (args.user_id) {
        return await bookingsModel.find({ "user_id" : args.user_id });
    } else{
        return await bookingsModel.find({});
    }
}

const addHotelToDB = async ({ hotel_id, hotel_name, street, city, postal_code, price, email }) => {
    let newHotel = new hotelsModel({
        hotel_id, hotel_name, street, city, postal_code, price, email
    });

    return await newHotel.save();
}

const addUserToDB = async ({ user_id, username, password, email }) => {
    let newUser = new usersModel({
        user_id, username, password, email
    });

    return await newUser.save();
}

const addBookingToDB = async ({ hotel_id, booking_date, booking_start, booking_end, user_id }) => {
    let newBooking = new bookingsModel({
        hotel_id, booking_date, booking_start, booking_end, user_id
    });

    return await newBooking.save();
}

// Root resolver
const root = {
    hotels: getHotels,
    bookings: getBookings,
    addHotel: addHotelToDB,
    addUser: addUserToDB,
    addBooking: addBookingToDB
}

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))