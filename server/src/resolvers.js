// NB Remember that a resolver is responsible for populating the data for a field in your schema
// resolve function names must match the field names in your schema
const resolvers = {

    Query: {
        /**
         *
         *  Returns an array of Tracks that will be used to populate
         *  the homepage grid of our web client
         * @param parent is the returned value of the resolver for this field's parent.
         * This will be useful when dealing with resolver chains.
         * @param args  is an object that contains all GraphQL arguments that were provided for the field by the GraphQL operation,
         * e.g. the id will be accessible here
         * @param contextValue is an object shared across all resolvers that are executing for a particular operation.
         * The resolver needs this argument to share state, like authentication information, a database connection, or in our case the RESTDataSource.
         * @param info contains information about the operation's execution state, including the field name, the path to the field from the root, and more
         */
        tracksForHome: (_, __, {dataSources}) => {
            return dataSources.trackAPI.getTracksForHome()
        },

        track: (_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getTrack(id)
        },

        module: (_, {id}, {dataSources}) => {
            return dataSources.trackAPI.getModule(id)
        }

    },
    Mutation: {
        incrementTrackViews: async (_, {id}, {dataSources}) => { // async because we are using await inside instead of returning a promise
            const track = await dataSources.trackAPI.incrementTrackViews(id)
            return {
                code: 200,
                success: true,
                message: `Successfully incremented number of views for track ${id}`,
                track
            }
        }
    },
    Track: { // indicates that is for the track type of our schema
        /**
         *
         * @param parent contains data returned by tracksForHome
         * @param _
         * @param dataSources
         * @param info
         */
        author: ({authorId}, _, {dataSources}, info) => {
            return dataSources.trackAPI.getAuthor(authorId)
        },
        // the id is retrieved from the parent object
        modules: ({id}, _, {dataSources}) => {
            return dataSources.trackAPI.getTrackModules(id)
        }
    }

}

module.exports = resolvers