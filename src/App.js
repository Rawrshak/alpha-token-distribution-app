import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { Web3Provider } from './data/Web3Context';
import { onError } from "@apollo/client/link/error";
import DisplayContent from './components/DisplayContent';

// Apollo setup
const errorLink = onError(({ graphqlErrors, networkErrors}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      console.error(`GraphQL Error: ${message}`);
      return 0;
    });
  }
});

const subgraphLink = from([
  errorLink,
  new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/gcbsumid/alpha-rawr-distribution"}),
]);

const client = new ApolloClient({
  link: subgraphLink,
  cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Web3Provider >
                <DisplayContent />
            </Web3Provider>
        </ApolloProvider>
    );
}

export default App;
