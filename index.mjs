// import api route files
// import "dotenv/config";
import apiRouter from "./api/index.mjs";

// import dependencies
import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

// initialize express app
const app = express();

//integrate some middlewares
app.use(express.json());
app.use(cors());

//route all traffic using /api path to our router
app.use("/api", apiRouter);

app.use("/", (req, res) =>
  res.send("Thanks for visiting Open Tailor API homepage")
);

//start server
app.listen(
  PORT,
  console.log`express successfully started. Running on port ${PORT}`
);
