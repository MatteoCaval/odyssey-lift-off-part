import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyles from './styles';
import Pages from './pages';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:4000", // location of the server
    cache: new InMemoryCache(), // used to store and reuse query results
})

ReactDOM.render(
    //The ApolloProvider component uses React's Context API to make a configured
    // Apollo Client instance available throughout a React component tree
    <ApolloProvider client={client}>
        <GlobalStyles/>
        <Pages/>
    </ApolloProvider>,
    document.getElementById('root')
);
