const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect(process.env.MONGODB_URI || "mongodb://localhost:27017/crudgraphql");
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { connectDb };