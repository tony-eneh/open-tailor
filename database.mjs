import mongoose from "mongoose";

const options = { dbname: "open-tailor", useNewUrlParser: true };
mongoose.connect(process.env.DB_URL, options);

const database = mongoose.connection;

export default database;
