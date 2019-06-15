const { gql, ApolloServer } = require('apollo-server')
const Bored = require("./Bored")
const Place = require("./Places")

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
    id: String
    eventInfo: [Event]
},
type Query  {
    user: String,
    getQuiz: [BoredResponse],
    getEvents(cat: String!): [Place]
},
type Event {
    id: String,
    score: Int,

}
`;

const resolvers = {
    Query: {
        user: () => { return "Nick Miller" },
        getQuiz: async (parent, args, { dataSources }) => dataSources.Bored.getQuiz(),
        getEvents: async (parent, { cat }, { dataSources }) => dataSources.Place.getPlaces(cat)

        // page: async (parent, _args, { dataSources }) => dataSources.Page.getPage(),
        // review: async (parent, { location }, { dataSources }) => dataSources.Yelp.getPage(),
        // random: async (parent, { location }, { dataSources }) => dataSources.Yelp.getReviewByPlace(location)
    }
    // Yelp: {
    //     reviews: async (parent, _args, { dataSources }) => dataSources.Page.getReviewByPlace(parent.randomPlace),
    // }
}


//https://maps.googleapis.com/maps/api/place/findplacefromtext/output?parameters


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
server.listen(5003).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});