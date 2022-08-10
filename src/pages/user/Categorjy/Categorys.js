import "./Categorys.css";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Layout, Breadcrumb, Pagination, Card } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Request_User } from "../../../API/api";
import CardItem from "../Vounchers/Card";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Categorys = () => {
  window.scrollTo(0, 0);
  //mount data
  const [data, setData] = useState([]);

  const { type } = useParams();
  const mbverti = useMediaQuery("(max-width:480px)");

  const changetypeToKey = (text) => {
    let result = "";

    if (text == "combovouchers") result = "CV";
    if (text == "dichvuhangkhong") result = "DVHK";
    if (text == "dichvulienket") result = "DVLK";
    if (text == "dichvunghiduong") result = "DVND";
    if (text == "dichvugolf") result = "DVG";
    return result;
  };

  useEffect(() => {
    axios
      .get(`${Request_User.filtervoucher(changetypeToKey(type), 1)}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setData(res.data);
        }
      })
      .catch((res) => console.log(res));
  }, [type]);

  // reanderItems

  return (
    <Grid style={{ position: "relative", zIndex: "1" }} className="categorys">
      <Grid container display="flex" style={{ margin: "10px" }}>
        <Grid
          item={true}
          md={3}
          style={{
            minHeight: "600px",
            backgroundColor: "white",
            border: "0.7px solid #9d9db3",
            borderRight: "none",
            borderRadius: "5px",
            display: mbverti == true ? "none" : "",
          }}
          className="left-sidebar"
        >
          <Grid
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            className="left-menu"
          >
            <Grid>
              <h5
                style={{
                  fontSize: "18px",
                  color: "white",
                  fontFamily: "initial",
                  backgroundColor: "#8e8ebb",
                }}
              >
                Danh mục chính
              </h5>
            </Grid>

            <Link className="text-menu" to="combovouchers">
              Combo Voucher
            </Link>
            <Link className="text-menu" to="dichvuhangkhong">
              Dịch Vụ Hàng Không
            </Link>
            <Link className="text-menu" to="dichvunghiduong">
              Dịch Vụ Nghĩ Dưỡng
            </Link>
            <Link className="text-menu" to="dichvulienket">
              Dịch Vụ Liên Kết
            </Link>
            <Link className="text-menu" to="dichvugolf">
              Dịch Vụ GOLF
            </Link>

            <Grid style={{ marginTop: "10px" }}>
              <h5
                style={{
                  fontSize: "18px",
                  color: "white",
                  fontFamily: "initial",
                  backgroundColor: "#8e8ebb",
                }}
              >
                {" "}
                Địa điểm
              </h5>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={9}
          style={{
            minHeight: "600px",
            backgroundColor: "white",
            border: mbverti == true ? "none" : "0.7px solid #9d9db3",
            borderLeft: "none",
          }}
          className="right-content"
          display={"flex"}
        >
          <Grid
            style={{ display: mbverti == true ? "none" : "" }}
            item={true}
            md={1}
          ></Grid>
          <Grid item={true} md={11}>
            <Grid
              container
              spacing={2}
              justifyContent="center space-evenly5"
              display="flex"
            >
              {data.map((item, indx) => {
                return (
                  <Grid item={true} key={item}>
                    <CardItem data={item}></CardItem>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Categorys;
