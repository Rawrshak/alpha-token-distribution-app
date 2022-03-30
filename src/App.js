import './App.css';
import Logomark from './components/Logomark'
import UserLogin from './components/UserLogin.js'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

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
      <div className="bg-gray-600 flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col">
          <Logomark />
          <UserLogin />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
