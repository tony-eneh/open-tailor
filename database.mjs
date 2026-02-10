import mongoose from "mongoose";

const options = {
  dbName: "open-tailor",
};

mongoose.connect(process.env.DB_URL, options);
console.log("Connecting to:", process.env.DB_URL);
const database = mongoose.connection;

export default database;
