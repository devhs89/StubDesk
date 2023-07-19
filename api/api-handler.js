const {typeDefs, resolvers} = require("./graphql/employeeResolver");
const {ApolloServer} = require("apollo-server-express");

// apollo server api handler
async function apiHandler(app) {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start();
  // apply middleware to handle api calls to graphql route
  server.applyMiddleware({app, path: '/graphql'});
}

module.exports = {apiHandler};