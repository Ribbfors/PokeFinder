import React from "react";
import Pokeball from "./images/pokeball.png";
import "./header.css";

const Header = () => {
  return (
    <div className="head">
      <nav>
        <h1>
          Poké<span>Finder</span>
        </h1>
        <img className="pball" src={Pokeball} alt="" />
      </nav>
    </div>
  );
};

export default Header;
