import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { JwtPayload, jwtDecode } from "jwt-decode";
// import { redirect } from "next/navigation";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.getItem(
    process.env.NEXT_PUBLIC_TOKEN_KEY || "token"
  );

  if (token) {
    let decodedToken: JwtPayload & {
      username: string;
    } = jwtDecode(token);

    if (!decodedToken.exp || !decodedToken.sub) {
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "token");
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
      localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "token");
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
