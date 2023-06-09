const {ApolloServer} = require("@apollo/server")
const {startStandaloneServer} = require("@apollo/server/standalone")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const TrackAPI = require('./datasources/track-api')

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs, resolvers
    });
    const {url} = await startStandaloneServer(server, {
        context: async () => {
            const {cache} = server
            // this object becomes our resolver's contextValue, the third positional argument
            return {
                dataSources: { // this name isn't required, we choose it for convention
                    trackAPI: new TrackAPI({cache})
                }
            }
        }
    })
    console.log(`
        🚀  Server is running!
        📭  Query at ${url}
    `)
}

startApolloServer()
