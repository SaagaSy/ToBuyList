import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { getCurrentUser } from "./services/authService";
import NavBar from "./components/NavBar";
import ToBuyList from "./pages/ToBuyList";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import OverviewLists from "./pages/OverviewLists";
import { createGlobalStyle } from "styled-components";

// Handles layout, routing and struscture of UI

// Global styles
const GlobalStyle = createGlobalStyle`
body {
  background-color:#fffefb;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-sizing: border-box;
}
  *, *::before, *::after {
    box-sizing: inherit;
  } 
`;

function App() {
  // Global state for tracking if user is logged in
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  return (
    <BrowserRouter>
      <GlobalStyle />
      <NavBar currentUser={currentUser} />

      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/lists" replace /> : <Welcome />
            }
          />

          <Route
            path="/auth"
            element={<Auth setCurrentUser={setCurrentUser} />}
          />
          <Route path="/lists" element={<OverviewLists />} />
          <Route path="/list/:listId" element={<ToBuyList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
