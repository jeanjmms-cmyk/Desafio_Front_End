import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <img src="https://gridenergia.com.br/wp-content/uploads/2025/02/assinatura-preto.png" />
        </Link>
        <div className="nav">
          <Link to="/List" className="nav-option">
            Lista
          </Link>
          <Link className="fake-button" to="/Form">
            Cadastro
          </Link>
        </div>
      </div>
      <div className="body"></div>
    </>
  );
};

export default Nav;
