import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from "./Main.style";

function Main() {
  const [inputData, setInputData] = useState("");
  const [meals, setMeals] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/home", {
        inputData,
      });
      const meals = response.data;

      setMeals(meals);
      console.log("REACT", meals);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
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
      <Styled.InnerContainer>
        <Styled.Title>Find your mmMeal...</Styled.Title>
        <Styled.InputContainer>
          <Styled.Label htmlFor="user-input-data">
            What would you like?
          </Styled.Label>
          <Styled.CustomInput
            type="text"
            placeholder="tomato, 3 potatos, onions, greek"
            name="user-input-data"
            onChange={(event) => setInputData(event?.target.value)}
          />
          <Button onClick={handleSubmit}>search</Button>
        </Styled.InputContainer>
        {isLoading ? (
          <>
            <Styled.Label>Searching the best recipe for you!!</Styled.Label>

            <CircularProgress size={24} />
          </>
        ) : (
          meals && (
            <Styled.MealContainer>
              <Styled.MealTitle>Meal Details:</Styled.MealTitle>
              <Styled.MealDetails>
                {meals.split("\n").map((line, index) => (
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
