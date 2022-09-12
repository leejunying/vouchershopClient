import "./detail.css";
import { Row, Col, Image, Rate, Checkbox, Button } from "antd";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Request_User, Request_Admin } from "../../../../API/api";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { Spin } from "antd";
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import Grid from "@mui/material/Grid";
import { Select } from "antd";
import { Link } from "react-router-dom";
import { addItem } from "../../../../Redux/Reducer/Cart";
import { useDispatch } from "react-redux";
import CountdownTimer from "../../../../Components/Countdown/countdown";
import { Commonfc } from "../../../../Ultis/Commonfunction";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Detail = () => {
  //antd tab

  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  let { slug } = useParams();

  //init value and state

  const [tab, setTab] = useState("detail");

  const [post, setPost] = useState([]);

  const [data, setData] = useState({});

  const [price, setPrice] = useState(0);

  const [color, setColor] = useState(0);

  const [room, setRoom] = useState(0);

  const [duration, setDuration] = useState(0);

  const displaydetailByType = (type) => {
    if (type == "detail") return data.detailcontent;
    else return data.policycontent;
  };

  const getdetail = () => {
    axios
      .get(`${Request_Admin.getDetailpostByVoucherid(data._id)}`)
      .then((res) => {
        if (res.status == 200) setPost(res.data);
      });
  };

  const getdata = () => {
    axios
      .get(`${Request_User.findvoucher}/${slug}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);

        if (res.data["key"] == "CV") {
          setPrice(res.data["price_options"]["price"]);
        }
        if (res.data["key"] == "DVHK") {
          setPrice(res.data["price_options"]["package"][0].value);
        }

        if (res.data["key"] == "DVND" || res.data["key"] == "G") {
          let value = res.data["price_options"]["duration"][0].value;

          setDuration(value);
          setPrice(value);
        }
        if (res.data["key"] == "DVLK") {
          var getCredit = res.data["price_options"]["duration"][0].value;

          setPrice(getCredit);
          setDuration(getCredit);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getdetail();
  }, [data]);

  useEffect(() => {
    getdata();
  }, [slug]);

  const onChangeTab = (key) => {
    setTab(key);
  };

  const onChangepackage = (value) => {
    setPrice(value);
  };

  const onChangecolor = (value) => {
    setColor(value);

    setPrice(totalND(duration, value, room));
  };

  const onChangeduration = (value) => {
    setDuration(value);

    if (data["key"] == "DVND") setPrice(totalND(value, color, room));
    else setPrice(value);
  };

  const onChangeRoom = (value) => {
    setRoom(value);
    setPrice(totalND(duration, color, value));
  };

  const totalND = (duration, color, room) => {
    let percentColor = color != 0 ? (color * duration) / 100 : 0;
    let percentRoom = room != 0 ? (room * duration) / 100 : 0;

    let result =
      parseInt(duration) + parseInt(percentColor) + parseInt(percentRoom);

    return result;
  };

  const addTocart = () => {
    let priceresult = 0;

    // if(data.key=="CV")
    //   priceresult=price
    // if(data.key=="DVHK")
    //   priceresult=
    // if(data.key=="DVLK")

    // if(data.key=="DVG")

    // if(data.key=="DVND")

    const itemobj = {
      title: data.title,
      img_url: data.img_url,
      price: parseInt(price),
    };

    // console.log(itemobj)

    dispatch(addItem(itemobj));
  };

  return (
    <Grid
      container
      style={{
        backgroundColor: "white",
        minHeight: "600px",
        marginTop: "20px",
        position: "relative",
        zIndex: "1",
        width: "100%",
      }}
    >
      <Suspense fallback={<Spin indicator={antIcon} />}>
        <Grid item={true} style={{ width: "100%", position: "relative" }}>
          <Grid
            container
            md={12}
            xs={12}
            className="detailTop-left"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            style={{ padding: "10px" }}
          >
            <Grid item={true} md={3} style={{ position: "relative" }}>
              <Grid
                item={true}
                style={{ position: "absolute", zIndex: 1 }}
                className="cardstatus"
              >
                {data.status}
              </Grid>

              <Grid
                display="flex"
                justifyContent="center"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  top: "50%",
                }}
              >
                {" "}
                {data.status == "SALE" ? (
                  <Grid
                    item={true}
                    style={{ position: "absolute", zIndex: 1, width: "100%" }}
                  >
                    <CountdownTimer
                      targetDate={data.limitedtime}
                    ></CountdownTimer>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item={true} style={{ position: "relative" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={data.img_url}
                ></img>
              </Grid>
            </Grid>
            <Grid
              item={true}
              xs={6}
              md={6}
              style={{ marginLeft: "10px" }}
              className="voucher-info "
            >
              <h2 style={{ fontSize: "1.2rem", marginTop: 20 }}>
                {data["title"]}
              </h2>
              <Grid
                container
                display="flex"
                justifyContent="flex-start space-evenly"
              >
                {data["categorys"] != undefined
                  ? data["categorys"].map((data, indx) => {
                      return (
                        <Grid item={true} key={indx}>
                          <Link
                            to={`/categorys/filter?tagid=${data._id}`}
                            style={{ color: "blue", fontSize: "12px" }}
                          >
                            {data.title}
                          </Link>
                        </Grid>
                      );
                    })
                  : null}
              </Grid>

              <Grid style={{ margin: "20px 20px 20px 0" }}>
                {
                  //Key G
                  data["key"] == "DVG" ? (
                    <Grid
                      container
                      spacing={2}
                      xs={12}
                      md={10}
                      className="flex options"
                    >
                      <Grid item={true} md={2} xs={4}>
                        Thời hạn
                      </Grid>

                      <Grid item={true} md={6} xs={8}>
                        <Select
                          defaultValue={
                            data["price_options"]["duration"][0].value
                          }
                          style={{ width: "100%" }}
                          placeholder="Choose duration"
                          optionFilterProp="children"
                          onChange={onChangeduration}
                        >
                          {data["price_options"]["duration"].map(
                            (duration, indx) => {
                              return (
                                <Option key={indx} value={duration.value}>
                                  {duration.title} Tháng
                                </Option>
                              );
                            },
                          )}
                        </Select>
                      </Grid>
                    </Grid>
                  ) : null
                }

                {
                  //Key HK

                  data["key"] == "DVHK" ? (
                    <Grid
                      container
                      spacing={1}
                      display="flex"
                      alignItems="center"
                      className="flex options"
                    >
                      <Grid item={true} md={2} xs={4}>
                        {" "}
                        Gói tháng
                      </Grid>

                      <Grid item={true} md={6} xs={8}>
                        <Select
                          defaultValue={
                            Commonfc.valuesofObj(
                              data["price_options"]["package"][0],
                            )[0]
                          }
                          style={{ width: "100%" }}
                          placeholder="Choose package"
                          optionFilterProp="children"
                          onChange={onChangepackage}
                        >
                          {data["price_options"]["package"].map(
                            (packages, indx) => {
                              return (
                                <Option key={indx} value={packages.value}>
                                  {packages.title} Tháng
                                </Option>
                              );
                            },
                          )}
                        </Select>
                      </Grid>
                    </Grid>
                  ) : null
                }
                {
                  //Key ND

                  data["key"] == "DVND" ? (
                    <Grid container spacing={2} className=" flex  options">
                      <Grid item={true} className="flex" md={10} xs={12}>
                        <Grid item={true} md={2} xs={4}>
                          Màu sắc
                        </Grid>

                        <Grid item={true} md={6} xs={8}>
                          <Select
                            defaultValue={
                              data["price_options"]["color"][0].value
                            }
                            style={{ width: "100%" }}
                            placeholder="Choose color"
                            optionFilterProp="children"
                            onChange={onChangecolor}
                          >
                            {data["price_options"]["color"].map(
                              (color, indx) => {
                                return (
                                  <Option key={indx} value={color.value}>
                                    {color.title}
                                  </Option>
                                );
                              },
                            )}
                          </Select>
                        </Grid>
                      </Grid>

                      <Grid item={true} className="flex" md={10} xs={12}>
                        <Grid item={true} md={2} xs={4}>
                          Thời hạn
                        </Grid>

                        <Grid item={true} xs={8}>
                          <Select
                            defaultValue={
                              data["price_options"]["duration"][0].value
                            }
                            style={{ width: "100%" }}
                            placeholder="Choose duration"
                            optionFilterProp="children"
                            onChange={onChangeduration}
                          >
                            {data["price_options"]["duration"].map(
                              (duration, indx) => {
                                return (
                                  <Option key={indx} value={duration.value}>
                                    {duration.title} Tháng
                                  </Option>
                                );
                              },
                            )}
                          </Select>
                        </Grid>
                      </Grid>

                      <Grid item={true} className="flex" md={10} xs={12}>
                        <Grid item={true} md={2} xs={4}>
                          Số phòng
                        </Grid>

                        <Grid item={true} md={6} xs={8}>
                          <Select
                            defaultValue={
                              data["price_options"]["room"][0].title
                            }
                            style={{ width: "100%" }}
                            placeholder="Choose duration"
                            optionFilterProp="children"
                            onChange={onChangeRoom}
                          >
                            {data["price_options"]["room"].map((room, indx) => {
                              return (
                                <Option key={indx} value={room.value}>
                                  {room.title}
                                </Option>
                              );
                            })}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                }
                {
                  //Key LK

                  data["key"] == "DVLK" ? (
                    <Grid container spacing={2} className=" flex  options">
                      <Grid item={true} className="flex" md={10} xs={12}>
                        <Grid item={true} md={2} xs={4}>
                          Hạn mức
                        </Grid>

                        <Grid item={true} md={6} xs={8}>
                          <Select
                            defaultValue={
                              data["price_options"].duration[0].value
                            }
                            style={{ width: "100%" }}
                            placeholder="Choose Credit"
                            optionFilterProp="children"
                            onChange={onChangeduration}
                          >
                            {data["price_options"].duration.map(
                              (lineofcredit, indx) => {
                                return (
                                  <Option key={indx} value={lineofcredit.value}>
                                    {lineofcredit.title} Tháng
                                  </Option>
                                );
                              },
                            )}
                          </Select>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null
                }
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                className="flex col total"
              >
                Tổng :{" "}
                {price != undefined
                  ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    " VND"
                  : 0}
              </Grid>
              {data.status == "SALE" ? (
                <Grid item={true}>
                  {Commonfc.exPried(data.limitedtime) < 0 ? (
                    <Button type="primary" disabled className="btn-color">
                      Ngưng bán
                    </Button>
                  ) : (
                    <Grid container spacing={1} className="div_btn">
                      <Grid item={true} md={4}>
                        <Button
                          style={{ width: "200px" }}
                          type="primary"
                          onClick={addTocart}
                        >
                          Thêm Vào giỏ Hàng
                        </Button>
                      </Grid>
                      <Grid item={true} md={4}>
                        <Link to="/cart">
                          <Button
                            style={{ width: "200px" }}
                            type="red-7"
                            onClick={addTocart}
                          >
                            Mua Ngay
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              ) : (
                <Grid container spacing={1} className="div_btn">
                  <Grid item={true} md={4}>
                    <Button
                      type="primary"
                      onClick={addTocart}
                      block
                      style={{ width: "80%", margin: 10 }}
                    >
                      Thêm Vào giỏ Hàng
                    </Button>
                  </Grid>
                  <Grid item={true} md={4}>
                    <Link to="/cart">
                      <Button
                        type="red-7"
                        onClick={addTocart}
                        block
                        style={{ width: "80%", margin: 10 }}
                      >
                        Mua Ngay
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Grid
            container
            display="flex"
            justifyContent="center"
            className="tab-voucherdetail"
          >
            <Grid item={true} md={6}>
              <Tabs defaultActiveKey={tab} onChange={onChangeTab}>
                <TabPane tab="Thông tin chi tiết" key="detail">
                  <Grid
                    dangerouslySetInnerHTML={{
                      __html: displaydetailByType(tab),
                    }}
                  ></Grid>
                  {}
                </TabPane>
                <TabPane tab="Chính sách" key="policy">
                  <Grid
                    dangerouslySetInnerHTML={{
                      __html: displaydetailByType(tab),
                    }}
                  ></Grid>
                </TabPane>
              </Tabs>
            </Grid>
          </Grid>
        </Grid>
      </Suspense>
    </Grid>
  );
};

export default Detail;
