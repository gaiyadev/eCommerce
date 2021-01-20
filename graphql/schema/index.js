const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        token: String
        tokenExpired: Int
    }

    input UserData {
        email: String!
        password: String!
    }    

    type RootQuery {
        userLogin(email: String!, password: String!): User!
    }

    type RootMutation {
        createUser(userData: UserData): User!
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
