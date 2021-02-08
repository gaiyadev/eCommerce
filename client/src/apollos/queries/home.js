import { gql } from "@apollo/client";

export const ALL_PRODUCT = gql`
  query allProduct {
    allProduct {
      addedBy
      price
      name
      _id
      updatedAt
      createdAt
      image
    }
  }
`;
