const express = require("express");
const { ApolloServer } = require ("apollo-server-express");
const mongoose = require("mongoose");
const resolvers = require("./src/resolvers/resolveruser");
const resolverregister = require("./src/resolvers/resolverregister")
const typeDefs = require("./src/types/typeDefs");
const {connectDb} = require("./src/config/mongoose");
const typeRegister = require("./src/types/typeRegister");

const app = express();
//Database Connection
connectDb();




//Query

// const typeDefs = gql`
// type Query{
//       hello:String
// }
// `

//Resolvers

// const resolvers={
//       Query:{
//             hello:()=>{
//                   return "khoukha courage"
//             }
//       }
// }

async function start() {

  
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    resolverregister,
   

  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log(`App is listening on http://localhost:4000`));

};
start();
