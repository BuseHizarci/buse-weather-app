import React from "react";
import "./Styles.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
         <Weather defaultCity="London" />
         <footer>
           This app Coded by {""}
           <a href = "https://www.linkedin.com/in/buse-hizarci-258342111/" target="_blank">
             Buse HIZARCI
           </a>{" "}
           and is {""}
           <a href="https://github.com/BuseHizarci" target="_blank">
             {""}
           </a>
         </footer>
      </div>
    </div>
  );
}

