const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Admin {
        _id: ID!
        email: String!
        password: String
        username: String!
        token: String!
        tokenExpired: Int!
        message: String
    }

    input AdminData {
            email: String!
            password: String!
            username: String!
        }  


    type RootQuery {
        loginAdmin(email: String!, password: String!): Admin!
        
    }

    type RootMutation {
        createAdmin(adminData: AdminData): Admin!
        }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
