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

  console.log(inputData);
  const natural = require("natural");

  // create a tokenizer and stemmer
  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer;

  const preprocessInput = (input) => {
    input = input.toLowerCase();
    const tokens = tokenizer.tokenize(input);

    // remove stop words
    const stopWords = natural.stopwords;
    const filteredTokens = tokens.filter((token) => !stopWords.includes(token));

    // stem the tokens
    const stemmedTokens = filteredTokens.map((token) => stemmer.stem(token));

    // remove punctuation
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const finalTokens = stemmedTokens.map((token) => token.replace(regex, ""));

    // return the preprocessed and tokenized input
    return finalTokens;
  };

  const preprocessedInput = preprocessInput(inputData);
  console.log(preprocessedInput);
  recommendMeal(preprocessedInput);
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
