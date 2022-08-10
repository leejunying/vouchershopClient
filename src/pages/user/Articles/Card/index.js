import React from "react";
import "./index.css";
import news from "../Newest/news.jpg";
import Grid from "@mui/material/Grid";

function Card(props) {
  return (
    <Grid>
      <img src={news} alt="" srcset="" className="img" />

      <div className="banner">Banner</div>
    </Grid>
  );
}

export default Card;
