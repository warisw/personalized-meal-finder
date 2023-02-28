import axios from "axios";
import React, { SyntheticEvent, useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      await axios.post("http://localhost:8000/signup", {
        email,
        pass,
      });
      console.log("sent");
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
    </div>
  );
}
