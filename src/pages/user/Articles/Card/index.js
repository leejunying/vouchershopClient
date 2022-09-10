import React from "react";
import "./index.css";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
function Article(props) {
  const { item } = props;

  return (
    <Link to={`/post/${item._id}`}>
      <Card
        style={{ position: "relative" }}
        sx={{ maxWidth: 400, maxHeight: 345 }}
      >
        <CardMedia
          component="img"
          height="140"
          image={item.img_url}
          alt="green iguana"
        />

        <CardContent>
          <Typography
            style={{
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
            gutterBottom
            variant="string"
            component="p"
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export default Article;
