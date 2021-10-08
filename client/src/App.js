import React from 'react';
import './App.css';
import Catalog from './component/Catalog';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

//GraphQL error check
const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({ message,location,path}) =>{
      alert('GraphQl error $(message)');
    });
  }
});

// Apollo client configure
const link = from ([
  errorLink,
  new HttpLink({ uri: "http://localhost:5050/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

//Rendering catalog
function App() {
  return (
    <ApolloProvider client={ client }>
     {" "}
     <div className="container">
      <header className="header">
        <h1>Catalog</h1>
      </header>
      <Catalog />
      </div>
    </ApolloProvider>
  );
}

export default App;