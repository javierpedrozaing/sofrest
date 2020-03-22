import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { ApolloLink } from 'apollo-link';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";

const uri = 'https://emma.rodmensoft.com/graphql';
const uriAuth = 'https://emma.rodmensoft.com/graphql/user'
export function createApollo(httpLink: HttpLink,apollo: Apollo,) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // Get the authentication token from local storage if it exists
  const auth = setContext(async (request, previousContext) => {
    // Getting the token from the session service
    let token = localStorage.getItem('token-emma');

    // return {} if token is not set yet
    if(!token) {
      return {}
    }

    // Set Authorization headers with token
    return {
      headers: {Authorization: `Bearer ${tokenGetter()}`}
    }
  });

  return {
    link: ApolloLink.from([basic, auth, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
          fetchPolicy: 'cache-and-network',
      },
      query: {
          fetchPolicy: 'network-only',
      },
  }
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const options2: any = { uri: uriAuth };
    apollo.createNamed('auth', {
      link: httpLink.create(options2),
      cache: new InMemoryCache()
    });
  }
}

export function tokenGetter(){
  return localStorage.getItem('token-emma');
}