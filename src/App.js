import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";

import Homepage from "./Homepage";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    sessionStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("loggedIn");
  };

  return (
    <Router>
      <div className="App">
        {loggedIn && <Navbar handleLogout={handleLogout} />}

        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/home" />
                ) : (
                  <Login handleLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/home"
              element={
                loggedIn ? (
                  <Homepage username="ipgautomotive" />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
