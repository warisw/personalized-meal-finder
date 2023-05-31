import "./App.css";
import Main from "./MainPage/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import RequireAuth from "./MainPage/RequireAuth";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
      />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
