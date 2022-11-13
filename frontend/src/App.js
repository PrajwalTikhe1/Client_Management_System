import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/body/home/Home";
import Login from "./components/body/auth/Login";
import Register from "./components/body/auth/Register";
import ArticleProvider from "./context/articles/ArticleState";
import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <BrowserRouter>
      <ArticleProvider>
        <AlertProvider>
          <div className="container">
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </div>
        </AlertProvider>
      </ArticleProvider>
    </BrowserRouter>
  );
}

export default App;
