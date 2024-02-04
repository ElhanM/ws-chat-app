import jwtDecode from "@/utils/jwtDecode";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "@/utils/localStorage";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { redirect } from "next/navigation";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = getTokenFromLocalStorage();

  if (token) {
    let decodedToken = jwtDecode(token);

    if (!decodedToken.exp || !decodedToken.sub) {
      removeTokenFromLocalStorage();
      // redirect from next/navigation is not available in this file
      // so we will use window.location.href
      window.location.href = "/auth/login";
      return {
        headers: {
          ...headers,
        },
      };
    }

    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      removeTokenFromLocalStorage();
      window.location.href = "/auth/login";
      return {
        headers: {
          ...headers,
        },
      };
    }

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
