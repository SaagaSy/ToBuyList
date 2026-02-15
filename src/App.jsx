import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ToBuyList from "./pages/ToBuyList";

// Handles layout, routing and structure of UI

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToBuyList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
