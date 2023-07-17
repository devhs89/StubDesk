const {typeDefs, resolvers} = require("./graphql/employeeResolver");
const {ApolloServer} = require("apollo-server-express");

async function apiHandler(app) {
  const server = new ApolloServer({typeDefs, resolvers});
  await server.start();
  server.applyMiddleware({app, path: '/graphql'});
}

module.exports = {apiHandler};