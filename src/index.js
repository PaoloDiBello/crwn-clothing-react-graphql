import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import App from './App';
import { store, persistor } from './redux/store';

import { ApolloProvider } from 'react-apollo'

import { createHttpLink } from 'apollo-link-http'

import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloClient, gql } from 'apollo-boost'

import { resolvers, typeDefs } from './graphql/resolvers'


const httpLink = createHttpLink({ //connect server
  uri: 'https://crwn-clothing.com'
})

const cache = new InMemoryCache(); // like localStorage and such


const client = new ApolloClient({
  link: httpLink, // know what to request to
  cache,
  typeDefs,
  resolvers,
});

client.writeData({
  data: {
    cartHidden: true,
    cartItems: [],
  }
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
