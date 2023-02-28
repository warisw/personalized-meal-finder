const express = require("express");
// const collection = require("./mongoDB/mongoModel");
const cors = require("cors");
const { collection } = require("./mongoDB/mongoModel");
const app = express();
app.use(express.json());
// app.use(express.unlencoded({ extended: true }));
app.use(cors());
console.log("as");
app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, pass } = req.body;
  const data = {
    email: email,
    pass: pass,
  };

  try {
    const checkIfExist = await collection.findOne({ email: email });

    if (checkIfExist) {
      res.json("exists");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    res.json("not exist");
  }
});

app.post("/signup", async (req, res) => {
  const { email, pass } = req.body;

  const data = {
    email: email,
    pass: pass,
  };
  console.log("signup");
  try {
    const checkIfExist = await collection.findOne({ email: email });

    if (checkIfExist) {
      res.json("exists");
    } else {
      res.json("not exist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("not exist");
  }
});

const PORT = 8000;
app.listen(PORT);
