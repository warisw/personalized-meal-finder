import axios from "axios";
import React, { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const home = useNavigate();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      await axios
        .post("http://localhost:8000/", {
          email,
          pass,
        })
        .then((res) => {
          if (res.data === "exists") home("/home");
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <form action="POST" method="POST">
        <input
          type="text"
          placeholder=""
          onChange={(event) => setEmail(event.target.value)}
          name="email-input"
          id=""
        />
        <input
          type="password"
          placeholder=""
          onChange={(event) => setPass(event.target.value)}
          id=""
        />
        <input type="submit" onClick={handleSubmit} />
        {pass}
      </form>

      <p>OR</p>
      <Link to="/signup">Signup</Link>
    </div>
  );
}
