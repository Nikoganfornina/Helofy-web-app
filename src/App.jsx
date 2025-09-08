import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/registerPage";
import { VerifyEmailPage } from "./pages/VerifyEmailPage";
import { AdminResultPage } from "./pages/AdminResultPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/admin-result" element={<AdminResultPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
