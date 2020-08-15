import mongoose from "mongoose";

const options = {
  dbName: "open-tailor",
  useNewUrlParser: true,
};
mongoose.connect(process.env.DB_URL, options);

const database = mongoose.connection;

export default database;
