import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Styled from "./Login.style";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isWrongIn, setWrongIn] = useState(false);
  const home = useNavigate();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (email.length === 0 || pass.length === 0) {
      setIsEmpty(true);
      return;
    }

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          pass,
        })
        .then((res) => {
          if (res.data === "exists") {
            home("/home");
            localStorage.setItem("logedIN", email);
          } else setWrongIn(true);
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Styled.Container>
      <Styled.TitleLabel>Meal Finder</Styled.TitleLabel>
      <Styled.InnerContainer>
        <Styled.Title>Login</Styled.Title>
        <Styled.Form action="POST" method="POST">
          <Styled.Input
            type="text"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            name="email-input"
            id="login-email"
          />
          <Styled.Input
            type="password"
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
            id="login-password"
          />
          {isEmpty && (
            <Styled.Error>Email or Password cant be empty</Styled.Error>
          )}{" "}
          {isWrongIn && <Styled.Error>Wrong Email or Password</Styled.Error>}
          <Styled.Submit type="submit" onClick={handleSubmit} />
        </Styled.Form>

        <p>
          Not register? <Link to="/signup">Click here</Link>{" "}
        </p>
      </Styled.InnerContainer>
    </Styled.Container>
  );
}
