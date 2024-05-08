import React from "react";
import Nav from "react-bootstrap/Nav";
import { NavLink, useParams, Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  const { projectId } = useParams();

  return (
    <>
      <div className="header__container">
        <Link to="/projects" className="header_link">
          <div className="header_name">Fuegobase</div>
        </Link>
      </div>
    </>
  );
};

export default Header;
