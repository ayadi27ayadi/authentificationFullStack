const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
       required: true
   }
}, {
    timestamps: true
});
module.exports = model("User", userSchema);


