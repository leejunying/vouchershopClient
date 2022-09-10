import "./CardItem.css";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button } from "antd";

import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CountdownTimer from "../../../../Components/Countdown/countdown";
import { Commonfc } from "../../../../Ultis/Commonfunction";
const CardItem = (props) => {
  const { data } = props;

  return (
    <Link replace to={`/vouchers/${data["slug"]}`}>
      <Card
        style={{ position: "relative" }}
        sx={{ maxWidth: 400, maxHeight: 345 }}
      >
        <Grid
          style={{ position: "absolute", zIndex: 1 }}
          className="cardstatus"
        >
          {data.status}
        </Grid>
        {data.status == "SALE" ? (
          <Grid
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              textAlign: "center",
              top: "30%",
            }}
          >
            <CountdownTimer targetDate={data.limitedtime}></CountdownTimer>
          </Grid>
        ) : null}

        <CardMedia
          component="img"
          height="140"
          image={data.img_url}
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
            {data.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Grid
            style={{ width: "100%" }}
            display="flex"
            justifyContent="center"
          >
            {Commonfc.exPried(data.limitedtime) < 0 && data.status == "SALE" ? (
              <Button type="primary" disabled className="btn-color">
                Ngưng bán
              </Button>
            ) : (
              <Button type="primary" className="btn-color">
                Xem thông tin...
              </Button>
            )}
          </Grid>
        </CardActions>
      </Card>
    </Link>
  );
};

export default CardItem;
