const gql = require("graphql-tag")

const typeDefs = gql`
    "A track is a group of modules that teaches you about a specific topic"
    type Track {
        id: ID!
        "the track's title"
        title: String
        author: Author!
        thumbnail: String
        length: Int
        modulesCount: Int
        "the track's complete description, can be in markdown format"
        description: String
        "the number of times a track has been viewed"
        numberOfViews: Int
        modules: [Module!]!
    }
    type Module {
        id: ID!
        title: String!
        length: Int
    }
    "Author of a complete track or a module"
    type Author {
        id: ID!
        name: String!
        photo: String
    }
    type Query {
        "gets tracks array for homepage grid"
        tracksForHome: [Track!]!
        "fetch a speecific track"
        track(id: ID!): Track
    }
`

module.exports = typeDefs