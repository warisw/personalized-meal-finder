const express = require("express");
const recommendMeal = require("./PythonCall");
// const collection = require("./mongoDB/mongoModel");
const cors = require("cors");
const { collection } = require("./mongoDB/mongoModel");
const app = express();

function parseRecipeText(recipeText) {
  const titleRegex = /title:\s*(.+)/i;
  const titleMatch = recipeText.match(titleRegex);

  let title = "";
  if (titleMatch) {
    title = titleMatch[1].trim();
  }

  return {
    title,
    full_text: recipeText,
  };
}

app.use(express.json());
// app.use(express.unlencoded({ extended: true }));
app.use(cors());

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
  const { email, inputData } = req.body;

  recommendMeal(inputData)
    .then(async (recipeText) => {
      const parsedRecipe = parseRecipeText(recipeText);

      try {
        await collection.updateOne(
          { email },
          { $addToSet: { mealRecommendations: parsedRecipe } }
        );
      } catch (error) {
        console.error("An error occurred while updating the user:", error);
      }

      res.send(parsedRecipe);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});

app.get("/history", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await collection.findOne({ email });
    if (user) {
      res.json(user.mealRecommendations);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.json([]);
  }
});

app.post("/specialFilters", async (req, res) => {
  const { addInputData, email } = req.body;

  try {
    await collection.updateOne(
      { email },
      { $addToSet: { specialFilters: addInputData } }
    );

    const user = await collection.findOne({ email });

    if (user) {
      res.json(user.specialFilters);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.json([]);
  }
});
app.post("/deleteHistory", async (req, res) => {
  const { email } = req.body;

  try {
    await collection.updateOne(
      { email },
      { $set: { mealRecommendations: [] } }
    );
    console.log("Meal recommendations history deleted successfully.");
  } catch (error) {
    console.error("Error deleting history:", error);
  }
});
app.post("/deleteFilters", async (req, res) => {
  const { email } = req.body;

  try {
    await collection.updateOne({ email }, { $set: { specialFilters: [] } });
    console.log("Meal recommendations history deleted successfully.");
  } catch (error) {
    console.error("Error deleting history:", error);
  }
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
    }
  } catch (e) {
    console.log(e);
    res.json("not exist");
  }
});

const PORT = 8000;
app.listen(PORT);
