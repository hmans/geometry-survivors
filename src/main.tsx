import { Loader } from "@react-three/drei";
import React from "react";
import ReactDOM from "react-dom/client";
import Game from "./Game";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Loader />
    <Game />
  </React.StrictMode>
);
