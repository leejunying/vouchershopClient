import React, { useEffect } from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import Icon, {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Select } from "antd";
import { Input, Space } from "antd";
import { Request_User } from "../../../../API/api";
import axios from "axios";
import { useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clientLogOut } from "../../../../Redux/Reducer/Account";
import Mobilemenu from "../Mobilemenu/mobilemenu";
const { Search } = Input;
const Header = () => {
  const dispatch = useDispatch();

  const mbhorizon = useMediaQuery("(max-width:320px)");
  const mbverti = useMediaQuery("(max-width:480px)");
  const [searchitem, setSearchitem] = useState([]);
  const [searchinput, setSearchinput] = useState("");
  const [mbmenu, setmbMenu] = useState(false);
  const [fix, setFix] = useState(false);

  const handleMbmenu = () => {
    if (mbmenu == true) setmbMenu(false);
    else setmbMenu(true);
  };

  const setFixed = () => {
    if (window.scrollY >= 150) setFix(true);
    else setFix(false);
  };

  window.addEventListener("scroll", setFixed);

  const signOut = () => {
    dispatch(clientLogOut());
  };

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
        xs={fix ? 12 : 12}
        container
        display="flex"
        alignItems="center"
        style={{
          width: "100%",
          backgroundColor: "white",
          position: fix ? "fixed" : "relative",
          top: 0,
          zIndex: 100,
        }}
      >
        <Grid item={true} xs={fix ? 6 : 9} className="flex">
          <Link to="/">
            {" "}
            <img
              style={{
                width: "100%",
              }}
              src="./logo.png"
            ></img>
          </Link>
        </Grid>

        <Grid
          container
          display="flex"
          justifyContent="flex-end"
          style={{ width: "100vw", position: "fixed", zIndex: "1", top: 10 }}
        >
          <Grid item={true} xs={3} className="Right-menu"></Grid>
          <Grid item={true} xs={7} className="Left-menu">
            <Grid
              item={true}
              xs={12}
              display="flex"
              justifyContent={"flex-end"}
            >
              <FontAwesomeIcon
                onClick={() => handleMbmenu()}
                style={{
                  cursor: "pointer",
                  fontSize: "22px",

                  right: 0,
                }}
                icon={faBars}
                id="icon"
              />
              <Grid item={true} xs={3} className="Right-menu"></Grid>
            </Grid>

            {!!mbmenu ? <Mobilemenu></Mobilemenu> : null}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  //normal screen
  return (
    <Grid
      md={fix ? 10 : 12}
      container
      style={{ zIndex: "1", position: fix ? "fixed" : "relative", top: 0 }}
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
                      style={{ width: "100px", height: "100px" }}
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
      <Grid item={true} md={5}>
        <Grid
          container
          display="flex"
          justifyContent={"center"}
          style={{ width: "100%" }}
        >
          <Grid item={true} md={2}>
            <Link to="/categorys/filter?key=SALE">
              <img
                className="saleimg"
                style={{ width: "100%" }}
                src="./sale.jpg"
              ></img>
            </Link>
          </Grid>
          <Grid item={true} md={2}>
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
                <label style={{ fontSize: "12px", cursor: "pointer" }}>
                  {" "}
                  CART
                </label>
              </Grid>
            </Link>
          </Grid>

          {user?.username ? (
            <Grid item={true} md={2}>
              {" "}
              <Link to={`/profile/${user.username}`}>
                <Grid
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid className="notification">
                    <Grid>
                      <img
                        style={{ width: "100%", height: "26px" }}
                        src={
                          user.avatar.length > 0
                            ? user.avatar
                            : "https://www.w3schools.com/howto/img_avatar2.png"
                        }
                      ></img>{" "}
                    </Grid>
                  </Grid>
                  <label
                    style={{
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {user.username}
                  </label>
                </Grid>
              </Link>
            </Grid>
          ) : null}

          {user?.username ? (
            <Grid item={true} md={2}>
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Grid className="notification">
                  <Grid>
                    <LogoutOutlined
                      onClick={() => signOut()}
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#1890ff",
                      }}
                    ></LogoutOutlined>
                  </Grid>
                </Grid>
                <label
                  style={{
                    fontSize: "13px",
                    cursor: "pointer",
                    color: "#1890ff",
                  }}
                >
                  Sign out
                </label>
              </Grid>
            </Grid>
          ) : (
            <Grid item={true} md={2}>
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Link to="/login">
                  <Grid className="notification">
                    <Grid>
                      <LoginOutlined
                        style={{
                          fontSize: "25px",
                          cursor: "pointer",
                          color: "#1890ff",
                        }}
                      ></LoginOutlined>
                    </Grid>
                  </Grid>
                  <label
                    style={{
                      fontSize: "13px",
                      cursor: "pointer",
                      color: "#1890ff",
                    }}
                  >
                    Sign in
                  </label>
                </Link>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Header;
