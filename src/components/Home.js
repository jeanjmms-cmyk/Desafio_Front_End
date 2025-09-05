import React from "react";
import Nav from "./Head";
import home from "../images/home.png";

const Home = () => {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="home-img-container">
        <h1>Desafio Front End Junior</h1>
        <img className="home-img" src={home} alt="Home" />
      </div>
    </div>
  );
};

export default Home;
