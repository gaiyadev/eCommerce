const { buildSchema } = require("graphql");
// USELESS
module.exports = buildSchema(`
    type User {
        _id: ID!
        email: String!
        password: String
        username: String!
        token: String!
        new_password: String!
        confirm_password: String!
        tokenExpired: Int!
        message: String
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
        changePassword(changePassword: ChangePassword): User!        
        changeProfile(userProfile: UserProfile): User!    
    }

    schema {
        query: RootQuery,
        mutation: RootMutation,
    }
`);
