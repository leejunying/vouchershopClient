import "./Categorys.css";
import { useParams, useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Request_User } from "../../../API/api";
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
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState([]);
  const location = useLocation();

  const mbverti = useMediaQuery("(max-width:480px)");

  const fixqueryTofilter = (location) => {
    const filterObj = {
      key: "",
      page: page,
      tag: "",
    };

    let key = location.slice(1, location.indexOf("="));
    let keyvalue = location.slice(location.indexOf("=") + 1, location.length);

    if (key == "key") {
      filterObj.key = keyvalue;
    } else {
      filterObj.tag = keyvalue;
    }

    console.log(filterObj);
    return filterObj;
  };

  const handleChange = (event, value) => {
    setPage(value);
    let search = fixqueryTofilter(location.search);
    refreshData(search.key, search.page, search.tag);
  };

  const getCategory = () => {
    axios.get(Request_User.getcategory).then((res) => {
      if (res.status == 200) {
        setCategory(res.data);
      }
    });
  };

  const refreshData = (key, page, tag) => {
    axios
      .get(`${Request_User.filtervoucher(key, page, JSON.stringify(tag))}`)
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
    getCategory();
  }, []);
  useEffect(() => {
    let search = fixqueryTofilter(location.search);
    refreshData(search.key, search.page, search.tag);
  }, [location]);

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
            {category.map((item, indx) => {
              return (
                <Grid key={indx} item={true} md={7} display="flex" className="">
                  <Grid item={true} md={2}></Grid>
                  <Grid item={true} md={10}>
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
            })}
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
                style={{ padding: "20px", width: "100%" }}
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
                {data.length < 1 ? (
                  <Grid>Hiện chưa có sản phẩm</Grid>
                ) : (
                  <Pagination
                    count={total}
                    page={page}
                    onChange={handleChange}
                  />
                )}
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
