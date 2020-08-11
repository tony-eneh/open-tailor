import express from "express";

const router = express.Router();

router.use("/", (req, res) => {
  res.send("got your request");
});

export default router;
