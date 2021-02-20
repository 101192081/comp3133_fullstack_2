const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Dummy hotels data
const hotels = [
    {id:1, name:"Hilton Inn", street:"Young Street", city:"Toronto", postal_code:"M1X0Y5", price:150, email:"contact@hilton.com"},
    {id:2, name:"Westin", street:"Young Street", city:"Toronto", postal_code:"M1X0Y5", price:500, email:"contact@hilton.com"},
    {id:3, name:"Sheridan", street:"Young Street", city:"Toronto", postal_code:"M1X0Y5", price:250, email:"contact@hilton.com"},
    {id:4, name:"Sheridan", street:"Young Street", city:"Hamilton", postal_code:"M1X0Y5", price:250, email:"contact@hilton.com"},
    {id:5, name:"Hugo", street:"123 Street", city:"Toronto", postal_code:"M1X0Y5", price:250, email:"contact@hilton.com"},
    {id:6, name:"Sheridan", street:"ABC Street", city:"Niagra Falls", postal_code:"M1X0Y5", price:250, email:"contact@hilton.com"},
];

// Declaring graphQL schema
const schema = buildSchema(`
    type Query {
        hotel(id: Int!): Hotel
        hotels(name: String, city: String): [Hotel]
    },

    type Hotel {
        id: Int,
        name: String,
        street: String,
        city: String,
        postal_code: String,
        price: Int,
        email: String
    }
`);

// Declaring functions for resolver
const getHotel = (args) => {
    return hotels.find(hotel => hotel.id == args.id);
}

const getHotels = (args) => {
    if (args.name) {
        return hotels.filter(hotel => hotel.name === args.name);
    } if (args.city) {
        return hotels.filter(hotel => hotel.city === args.city);
    } else {
        return hotels;
    }
}

// Root resolver
const root = {
    hotel: getHotel,
    hotels: getHotels
}


const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log("Server is running on port 3000"));