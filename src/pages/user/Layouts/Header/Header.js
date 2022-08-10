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
import { Select } from "antd";
import { Input, Space } from "antd";
import { Request_User } from "../../../../API/api";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
const { Search } = Input;
const Header = () => {
  const [searchitem, setSearchitem] = useState([]);
  const [searchinput, setSearchinput] = useState("");

  const fetchDropdownOptions = (key) => {
    axios.get(Request_User.getsearchvoucher(key)).then((res) => {
      if (res.status == 200) {
        setSearchitem(res.data);
      }
    });
  };

  const handleInputOnchange = (e) => {
    const { value } = e.target;

    setSearchinput(value);
    debounceDropDown(value);
    if (value.length == 0) {
      setSearchitem([]);
    }
  };
  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
    [],
  );

  const cart = useSelector((state) => (state = state.cart.items));

  return (
    <nav
      style={{ postion: "relative", zIndex: "1" }}
      className="navbar navbar-expand-lg navbar-light header-container d-flex  align-items-center flex-row"
    >
      <Link
        className="navbar-brand col-6 d-flex align-items-center logo justify-content-start"
        to="/"
      >
        {" "}
        <img style={{ width: "100%" }} src="./logo.png"></img>
      </Link>
      <div className="form-inline col-5 pr-0 pl-0 mr-0 d-flex align-items-center ">
        <Input
          size="large"
          placeholder="search"
          prefix={<SearchIcon />}
          value={searchinput}
          onChange={handleInputOnchange}
        />

        <div
          style={{
            width: "88.625%",
            position: "absolute",
            zIndex: "1",
            top: "30px",
            backgroundColor: "white",
          }}
          className="search-list"
        >
          {searchitem.map((item) => {
            return (
              <Link
                onClick={() => setSearchitem([])}
                replace
                to={`/vouchers/${item.slug}`}
              >
                <div key={item} className="item">
                  {" "}
                  <img
                    style={{ width: "100px", heigth: "100px" }}
                    src={item.img_url}
                  ></img>
                  <p>{item.title}</p>
                </div>{" "}
              </Link>
            );
          })}
        </div>
      </div>
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
