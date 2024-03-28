import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Browse from "./pages/Browse";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Register from "./pages/Register";
import Header from "./pages/Header";
import Stats from "./pages/Stats";
import Recommendations from "./pages/Recommendations";
import Quiz from "./pages/Quiz";

import Watchlist from "./pages/Watchlist";
import { GlobalProvider } from "./context/GlobalState";


function App() {
  return (
    <div>
      <GlobalProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route exact path="/browse" element={<Browse />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/movieDetails" element={<MovieDetails />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/watchlist" element={<Watchlist />} />
            <Route exact path="/stats" element={<Stats/>}/>
            <Route exact path="/rec" element={<Recommendations/>}/>
            <Route exact path="/quiz" element={<Quiz/>} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
