import "./detail.css";
import { Row, Col, Image, Rate, Checkbox, Button } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Request_User } from "../../../../API/api";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Detail = () => {
  let { slug } = useParams();

  //init value and state

  const [data, setData] = useState({});

  const [price, setPrice] = useState(0);

  useEffect(() => {
    //Send By Query ex ?slug=string  ,

    axios
      .get(`${Request_User.voucher}/${slug}`)
      .then((res) => {
        setData(res.data);

        console.log(res.data);

        if (res.data["price_options"]["price"] != undefined) {
          setPrice(
            res.data["price_options"]["price"].toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            }),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
  }

  return (
    <div className="detail-container">
      <Suspense fallback={<Spin indicator={antIcon} />}>
        <Row>
          <Col span={12} style={{ overflow: "hidden" }}>
            <Image src={data["img_url"]} />
          </Col>
          <Col span={12}>
            <h2 style={{ fontSize: 30, marginTop: 20, fontFamily: "cursive" }}>
              {data["title"]}
            </h2>
            <Grid>
              {data["categorys"] != undefined
                ? data["categorys"].map((data) => {
                    return <h5>{data.title}</h5>;
                  })
                : null}
            </Grid>

            <Grid>
              <span style={{ fontSize: "26px", color: "red" }}>
                {price} VND
              </span>
            </Grid>

            <span>
              {/* <Rate allowHalf defaultValue={2.5} />
              <p>9999 view</p> */}
            </span>
            <div className="prict_class">{}</div>
            <div className="div_color">
              {/* <p>Màu Sắc</p>
              <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="A">XANH</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="B">Đỏ</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="C">Tím</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="D">Vàng</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group> */}
            </div>
            <div className="div_btn">
              <Button type="primary" block style={{ width: "50%", margin: 10 }}>
                Thêm Vào giỏ Hàng
              </Button>
              <Button type="red-7" block style={{ width: "50%", margin: 10 }}>
                Mua Ngay
              </Button>
            </div>
          </Col>
        </Row>
      </Suspense>
    </div>
  );
};

export default Detail;
