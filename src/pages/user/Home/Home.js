import React, { useEffect, useState, Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Contacts from "../Contacts";

import { BrowserRouter as Router, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { clientLogin } from "../../../Redux/Reducer/Account";
import { Commonfc } from "../../../Ultis/Commonfunction";
import { addItem, removeItem } from "../../../Redux/Reducer/Cart";
import Grid from "@mui/material/Grid";
import Banner from "../../../Components/Banner/Banner";
import CardItem from "../Vounchers/Card/index";
import axios from "axios";
import "./Home.css";
import { Request_User } from "../../../API/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  //define using
  const dispatch = useDispatch();
  const state = useSelector((state) => (state = state));

  console.log(state);

  //local state

  const [topvoucher, Settopvoucher] = useState([]);

  // const mobiles1 = useMediaQuery("(max-width:320px)");

  // const mobiles2 = useMediaQuery("(max-width:600px)");

  // const GridXs = {
  //   opt1: 6,
  //   opt2: 10,
  //   opt3: 12,
  // };

  //Mount

  useEffect(() => {
    axios
      .get(Request_User.topvoucher)
      .then((res) => {
        if (res.status == 200) {
          Settopvoucher(res["data"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //init value
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  //init state

  //Effect

  //mount

  return (
    <div>
      <section className="Slider">
        <Banner></Banner>
      </section>
      <section className="Main-menu">
        <Grid
          style={{ margin: "15px" }}
          display={"flex"}
          container
          justifyContent={"center"}
        >
          <Grid item={true} md={2}>
            {" "}
            <Link to="/categorys/CV">
              <Grid
                className="item"
                direction="column"
                alignItems={"center"}
                display={"flex"}
                justifyContent="center"
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="./gift-voucher.png"
                ></img>
                <small>COMBO VOUCHERS</small>
              </Grid>
            </Link>
          </Grid>
          <Grid item={true} md={2}>
            {" "}
            <Link to="/categorys/DVND">
              <Grid
                className="item"
                display={"flex"}
                justifyContent="center"
                direction="column"
                alignItems={"center"}
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="./island.png"
                ></img>
                <small>DỊCH VỤ NGHỈ DƯỠNG</small>
              </Grid>
            </Link>
          </Grid>
          <Grid item={true} md={2}>
            {" "}
            <Link to="/categorys/DVHK">
              <Grid
                className="item"
                display={"flex"}
                direction="column"
                justifyContent="center"
                alignItems={"center"}
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="./world.png"
                ></img>
                <small>DỊCH VỤ HÀNG KHÔNG</small>
              </Grid>
            </Link>
          </Grid>
          <Grid item={true} md={2}>
            {" "}
            <Link to="/categorys/DVLK">
              <Grid
                className="item"
                display={"flex"}
                direction="column"
                alignItems={"center"}
                justifyContent="center"
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="./credit.png"
                ></img>
                <small>DỊCH VỤ LIÊN KẾT</small>
              </Grid>
            </Link>
          </Grid>
          <Grid item={true} md={2}>
            {" "}
            <Link to="/categorys/DVG">
              <Grid
                className="item"
                display={"flex"}
                direction="column"
                alignItems={"center"}
                justifyContent="center"
              >
                <img
                  style={{ width: "100px", height: "100px" }}
                  src="./golf.png"
                ></img>
                <small>DỊCH VỤ GOLF</small>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </section>
      <section className="Vouchers-box">
        {topvoucher ? (
          topvoucher.map((main, indx) => {
            return (
              <div>
                <div
                  className="productSection d-flex justify-content-center flex-column"
                  key={indx}
                >
                  {console.log(main)}
                  <div className="productTitle">{main["title"]}</div>
                  <div className="products">
                    {main["items"].map((item, indx) => {
                      return (
                        <div className="card col-md-5 col-sm-12">
                          <img
                            className="card-img-top"
                            src={item.img_url}
                            alt="Card image cap"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.title}</h5>
                            <CardItem key={indx} data={item}></CardItem>{" "}
                            {console.log(item)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
