const graphql = require('graphql');

// Define the schema, the object types and relations between object types and how you can reach into the graph and interact with that data, query or mutate the data.
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { tyle: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// Root querys are how we describe how the user can jump into the graph and grab data.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  // Each entry point (ie, book, author, all books, all authors will be a field)
  fields: {
    book: {
      type: BookType,
      // Define which arguments should be expected when the query is made (ie.book id)
      args: { id: { type: GraphQLString } },
      resolve(parent, args){
        // code to get data from db / other source
      }
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
})