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
        price: String!
        image: String!
        sku: String!
        color: String!
        addedBy: String!
        createdAt: String
        updatedAt: String
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
    
       input UserLoginData {
        email: String!
        password: String!
    }

    input ChangePassword {
        password: String!
        new_password: String!
        confirm_password: String!
    }

    input UserProfile {
        email: String!
        username: String!
    }


    input ProductData {
        name: String!
        price: String!
        image: String!
        sku: String!
        color: String!
    }

    type RootQuery {
        loginAdmin(email: String!, password: String!): Admin!
        allProduct: [Product!]!
        allUsers: [User!]!
        adminProduct(adminId: ID!):[Product!]!
        getProductById(productId: ID!): [Product!]! 
    }

    type RootMutation {
        createUser(userData: UserData): User!
        loginUser(userLoginData: UserLoginData): User!
        createAdmin(adminData: AdminData): Admin!
        addProduct(productData: ProductData): Product!
        updateProductById(productId: ID!, productData: ProductData): Product!
        deleteProductById(productId: ID!): Product!
        changePassword(userId: ID!, changePassword: ChangePassword): User!        
        changeProfile( userId: ID!, userProfile: UserProfile): User!  
        getUser(userId: ID!):[User!]!         
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
