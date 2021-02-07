import { gql } from "@apollo/client";

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

export const GET_ADMIN_INFO = gql`
  mutation getUser($userId: ID!) {
    getUser(userId: $userId) {
      email
      _id
      username
    }
  }
`;

export const UPDATE_ADMIN_INFO = gql`
  mutation userProfile($userId: ID!, $username: String!, $email: String!) {
    changeProfile(
      userId: $userId
      userProfile: { email: $email, username: $username }
    ) {
      email
      _id
      username
      message
    }
  }
`;
