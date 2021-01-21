const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        username: String!
        token: String!
        tokenExpired: Int!
        message: String
    }

    type Admin {
        _id: ID!
        email: String!
        password: String
        username: String!
        token: String!
        tokenExpired: Int!
        message: String
    }

     type Product {
        _id: ID!
        name: String!
        price: String
        image: String!
        sku: String!
        color: String!
        message: String
    }

    input AdminData {
            email: String!
            password: String!
            username: String!
        }  

    input UserData {
        email: String!
        password: String!
        username: String!
    }    

    input ProductData {
        name: String!
        price: String
        image: String!
        sku: String!
        color: String!
    }

    type RootQuery {
        loginUser(email: String!, password: String!): User!
        loginAdmin(email: String!, password: String!): Admin!
        allProduct: [Product!]! 
    }

    type RootMutation {
        createUser(userData: UserData): User!
        createAdmin(adminData: AdminData): Admin!
        addProduct(productData: ProductData): Product!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);