const { Schema, model } = require("mongoose");
const bcrypt = require ('bcryptjs');

const isEmailValidator = require('validator').isEmail;
const userauthSchema = new Schema({
    firstName: {
       type: String,
       required: true
    },
    lastName: {
        type: String,
        required: true
     },
    phone: {
       type: Number,
       required: true
    },
    email: {
      type: String,
      required: true,
      validate: [isEmailValidator, 'No valid email address provided.'],
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      maxlength: 42,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: 'Passwords do not match',
      },
    },
    role: {
      type: String,
      default: 'user',
    },
    verified: {
      type: Boolean,
      default: true,
      select: false,
    },
    token: { type:String}

}, {
    timestamps: true
});

userauthSchema.index({ email: 1 });

userauthSchema.pre('save', async function (next) {
  // Check if the password has been modified
  if (!this.isModified('password')) return next();

  // Hash password with strength of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove the password confirm field
  this.passwordConfirm = undefined;
  next();
});

userauthSchema.methods.comparePasswords = async function (
  candidatePassword,
  hashedPassword
) {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};


module.exports = model("UserAuth", userauthSchema);


