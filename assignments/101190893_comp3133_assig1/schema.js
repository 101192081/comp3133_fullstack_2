const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy hotel data
const hotels = [
    { hotel_id:"1", hotel_name:"Hilton Inn", street:"Young Street", city:"Toronto", postal_code:"M1X0Y5", price:"150", email:"contact@hilton.com"}
];

const HotelType = new GraphQLObjectType({
    name: "Hotel",
    fields: () => ({
        hotel_id: { type: GraphQLString },
        hotel_name: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        postal_code: { type: GraphQLString },
        price: { type: GraphQLString },
        email: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        hotel: {
            type: HotelType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(hotels, { hotel_id: args.id })
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery })