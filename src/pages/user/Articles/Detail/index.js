import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Request_User } from "../../../../API/api";
import { StylePost } from "./styled";
const Article = () => {
  const createMarkup = (content) => {
    return { __html: content };
  };

  let { postid } = useParams();
  console.log(postid);
  //State
  const [data, setData] = useState({});
  //Effect
  //Mount
  useEffect(() => {
    loadPost();
  }, []);
  //Function
  const loadPost = () => {
    axios.get(Request_User.getPostByID(postid)).then((res) => {
      console.log(res);
      if (res) setData(res.data);
    });
  };

  return (
    <Grid
      container
      style={{ padding: "20px", textAlign: "center", width: "100%" }}
      display="flex"
      justifyContent="center"
      className="Article-detail"
    >
      {" "}
      <StylePost className="flex jus-center">
        <Grid
          md={8}
          item={true}
          dangerouslySetInnerHTML={createMarkup(data.content)}
        ></Grid>
      </StylePost>
    </Grid>
  );
};

export default Article;
