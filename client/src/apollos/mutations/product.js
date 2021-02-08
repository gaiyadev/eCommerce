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

export const DELETE_PRODUCT = gql`
  mutation deleteProductById($productId: ID!) {
    deleteProductById(productId: $productId) {
      _id
      name
      color
      price
      message
      image
      addedBy
    }
  }
`;
