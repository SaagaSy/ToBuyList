import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Parse from "./services/parse";
import "./App.css";
import ToBuyList from "./pages/ToBuyList";

// Handles layout, routing and structure of UI

function App() {
  // Global state for tracking if user is logged in
  const [currentUser, setCurrentUser] = useState(null);

  // Check for a logged-in user when app opens:
  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar currentUser={currentUser} />

      <div className="content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/auth"
            element={<Auth setCurrentUser={setCurrentUser} />}
          />
          <Route path="/list" element={<ToBuyList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
