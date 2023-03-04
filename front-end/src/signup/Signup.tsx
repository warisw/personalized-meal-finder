import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Styled from "./Signup.style";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isExist, setIsExist] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const home = useNavigate();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (email.length === 0 || pass.length === 0) {
      setIsEmpty(true);
      return;
    }

    try {
      await axios
        .post("http://localhost:8000/signup", {
          email,
          pass,
        })
        .then((res) => {
          if (res.data === "not exist") home("/");
          else setIsExist(true);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Styled.Container>
      <Styled.TitleLabel>Meal Finder</Styled.TitleLabel>
      <Styled.InnerContainer>
        <Styled.Title>Signup</Styled.Title>
        <Styled.Form action="POST" method="POST">
          <label htmlFor="email-input">email</label>
          <Styled.Input
            type="text"
            placeholder=""
            onChange={(event) => setEmail(event.target.value)}
            name="email-input"
          />
          <label htmlFor="password">password</label>
          <Styled.Input
            type="password"
            placeholder=""
            onChange={(event) => setPass(event.target.value)}
            name="password"
          />
          {isExist && <Styled.Error>User Already exists</Styled.Error>}
          {isEmpty && (
            <Styled.Error>Email or Password cant be empty</Styled.Error>
          )}
          <Styled.Submit type="submit" onClick={handleSubmit} />

          <p>
            Already register? <Link to="/">Click here</Link>{" "}
          </p>
        </Styled.Form>
      </Styled.InnerContainer>
    </Styled.Container>
  );
}
