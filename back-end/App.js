const express = require("express");
const recommendMeal = require("./PythonCall");
// const collection = require("./mongoDB/mongoModel");
const cors = require("cors");
const { collection } = require("./mongoDB/mongoModel");
const app = express();
app.use(express.json());
// app.use(express.unlencoded({ extended: true }));
app.use(cors());
app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, pass } = req.body;
  const data = {
    email: email,
    pass: pass,
  };

  try {
    const checkIfExist = await collection.findOne(data);
    console.log(checkIfExist);
    if (checkIfExist) {
      res.json("exists");
    } else {
      res.json("not exist");
    }
  } catch (e) {
    console.log(e);
    res.json("not exist");
  }
});

app.post("/home", async (req, res) => {
  const { inputData } = req.body;
  console.log("mhm");
  const mealRespond = await recommendMeal(inputData);
  console.log("AAAAA", mealRespond);
  res.send(mealRespond);
});

app.post("/signup", async (req, res) => {
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
      await collection.insertMany([data]);
      console.log([data]);
    }
  } catch (e) {
    console.log(e);
    res.json("not exist");
  }
});

const PORT = 8000;
app.listen(PORT);
