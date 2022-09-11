import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Index.css";
import { Grid } from "@mui/material";
import { Request_User } from "../../../API/api";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

const ArticlesPanel = () => {
  window.scrollTo(0, 0);
  const mbhorizon = useMediaQuery("(max-width:320px)");
  const mbverti = useMediaQuery("(max-width:480px)");
  //State
  const [toppost, setTopposts] = useState([]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalpage, setTotalPage] = useState(1);

  //Function
  const loadTopPost = () => {
    axios.get(Request_User.getTopPost).then((res) => {
      if (res) {
        console.log(res.data);
        setTopposts(res.data);
      }
    });
  };

  const loadPostByPage = () => {
    axios.get(`${Request_User.getPost}?page=${page}`).then((res) => {
      if (res) {
        console.log(res.data);
        setItems(res.data.posts);
        setTotalPage(res.data.totalPage);
      }
    });
  };

  useEffect(() => {
    loadTopPost();
    loadPostByPage();
  }, []);

  //mb screen

  if (mbhorizon == true || mbverti == true) {
    return (
      <Grid
        container
        display="flex"
        flexDirection="column"
        rowSpacing={2}
        sm={12}
        xs={12}
      >
        <Grid
          item={true}
          display="flex"
          flexDirection="column"
          className="articles-items"
          style={{
            padding: "5px 5px 0 5px",
            marginTop: "20px",
          }}
        >
          <Grid item={true}>
            {items.map((item) => {
              return (
                <Link to={`/post/${item._id}`}>
                  <Grid
                    container
                    display="flex"
                    alignItems="flex-end"
                    className="item"
                    spacing={2}
                    style={{
                      padding: "10px",
                      border: "0.5px solid #8f7e7e42",
                      borderTop: "none",
                      borderRight: "none",
                    }}
                  >
                    <Grid item={true}>
                      <img className="item-img" src={item.img_url}></img>
                    </Grid>
                    <Grid item={true} className="item-title">
                      {item.title}
                    </Grid>
                  </Grid>
                </Link>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item={true}
          display="flex"
          justifyContent="flex-end"
          style={{ padding: "10px" }}
        >
          <Pagination count={totalpage} variant="outlined" shape="rounded" />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid
      container
      md={12}
      sm={12}
      xs={12}
      style={{ padding: "10px" }}
      className="articles-container"
    >
      <Grid md={7} sm={7} xs={12} item={true}>
        <Grid
          container
          display="flex"
          flexDirection="column"
          rowSpacing={2}
          md={12}
          sm={12}
          xs={12}
        >
          {}
          <Grid
            item={true}
            md={12}
            sm={12}
            display="flex"
            flexDirection="column"
            className="articles-newest"
          >
            <Link to={`/post/${toppost[0]?._id}`}>
              <Grid md={12} sm={12} item={true}>
                <img className="newest-img" src={toppost[0]?.img_url}></img>
              </Grid>
              <Grid className="newest-title" item={true}>
                {toppost[0]?.title}
              </Grid>
            </Link>
          </Grid>

          <Grid
            item={true}
            display="flex"
            flexDirection="column"
            className="articles-items"
            style={{
              padding: "5px 5px 0 5px",
              marginTop: "20px",
            }}
          >
            <Grid item={true}>
              {items.map((item) => {
                return (
                  <Link to={`/post/${item._id}`}>
                    <Grid
                      container
                      display="flex"
                      alignItems="flex-end"
                      className="post-item"
                      style={{ marginTop: "10px", padding: "5px" }}
                    >
                      <Grid item={true}>
                        <img className="item-img" src={item.img_url}></img>
                      </Grid>
                      <Grid
                        item={true}
                        style={{ padding: "5px" }}
                        className="item-title"
                      >
                        {item.title}
                      </Grid>
                    </Grid>
                  </Link>
                );
              })}
            </Grid>
          </Grid>
          <Grid
            item={true}
            display="flex"
            justifyContent="flex-end"
            style={{ padding: "10px" }}
          >
            <Pagination count={totalpage} variant="outlined" shape="rounded" />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        md={5}
        sm={5}
        style={{
          padding: "0 5px 0 0px",
          border: "0.5px solid #8f7e7e42",
          borderTop: "none",
          borderLeft: "none",
        }}
        className="articles-meta"
        display="flex"
        flexDirection="column"
        item={true}
      >
        <Grid
          style={{ padding: "0 5px 0 0px" }}
          display="flex"
          justifyContent="center"
          item={true}
        >
          <h4>NEW POSTS</h4>
        </Grid>

        {toppost.map((item) => {
          return (
            <Grid style={{ marginTop: "10px" }} item={true}>
              {" "}
              <Link to={`/post/${item?._id}`}>
                <Grid
                  container
                  spacing={2}
                  display="flex"
                  md={12}
                  sm={12}
                  justifyContent="center"
                  alignItems="center"
                  key={item}
                  item={true}
                >
                  <Grid
                    display="flex"
                    alignItems="flex-end"
                    md={7}
                    sm={7}
                    item={true}
                    className="meta-item"
                  >
                    <Grid item={true}>
                      {" "}
                      <img src={item.img_url} className="meta-img"></img>
                    </Grid>
                    <Grid
                      style={{ marginLeft: "5px", fontSize: "14px" }}
                      item={true}
                    >
                      {item.title}
                    </Grid>
                  </Grid>
                </Grid>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ArticlesPanel;
