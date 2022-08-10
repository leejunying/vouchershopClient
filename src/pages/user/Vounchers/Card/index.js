import "./CardItem.css";
import "antd/dist/antd.css";
import { Button, Space, Card, Col, Row } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
const CardItem = (props) => {
  const { data } = props;
  let history = useHistory();

  console.log(data);
  return (
    <Link replace to={`/vouchers/${data["slug"]}`}>
      <Grid container display={"flex"} flexDirection="column">
        <Grid item={true}>
          <img className="card-img" src={data.img_url}></img>
        </Grid>
        <Grid item={true}>
          {" "}
          <label>{data.title}</label>
        </Grid>

        <Grid item={true}>
          {" "}
          <Button type="primary" className="btn-color">
            Xem thông tin...
          </Button>{" "}
        </Grid>
      </Grid>
    </Link>
  );
};

export default CardItem;
