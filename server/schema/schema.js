const graphql = require('graphql');

// Define the schema, the object types and relations between object types and how you can reach into the graph and interact with that data, query or mutate the data.
const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { tyle: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
