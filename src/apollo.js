import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

// Create an http link:
const httpLink = new HttpLink({
    uri: `http://${window.location.hostname}:4000`,
    credentials: 'same-origin'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://${window.location.hostname}:4000/subscriptions`,
    options: {
        reconnect: true
    }
});

const onErrorObj = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const linkSplit = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

const link = ApolloLink.from([
    onErrorObj,
    linkSplit
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default client;
