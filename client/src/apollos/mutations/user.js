import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(
      userData: { email: $email, username: $username, password: $password }
    ) {
      _id
      email
      username
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(userLoginData: { email: $email, password: $password }) {
      email
      password
      _id
      username
      token
      tokenExpired
      message
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $userId: ID!
    $password: String!
    $new_password: String!
    $confirm_password: String!
  ) {
    changePassword(
      userId: $userId
      changePassword: {
        password: $password
        new_password: $new_password
        confirm_password: $confirm_password
      }
    ) {
      _id
      email
      message
    }
  }
`;
