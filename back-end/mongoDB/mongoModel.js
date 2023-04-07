const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new mongoose.Schema({
  title: String,
  full_text: String,
});
const uri =
  "mongodb+srv://ice18390061:ice183900613583@cluster0.63nvrba.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected "))
  .catch((e) => {
    console.log("failed", e);
  });

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    mealRecommendations: [recipeSchema],
  },
  { timestamps: true }
);

const collection = mongoose.model("collection", userSchema);

module.exports = collection;
