import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./components/Login";

function App() {
  return (
    <>
      <Header />
      <LoginPage />
      <Footer />
    </>
  );
}

export default App;
