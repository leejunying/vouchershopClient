import React, { useEffect } from "react";
import "./Header.css";
import SearchBar from "../../../../Components/SearchBar/SearchBar";
import TestData from "../../../../Components/SearchBar/TestData.json";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Icon, { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const Header = () => {
  const cart = useSelector((state) => (state = state.cart.items));

  return (
    <nav className="navbar navbar-expand-lg navbar-light header-container d-flex  align-items-center flex-row">
      <Link
        className="navbar-brand col-5 d-flex align-items-center logo justify-content-start"
        to="/"
      >
        {" "}
        <img style={{ width: "100%" }} src="./logo.png"></img>
      </Link>
      <form className="form-inline col-5 pr-0 pl-0 mr-0 d-flex justify-content-center align-items-center justify-content-center">
        <input
          className="form-control col-7 mr-1 searchInput"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success  d-flex justify-content-center align-items-center  Btton"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse align-self-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item flex col  ">
            <Link to="/cart" className="notification">
              <ShoppingCartOutlined style={{ fontSize: "32px" }} />
              <span className="badge">{cart.length}</span>
            </Link>
          </li>
          <li className="nav-item  flex col">
            <Link
              className="notification"
              style={{ fontSize: "18px" }}
              to="/login"
            >
              <UserOutlined style={{ fontSize: "32px" }} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
