const { gql, ApolloServer } = require('apollo-server')
const Bored = require("./Bored")
const Place = require("./Places")
const mongoose = require('mongoose')
const _ = require('lodash');
const Event = require('./models/Event');
// const mongo = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017'
// const sqlite3 = require('sqlite3')

const schema = gql`
type BoredResponse {
    activity: String,
    accessibility: Float,
    type: String,
    participants: Int,
    price: Float,
    key: String

}, type Place {
    name: String,
    address: String,
    id: String,
    score: Int,
    type: String,
    image_url: String
    #eventInfo: [Event]
},
type Query  {
    user: String,
    getQuiz: [BoredResponse],
    getEvents(cat: String!): [Place],
    events(cat: [String]!) : [Place],
    userEvents: [Event]
    randomPic: [String]
   # toDB(id: String!): Event
},
type Event {
    id: String,
    name: String,
    description: String,
    score: Int,
    user: String
},
type Mutation {
  post(name: String!, description:String): Event
}
`;

const resolvers = {
    Query: {
        user: () => { return "Nick Miller" },
        getQuiz: async (parent, args, { dataSources }) => dataSources.Bored.getQuiz(),
        getEvents: async (parent, { cat }, { dataSources }) => dataSources.Place.getPlaces(cat),
        events: async (parent, { cat }, { dataSources }) => dataSources.Place.getAllPlaces(cat),
        userEvents: () => { return Event.find({}) }
        // randomPic: async (parent, { cat }, { dataSources }) => dataSources.Place.getAllPlaces(cat)
    },
    Mutation: {
        post: (root, args) => {
            // return Event.find({ id: parent.id })
            let event = new Event({
                name: args.name,
                description: args.description,
                score: 0,
                user: "Nick M"

            });
            //save to the database through mongoose
            return event.save(); // <- wow, very simple
        }
    }
}


//ApolloServer: used to init and start server
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources: () => ({
        Bored: new Bored,
        Place: new Place
    })
});

//starting the server
server.listen(5004).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});

mongoose.connect('mongodb+srv://jami:thisismypassword@codebuffalo-c68wz.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected to the DB');
});


// mutation{
//     post(name: "Pool Party!",description:"BYOB.") {
//       name
//       description
//       score
//       user
//     }
//   }