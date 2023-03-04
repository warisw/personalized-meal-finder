import React from "react";
import "./App.css";
import Main from "./main-page/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import RequireAuth from "./main-page/RequireAuth";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          {/* <Route path="/home" element={<Main />} /> */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
