import { Button } from "@mui/material";
import React, { useState } from "react";
import * as Styled from "./Main.style";

function Main() {
  const [inputData, setInputData] = useState("");

  return (
    <Styled.Container>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
      />
      <Styled.Header>
        <Button onClick={() => console.log("clicked")}>logout</Button>
      </Styled.Header>
      <Styled.InnerContainer>
        <Styled.Title>Find your mmMeal ..!</Styled.Title>
        <Styled.InputContainer>
          <Styled.Label htmlFor="user-input-data">Enter data </Styled.Label>
          <Styled.CustomInput
            type="text"
            placeholder="tomato,3 potatos, onions, greek"
            name="user-input-data"
            onChange={(event) => setInputData(event?.target.value)}
          />
          <Button onClick={() => console.log("clicked")}>search</Button>
        </Styled.InputContainer>
      </Styled.InnerContainer>
    </Styled.Container>
  );
}

export default Main;
