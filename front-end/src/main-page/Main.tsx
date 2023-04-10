import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Main.style";

interface Recipe {
  title: string;
  full_text: string;
}

function Main() {
  const [inputData, setInputData] = useState("");
  const [addInputData, setAddInputData] = useState("");
  const [meals, setMeals] = useState({ title: "", full_text: "" });
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [recipeHistory, setRecipeHistory] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipeHistory();
  }, [isLoading]);

  async function fetchRecipeHistory() {
    try {
      const response = await axios.get("http://localhost:8000/history", {
        params: {
          email: localStorage.getItem("logedIN"),
        },
      });
      const history = response.data;
      setRecipeHistory(history);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const finalData = inputData + "," + addInputData;

    try {
      const response = await axios.post("http://localhost:8000/home", {
        email: localStorage.getItem("logedIN"),
        inputData: finalData,
        addInputData,
      });
      const meals = response.data;

      setMeals(meals);
    } catch (error) {
      console.log(error);
    }

    try {
      addInputData &&
        axios.post("http://localhost:8000/specialFilters", {
          addInputData,
          email: localStorage.getItem("logedIN"),
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSettingsClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteHistory = async () => {
    axios.post("http://localhost:8000/deleteHistory", {
      email: localStorage.getItem("logedIN"),
    });
    handleMenuClose();
  };

  const handleDeleteSpecialFilters = () => {
    axios.post("http://localhost:8000/deleteFilters", {
      email: localStorage.getItem("logedIN"),
    });
    handleMenuClose();
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Button
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          logout
        </Button>
        <Button>{localStorage.getItem("logedIN")}</Button>
      </Styled.Header>

      <Styled.RecipeHistoryDropdown
        onChange={(event) => {
          const selectedRecipe = recipeHistory.find(
            (recipe) => recipe.title === event.target.value
          );
          if (selectedRecipe) {
            setMeals(selectedRecipe);
          }
        }}
      >
        <option value="">Select a recipe from history</option>
        {recipeHistory.map((recipe, index) => (
          <option key={index} value={recipe.title}>
            {recipe.title}
          </option>
        ))}
      </Styled.RecipeHistoryDropdown>
      <Styled.SettingsContainer>
        <Button onClick={handleSettingsClick}>Settings</Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteHistory}>Delete History</MenuItem>
          <MenuItem onClick={handleDeleteSpecialFilters}>
            Delete Special Filters
          </MenuItem>
        </Menu>
      </Styled.SettingsContainer>

      <Styled.InnerContainer>
        <Styled.Title>Find your mmMeal...</Styled.Title>
        <Styled.InputContainer>
          <Styled.InputInnerCont>
            <Styled.Label htmlFor="user-input-data">
              Add your ingredients
            </Styled.Label>
            <Styled.CustomInput
              type="text"
              placeholder="tomato, 3 potatos, onions, greek"
              name="user-input-data"
              error={isEmpty}
              onChange={(event) => {
                setInputData(event?.target.value);
                inputData.length > 1 ? setIsEmpty(false) : setIsEmpty(true);
              }}
            />
          </Styled.InputInnerCont>
          <Styled.InputInnerCont>
            <Styled.Label htmlFor="special-input">
              Any additional filters?
            </Styled.Label>
            <Styled.CustomInput
              type="text"
              placeholder="low calories, gluten free"
              name="special-input"
              onChange={(event) => setAddInputData(event?.target.value)}
            />
          </Styled.InputInnerCont>
          <Styled.SubmitButton
            disabled={isEmpty}
            onClick={(event) => !isEmpty && handleSubmit(event)}
          >
            search
          </Styled.SubmitButton>
        </Styled.InputContainer>
        {isLoading ? (
          <>
            <Styled.Label>Searching the best recipe for you!!</Styled.Label>

            <CircularProgress size={24} />
          </>
        ) : (
          meals.full_text && (
            <Styled.MealContainer>
              <Styled.MealTitle>Meal Details:</Styled.MealTitle>
              <Styled.MealDetails>
                {meals.full_text.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </Styled.MealDetails>
            </Styled.MealContainer>
          )
        )}
      </Styled.InnerContainer>
    </Styled.Container>
  );
}

export default Main;
