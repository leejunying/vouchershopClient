import React, { useEffect } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Icon, { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { Input, Space } from "antd";
import { Request_User } from "../../../API/api";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Search } = Input;
const Header = () => {
  const mbhorizon = useMediaQuery("(max-width:320px)");
  const mbverti = useMediaQuery("(max-width:480px)");
  const [searchitem, setSearchitem] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [mbmenu, setmbMenu] = useState(false);
  const [fix, setFix] = useState(false);

  const setFixed = () => {
    if (window.scrollY >= 300) setFix(true);
    else setFix(false);
  };

  window.addEventListener("scroll", setFixed);

  const fetchDropdownOptions = (key) => {
    axios.get(Request_User.getsearchvoucher(key)).then((res) => {
      if (res.status == 200) {
        setSearchitem(res.data);
      }
    });
  };

  const handleInputOnchange = (e) => {
    const { value } = e.target;

    if (value.length < 2) {
      setSearchitem([]);
    } else {
      debounceDropDown(value);
    }
    setSearchinput(value);
  };
  const debounceDropDown = useCallback(
    debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
    [],
  );

  const cart = useSelector((state) => (state = state.cart.items));

  const user =
    useSelector((state) => {
      return state.account.Client;
    }) || undefined;

  //mb screen
  if (mbhorizon == true || mbverti == true) {
    return (
      <Grid
        container
        display="flex"
        alignItems="center"
        style={{ width: "100%", backgroundColor: "white" }}
      >
        <Grid item={true} xs={2}>
          <FontAwesomeIcon
            onClick={() => setmbMenu(true)}
            style={{ cursor: "pointer", fontSize: "18px" }}
            icon={faBars}
            id="icon"
            className="d-flex align-items-center"
          />
        </Grid>

        <Grid item={true} xs={9} className="flex">
          <Link to="/">
            {" "}
            <img style={{ width: "100%" }} src="./logo.png"></img>
          </Link>
        </Grid>
      </Grid>
    );
  }

  //normal screen
  return (
    <Grid
      xs={0}
      md={12}
      container
      style={{ postion: "relative", zIndex: "1" }}
      className="navbar navbar-expand-lg navbar-light header-container d-flex  align-items-center flex-row"
    >
      <Grid display={"flex"} justifyContent="center" item={true} md={2}>
        <Link to="/">
          {" "}
          <img style={{ width: "95%" }} src="./logo.png"></img>
        </Link>
      </Grid>

      <Grid item={true} md={5}>
        <Grid style={{ width: "100%", position: "relative" }}>
          <Input
            size="large"
            placeholder="search"
            prefix={<SearchIcon />}
            value={searchinput}
            onChange={handleInputOnchange}
          />

          <Grid
            style={{
              width: "100%",
              position: "absolute",
              zIndex: "1",
              top: "40px",

              backgroundColor: "white",
            }}
            className=" search-list"
          >
            {searchitem.map((item) => {
              return (
                <Link
                  onClick={() => setSearchitem([])}
                  replace
                  to={`/vouchers/${item.slug}`}
                >
                  <Grid key={item} className="item">
                    {" "}
                    <img
                      style={{ width: "100px", heigth: "100px" }}
                      src={item.img_url}
                    ></img>
                    <p>{item.title}</p>
                  </Grid>{" "}
                </Link>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} md={4}>
        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          style={{ width: "100%" }}
        >
          <Grid item={true} md={3}>
            <Link to="/categorys/sale">
              <img
                className="saleimg"
                style={{ width: "100%" }}
                src="./sale.jpg"
              ></img>
            </Link>
          </Grid>
          <Grid item={true} md={3}>
            {" "}
            <Link to="/cart">
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid className="notification">
                  <Grid>
                    <ShoppingCartOutlined
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                  <span className="badge">{cart.length}</span>
                </Grid>
                <label style={{ fontSize: "14px", cursor: "pointer" }}>
                  {" "}
                  CART
                </label>
              </Grid>
            </Link>
          </Grid>
          <Grid item={true} md={3}>
            {" "}
            <Link
              className="notification"
              style={{ fontSize: "18px" }}
              to={user?.username ? "/profile" : "/login"}
            >
              {user?.username ? (
                <Grid display="flex" flexDirection="column">
                  <label
                    style={{
                      fontSize: "14px",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    {user.username}
                  </label>
                </Grid>
              ) : (
                <Grid
                  display="flex"
                  flexDirection="column"
                  alignItems={"center"}
                  style={{ cursor: "pointer" }}
                >
                  <UserOutlined
                    style={{
                      fontSize: "25px",
                    }}
                  />
                  <label style={{ fontSize: "14px", cursor: "pointer" }}>
                    {" "}
                    LOGIN
                  </label>
                </Grid>
              )}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
