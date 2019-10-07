import React from "react";
import ReactDOM from "react-dom";
import Bike from "./Bike";

import "./styles.css";

function App() {
  return <Bike />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
