import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const urlBase = "http://localhost:30080";
const apolloClient = new ApolloClient({uri: urlBase, cache: new InMemoryCache()});

const root = ReactDOM.createRoot(document.getElementById('mainContent'));
// render react content to mainContent div
root.render(<React.StrictMode><ApolloProvider client={apolloClient}>
  <App /></ApolloProvider></React.StrictMode>);
