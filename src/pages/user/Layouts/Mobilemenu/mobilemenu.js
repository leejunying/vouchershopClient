import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Request_User } from "../../../../API/api";
import axios from "axios";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { clientLogOut } from "../../../../Redux/Reducer/Account";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
const Mobilemenu = () => {
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState(0);
  const [opencate, setOpencate] = useState(false);
  const cart = useSelector((state) => (state = state.cart.items));
  const user =
    useSelector((state) => {
      return state.account.Client;
    }) || undefined;

  const dispatch = useDispatch();

  const handleOpencate = () => {
    if (opencate == true) setOpencate(false);
    else setOpencate(true);
  };
  const signOut = () => {
    dispatch(clientLogOut());
  };

  const getCategory = () => {
    axios.get(Request_User.getcategory).then((res) => {
      if (res.status == 200) {
        setCategory(res.data);
      }
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Grid
      style={{ padding: "30px", backgroundColor: "white" }}
      container
      display="flex"
      flexDirection="column"
      rowSpacing={2}
    >
      <Grid item={true} className="flex">
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
      <Grid display="flex" item={true}>
        <Link to="/cart">
          <Grid display="flex" flexDirection="column" alignItems="center">
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
            <label style={{ fontSize: "12px", cursor: "pointer" }}> CART</label>
          </Grid>
        </Link>
      </Grid>
      {user?.username ? (
        <Grid item={true} display="flex">
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
      <Grid item={true} display="flex">
        {user?.username ? (
          <Grid display="flex" item={true}>
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
          <Grid item={true} display="flex">
            <Link to="/login">
              <Grid
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
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
              </Grid>
            </Link>
          </Grid>
        )}
      </Grid>

      <Grid item={true}>
        <Button onClick={() => handleOpencate()}>VOUCHERS</Button>
        {!!opencate
          ? category.map((item, indx) => {
              return (
                <Grid key={indx} item={true} display="flex" className="">
                  <Grid item={true}>
                    <Link
                      onClick={() => setSelected(indx)}
                      className={
                        selected == indx ? "text-menu:active" : "text-menu"
                      }
                      replace
                      to={
                        item.key.includes("Lo") == true
                          ? `/categorys/filter?tag=${item.key}`
                          : `/categorys/filter?key=${item.key}`
                      }
                    >
                      {item.title}
                    </Link>
                  </Grid>{" "}
                </Grid>
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};
export default Mobilemenu;
