import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation signUp($input: SignUpUserInput!) {
    signUp(signUpUserInput: $input) {
      user {
        id
        username
      }
      accessToken
    }
  }
`;
