import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createApolloProvider } from '@vue/apollo-option';

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    cache,
    uri: 'http://localhost:3000/graphql',
});

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
});

const app = createApp(App);
app.use(apolloProvider);
app.mount('#app');
