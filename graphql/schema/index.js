const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        username: String!
        token: String!
        tokenExpired: Int!
        message: String!
    }

    input UserData {
        email: String!
        password: String!
        username: String!
    }    

    type RootQuery {
        loginUser(email: String!, password: String!): User!
    }

    type RootMutation {
        createUser(userData: UserData): User!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
