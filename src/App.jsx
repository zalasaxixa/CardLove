import React from "react";
import Login from "./pages/Login/Login";
import "./App.css";
import Home from "./pages/Home/Home";
import { useRoutes, BrowserRouter } from "react-router-dom";
import { MusicProvider } from "./pages/Player/MusicContent";
import Background from "../src/assets/background.mp4";

const App = () => {
  const routes = useRoutes([
    { path: "/home", element: <Home /> },
    { path: "/", element: <Login /> },
  ]);
  return (
    <div className="app">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={Background} type="video/mp4" />
      </video>
      {routes}
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <MusicProvider>
      <App />
    </MusicProvider>
  </BrowserRouter>
);

export default Root;
