import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const urlBase = "http://localhost:33001";
const apolloClient = new ApolloClient({uri: urlBase, cache: new InMemoryCache()});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
</React.StrictMode>);
