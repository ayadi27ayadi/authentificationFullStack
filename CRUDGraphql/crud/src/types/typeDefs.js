const {gql} = require('apollo-server-express')


//Query
const typeDefs = gql`
type User{
    id: ID
    firstName: String
    lastName: String
    phone: Int
    email: String
}

type Register{
    id: ID!
    firstName: String!
    lastName: String!
    phone: Int
    email: String!
    password: String!
    passwordConfirm: String!
    role: String

}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }


type Query{
      hello:String
      getAll: [User]
      helloword:String
      getAllRegister: [Register]
      userauth(id:ID!): UserAuth
      login(email: String!, password: String!): AuthData!
}


input UserInput{
    firstName:String
    lastName:String
    phone:Int
    email:String
}


input LoginInputAuth{
    email:String
    password:String
}

type Mutation {
    createUser(user:UserInput):User
    registerUserAuth(registerInput:RegisterInputAuth):UserAuth
    loginUserAuth(loginInput:LoginInputAuth):UserAuth
    deleteUser(id: ID): String
    updateUser(id: ID, user: UserInput): User
}




input RegisterInput{
    firstName:String
    lastName:String
    phone:Int
    email:String 
    password: String
    passwordConfirm: String
    role: String
}

type Mutation {
    createRegister(register:RegisterInput):Register
}



type UserAuth{
    id: ID
    firstName: String
    lastName: String
    phone: Int
    email: String
    password: String
    passwordConfirm: String
    role: String
    token: String

}

input RegisterInputAuth{
    firstName:String
    lastName:String
    phone:Int
    email:String 
    password: String
    passwordConfirm: String
    role: String
    token: String
}


input LoginInputAuth{
    email:String 
    password: String
}

`
module.exports = typeDefs;