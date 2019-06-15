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
    type: String
    #eventInfo: [Event]
},
type Query  {
    user: String,
    getQuiz: [BoredResponse],
    getEvents(cat: String!): [Place],
    events(cat: [String]) : [Place]
   # toDB(id: String!): Event
},
type Event {
    id: String,
    score: Int

}#,
# type Mutation {
#   post(title: String!,type:String!,participantsr:Number): Link!
# }
`;

const resolvers = {
    Query: {
        user: () => { return "Nick Miller" },
        getQuiz: async (parent, args, { dataSources }) => dataSources.Bored.getQuiz(),
        getEvents: async (parent, { cat }, { dataSources }) => dataSources.Place.getPlaces(cat),
        events: async (parent, { cat }, { dataSources }) => dataSources.Place.getAllPlaces(cat),

    }// ,
    // Place: {
    //     eventInfo() {
    //         return Event.find({ id: parent.id })
    //     }
    // eventInfo: async (parent, { cat }, { dataSources }) => { Event.findById(args.id) }
    //  }
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
