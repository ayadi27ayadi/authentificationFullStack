const {gql} = require('apollo-server-express')


//Query
const typeRegister = gql`
type Register{
    id: ID
    firstName: String
    lastName: String
    phone: Int
    email: String
    password: String
    confirmed: Boolean

}

type Query{
    helloword:String
       getAllRegister: [Register]
 }
    


`
module.exports = typeRegister;








// input UserInput{
//     firstName:String
//     lastName:String
//     phone:Int
//     email:String
// }

// type Mutation {
//     createUser(user:UserInput):User
//     deleteUser(id: ID): String
//     updateUser(id: ID, user: UserInput): User
// }