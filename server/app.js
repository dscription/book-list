const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
  'mongodb+srv://gql:test123@gql.idam2.mongodb.net/graphql?retryWrites=true&w=majority'
);
mongoose.connection.once('connected', () => {
  console.log('connected to database');
});

app.use(
  '/graphql',
  graphqlHTTP({
    // schema: schema , can be shortened using es6 duplicate property name feature.
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
