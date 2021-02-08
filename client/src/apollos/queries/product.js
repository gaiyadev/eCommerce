import { gql } from "@apollo/client";

export const ADMIN_PRODUCTS = gql`
  query adminProduct($adminId: ID!) {
    adminProduct(adminId: $adminId) {
      _id
      name
      color
      image
      price
      sku
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query getProductId($productId: ID!) {
    getProductById(productId: $productId) {
      _id
      name
      color
      price
      image
    }
  }
`;
