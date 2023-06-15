#!/usr/bin/env node

/**
 * Module dependencies.
 */
const app = require('./app');
const _ = require('dotenv').config();
const {ApolloServer} = require('@apollo/server');
const {startStandaloneServer} = require('@apollo/server/standalone');
const {typeDefs, resolvers} = require("./graphql/employeeResolver");
const __ = require('./data/dbContext');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = new ApolloServer({typeDefs, resolvers});

/**
 * Listen on provided port, on all local interface.
 */
startStandaloneServer(server, {listen: {port: port}}).then(resp => console.log(`Server ready at: ${resp.url}`));
