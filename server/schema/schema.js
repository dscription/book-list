const graphql = require('graphql');
const _ = require('lodash');

// Define the schema, the object types and relations between object types and how you can reach into the graph and interact with that data, query or mutate the data.
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
  { name: 'Eloquent JavaScript', genre: 'Computer Science', id: '1' },
  { name: 'Introduction To Graph Theory', genre: 'Computer Science', id: '2' },
  { name: 'Cracking the Coding Interview', genre: 'Computer Science', id: '3' },
];

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
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
