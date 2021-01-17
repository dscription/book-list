const graphql = require('graphql');
const _ = require('lodash');

// Define the schema, the object types and relations between object types and how you can reach into the graph and interact with that data, query or mutate the data.
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
var books = [
  {
    name: 'Eloquent JavaScript',
    genre: 'Computer Science',
    id: '1',
    authorId: '1',
  },
  {
    name: 'Introduction To Graph Theory',
    genre: 'Computer Science',
    id: '2',
    authorId: '2',
  },
  {
    name: 'Cracking the Coding Interview',
    genre: 'Computer Science',
    id: '3',
    authorId: '3',
  },
];

var authors = [
  { name: 'Marijn Haverbeke', age: 50, id: '1' },
  { name: 'Richard J. Trudeau', age: 40, id: '2' },
  { name: 'Gayle McDowell', age: 35, id: '3' },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // The parent data would be the Book that we already found. The data is passed to the resolve function.
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
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
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
