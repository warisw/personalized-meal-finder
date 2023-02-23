const axios = require("axios");
const { DecisionTreeClassifier } = require("machinelearn/ensemble");

// Fetch recipe data from Spoonacular API
async function fetchRecipes() {
  const response = await axios.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    {
      params: {
        apiKey: "78c32a77bd774294873fc3c95cc5977f",
        number: 10,
        fillIngredients: true,
        includeIngredients: "tomato",
      },
    }
  );
  return response.data.results;
}

// Extract ingredient data from recipes
function extractIngredients(recipes) {
  const ingredients = [];
  for (const recipe of recipes) {
    console.log(recipe);
    // for (const ingredient of recipe.extendedIngredients) {
    //   ingredients.push(ingredient.name);
    // }
  }
  return ingredients;
}

// Train machine learning model using decision tree
function trainModel(ingredients) {
  const classifier = new DecisionTreeClassifier();
  const labels = [];
  const samples = [];
  for (const ingredient of ingredients) {
    if (labels.indexOf(ingredient) === -1) {
      labels.push(ingredient);
    }
    samples.push([ingredient]);
  }
  classifier.train(samples, labels);
  return classifier;
}

// Fetch recipe data and train machine learning model
async function main() {
  const recipes = await fetchRecipes();
  const ingredients = extractIngredients(recipes);
  const model = trainModel(ingredients);
  console.log("Model trained:", model);
}

main();
