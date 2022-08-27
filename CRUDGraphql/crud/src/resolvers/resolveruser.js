const User = require("../models/User");
const Register = require("../models/Register");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-errors')
const { UserInputError } = require("apollo-server-express");
const UserAuth = require("../models/UserAuth");
//Resolvers


const resolveruser={


    Query:{
          hello:()=>{
                return "khoukha courage"
          }, 
          getAll: async () => {
            return await User.find();

          },
          helloword:()=>{
            return "khoukha faite  confiance en vous meme "
      }, 
      getAllRegister: async () => {
        return await Register.find();

      },

      login: async (parent,{email,password},context,inf) => {
        const register = await Register.findOne({ email: email });
        if (!register) {
          throw new Error('register does not exist!');
        }
        const isEqual = await bcrypt.compare(password, register.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
          { userId: register.id, email: register.email },
          'somesupersecretkey',
          {
            expiresIn: '1h'
          }
        );
        return { userId: register.id, token: token, tokenExpiration: 1 };
      },
    
      userauth:(_, {ID}) => UserAuth.findById(ID)
       
    },

    

    Mutation: {
      async createUser(parent,{user},context,info){
        
    
        // console.log('args',user)
        const {firstName,lastName,phone,email} = user
         const newUser = new User({firstName,lastName,phone,email});
         console.log('user',user)
         await newUser.save();
         return newUser;
    },

    async createRegister(parent,{register},context,info){
      // console.log('args',user)
   
      const {firstName,lastName,phone,email,password,passwordConfirm,role} =  register
       const newRegister = new Register({firstName,lastName,phone,email,password,passwordConfirm,role});
       console.log('register',register)
      await newRegister.save();
      return newRegister;
  },


 async registerUserAuth(_, {registerInput: {firstName,lastName,phone,email,password,passwordConfirm,role}}) {
  const oldUser = await UserAuth.findOne({email});

  if(oldUser){
    throw new ApolloError('A user is already register with th email' + email, 'Uer alerdy' )
  }
  // var encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = new UserAuth({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email.toLowerCase(),
    password: password,
    passwordConfirm: passwordConfirm,
    role : role
  });

  const token = jwt.sign(
    { user_Id: newUser._id, email },
    'somesupersecretkey',
    {
      expiresIn: '2h'
    }
  );
  newUser.token = token;
  const res = await newUser.save();
  return {
    id: res.id,
    ...res._doc
  }
 },


async loginUserAuth(_, {loginInput: {email, password}}) {
  const user = await UserAuth.findOne({email});
  if(user && ( await bcrypt.compare(password, user.password))) 
  
{  
  const token = jwt.sign(
    { user_Id: user._id, email },
    'somesupersecretkey',
    {
      expiresIn: '2h'
    }
  );
  user.token = token;
  return {
    id: user.id,
    ...user._doc
  }
} else{
  throw new ApolloError('incorect password', 'INCORECT_PASSWORD')
}

},


    async deleteUser(_, { id }) {
      await User.findByIdAndDelete(id);
      return "User Deleted";
    }, 


    async updateUser(_, { id, user }) {
      const { firstName,lastName,phone,email } = user;
      const newUser= await User.findByIdAndUpdate(
        id,
        {
          $set: {
            firstName,
            lastName,
            phone,
            email
          },
        },
        {
          new: true,
        }
      );
      return newUser;
    },
  },

};

module.exports= resolveruser