import React from "react";
import "./App.css";
import Main from "./main-page/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Signup from "./signup/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
