import "./Categorys.css";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Layout, Breadcrumb, Card } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Request_Admin, Request_User } from "../../../API/api";
import CardItem from "../Vounchers/Card";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from "@mui/material/Pagination";
import { Spin } from "antd";

const Categorys = () => {
  window.scrollTo(0, 0);
  //mount data
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [selected, setSelected] = useState("");
  const [location, setLocations] = useState([]);
  const { type } = useParams();
  const mbverti = useMediaQuery("(max-width:480px)");

  const handleChange = (event, value) => {
    setPage(value);
    refreshData();
  };
  const changetypeToKey = (text) => {
    let result = "";

    if (text == "combovouchers") {
      setSelected(1);
      result = "CV";
    }

    if (text == "dichvuhangkhong") {
      setSelected(2);
      result = "DVHK";
    }
    if (text == "dichvulienket") {
      setSelected(3);
      result = "DVLK";
    }
    if (text == "dichvunghiduong") {
      setSelected(4);
      result = "DVND";
    }
    if (text == "dichvugolf") {
      setSelected(5);
      result = "DVG";
    }
    if (text == "sale") {
      setSelected("SAL");
      result = "SALE";
    }
    return result;
  };

  const refreshData = () => {
    axios
      .get(`${Request_User.filtervoucher(changetypeToKey(type), page)}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setTotal(res.data.totalPage);
          setData(res.data.data);
        }
      })
      .catch((res) => console.log(res));
  };

  useEffect(() => {
    setPage(1);
    refreshData();
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
            <Grid item={true}>
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
            </Grid>{" "}
            <Grid item={true} md={6} display="flex" className="">
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                <Link
                  className={selected == 6 ? "text-menu:active" : "text-menu"}
                  to="sale"
                >
                  SALE
                </Link>
              </Grid>{" "}
            </Grid>
            <Grid item={true} md={7} display="flex">
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                <Link
                  className={selected == 1 ? "text-menu:active" : "text-menu"}
                  to="combovouchers"
                >
                  Combo Voucher
                </Link>
              </Grid>
            </Grid>
            <Grid item={true} md={7} display="flex">
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                {" "}
                <Link
                  className={selected == 2 ? "text-menu:active" : "text-menu"}
                  to="dichvuhangkhong"
                >
                  Dịch Vụ Hàng Không
                </Link>
              </Grid>
            </Grid>
            <Grid item={true} md={7} display="flex">
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                <Link
                  className={selected == 3 ? "text-menu:active" : "text-menu"}
                  to="dichvunghiduong"
                >
                  Dịch Vụ Nghĩ Dưỡng
                </Link>
              </Grid>
            </Grid>
            <Grid item={true} md={7} display="flex">
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                {" "}
                <Link
                  className={selected == 4 ? "text-menu:active" : "text-menu"}
                  to="dichvulienket"
                >
                  Dịch Vụ Liên Kết
                </Link>
              </Grid>
            </Grid>
            <Grid item={true} md={7} display="flex">
              {" "}
              <Grid item={true} md={2}></Grid>
              <Grid item={true} md={10}>
                <Link
                  className={selected == 5 ? "text-menu:active" : "text-menu"}
                  to="dichvugolf"
                >
                  Dịch Vụ GOLF
                </Link>
              </Grid>
            </Grid>
            <Grid item={true} style={{ marginTop: "10px" }}></Grid>
          </Grid>
        </Grid>
        <Grid
          item={true}
          md={9}
          style={{
            minHeight: "70vh",
            backgroundColor: "white",
            border: mbverti == true ? "none" : "0.7px solid #9d9db3",
            borderLeft: "none",
          }}
          className="right-content"
          display={"flex"}
          flexDirection={"column"}
        >
          {data ? (
            <Grid item={true}>
              {" "}
              <Grid
                style={{ padding: "20px", width: "100%", height: "60vh" }}
                item={true}
                display="flex"
              >
                <Grid container display="flex" spacing={3}>
                  {" "}
                  {data.map((item, indx) => {
                    return (
                      <Grid md={3} xs={!2} item={true} key={item}>
                        <CardItem data={item}></CardItem>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item={true}>
                <Pagination count={total} page={page} onChange={handleChange} />
              </Grid>
            </Grid>
          ) : (
            <Spin></Spin>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Categorys;
