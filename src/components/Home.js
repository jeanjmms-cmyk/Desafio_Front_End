import React from "react";
import Nav from "./Head";
import img from "../images/img.jpg";

const Home = () => {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="homepage">
        <h1 className="home-itens">Desafio Front End Junior</h1>
      </div>
      <div className="home-img-container">
        <img className="home-img" src={img} alt="home page image" />
      </div>
    </div>
  );
};

export default Home;
