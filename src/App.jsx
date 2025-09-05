import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/registerPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
