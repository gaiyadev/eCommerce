const { buildSchema } = require("graphql");

module.exports = buildSchema(`

     type Product {
        _id: ID!
        name: String!
        price: String!
        image: String!
        sku: String!
        color: String!
        addedBy: String!
        createdAt: String
        updatedAt: String
        message: String
    }

    input ProductData {
        name: String!
        price: String!
        image: String!
        sku: String!
        color: String!
    }

    type RootQuery {
        allProduct: [Product!]! 
        adminProduct(adminId: ID!):[Product!]!
        getProductById(productId: ID!): [Product!]!
        
    }

    type RootMutation {
        addProduct(productData: ProductData): Product!
        updateProductById(productId: ID!, productData: ProductData): Product!
        deleteProductById(productId: ID!): Product!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
