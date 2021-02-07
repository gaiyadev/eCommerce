import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $price: String!
    $image: String!
    $sku: String!
    $color: String!
  ) {
    addProduct(
      productData: {
        name: $name
        price: $price
        image: $image
        sku: $sku
        color: $color
      }
    ) {
      price
      name
      image
      message
      color
    }
  }
`;
