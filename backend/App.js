const { gql, ApolloServer } = require('apollo-server')
const Bored = require("./Bored")

const schema = gql`
type Query  {
    user: String,
    getQuiz: [BoredResponse]
},
type BoredResponse {
    activity: String,
    accessibility: Float,
    type: String,
    participants: Int,
    price: Float,
    key: String
}
# type Page {
#     response: String,
#     responseSplit: [String],
#     badReviews: [String],
#     randomReview: String,
#     firstReview: String
# },
# type Yelp {
#     allPlaces: [String],
#     randomPlace: String,
#     reviews: Page
# }
`;

const resolvers = {
    Query: {
        user: () => { return "Nick Miller" },
        getQuiz: async (parent, args, { dataSources }) => dataSources.Bored.getQuiz(),
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
    })
});

//starting the server
server.listen(5001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});