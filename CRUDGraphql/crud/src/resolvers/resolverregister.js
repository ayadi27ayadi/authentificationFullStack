const Register = require("../models/Register");

//Resolvers
const resolverregister={
    Query:{
          helloword:()=>{
                return "khoukha fait confiance en vous meme "
          }, 
          getAllRegister: async () => {
            return await Register.find();

          },
       
    },



    Mutation: {
    //   async createUser(parent,{user},context,info){
    //     // console.log('args',user)

    //     const {firstName,lastName,phone,email} = user
    //      const newUser = new User({firstName,lastName,phone,email});
    //      console.log('user',user)
    //      await newUser.save();
    //      return newUser;
    // },

    
    // async deleteUser(_, { id }) {
    //   await User.findByIdAndDelete(id);
    //   return "User Deleted";
    // }, 


//     async updateUser(_, { id, user }) {
//       const { firstName,lastName,phone,email } = user;
//       const newUser= await User.findByIdAndUpdate(
//         id,
//         {
//           $set: {
//             firstName,
//             lastName,
//             phone,
//             email
//           },
//         },
//         {
//           new: true,
//         }
//       );
//       return newUser;
//     },
   },

};

module.exports= resolverregister