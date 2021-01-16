const express = require('express');
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')

const app = express();

app.use('/graphql', graphqlHTTP({
  // schema: schema , can be shortened using es6 duplicate property name feature.
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})