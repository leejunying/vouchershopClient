import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Banner.css";
import { Request_User } from "../../API/api";
import { Link, useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
const Banner = () => {
  const [data, setData] = useState([]);

  const loadvouchers = () => {
    axios.get(Request_User.getslidevoucher).then((res) => {
      if (res) setData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadvouchers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div
      style={{
        position: "relative",
        zIndex: "0",
      }}
      className="carWrapper"
    >
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          {!!data
            ? data.map((item, indx) => {
                return (
                  <div
                    key={item}
                    style={{ position: "relative" }}
                    className={
                      indx == 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <Link replace to={`/vouchers/${item["slug"]}`}>
                      <Grid
                        style={{
                          position: "absolute",
                          zIndex: 1,
                          width: "150px",
                          fontSize: "1.4rem",
                        }}
                        item={true}
                        className="cardstatus"
                      >
                        {item.status}
                      </Grid>
                      <img
                        style={{ height: "500px", position: "relative" }}
                        src={item.img_url}
                        className="d-block w-100"
                      ></img>
                      {item.status == "SALE" ? (
                        <Grid
                          item={true}
                          style={{
                            position: "absolute",
                            zIndex: 1,

                            width: "100%",
                            height: "100%",
                          }}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          className="bd ountdown"
                        ></Grid>
                      ) : null}
                    </Link>
                  </div>
                );
              })
            : null}

          {/* <div className="carousel-item active">
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src="https://promacprinting.com/wp-content/uploads/2021/03/voucher-du-lich.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src="https://www.dulichthuyphico.com/uploads/plugin/products/827/1617848264-1428899477-3n2-phong-villa-vinpearl-luxury-a-n-ng-vinpearl-resort-amp-spa-a-n-ng-n-sang-t-ng-a-on-san-bay-cho-02-ng-i-va-2-tr-em-d-i-4-tu-i.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ height: "500px" }}
              className="d-block w-100"
              src="https://songhantourist.com/upload/articles-images/images/san-combo-gia-re-kich-cau-du-lich.png"
              alt="Third slide"
            />
          </div> */}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Banner;
