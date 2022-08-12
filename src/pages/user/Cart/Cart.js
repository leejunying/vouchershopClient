import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  AllCheckerCheckbox,
  Checkbox,
  CheckboxGroup,
} from "@createnl/grouped-checkboxes";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, clearItems } from "../../../Redux/Reducer/Cart";
import { Button } from "antd";
import { Grid, TextField } from "@mui/material";
import { Select, InputNumber } from "antd";
import PaypalButton from "./Paypal";
import location from "./../../../Ultis/local.json";
import axios from "axios";
import { Request_User } from "../../../API/api";
import { Modal } from "antd";

const Cart = () => {
  const { Option } = Select;

  const ArrLocation = [...location];
  const [isModalVisible, setIsModalVisible] = useState(false);

  //information State
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [errPhone, setErrphone] = useState(false);
  const [errAddress, setErraddress] = useState(false);
  const [address, setAddress] = useState("");
  const [alertcontent, setAlertcontent] = useState("");
  //////////////
  const [isCheckOut, setIsCheckOut] = useState(false);

  const [location1, setLocation1] = useState("Hồ Chí Minh");
  const [location2, setLocation2] = useState("Bình Chánh");
  const [location3, setLocation3] = useState("An Phú Tây");

  const [selectopt, setSelectopt] = useState("COD");
  const data = useSelector((state) => (state = state.cart.items));
  const total = data
    .map((data) => {
      console.log(data);
      data = data.price;

      return Number(data);
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const user = useSelector((state) => {
    return state.account.Client;
  });
  const [picked, setPicked] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let takeList = [];
    if (e.target.checked == true) {
      takeList = data.filter((item, indx) => {
        return indx == e.target.value;
      });
    }

    if (e.target.checked == false) {
      takeList = data.filter((item, indx) => {
        return indx != e.target.value;
      });
      setPicked(takeList);
    }
  };

  const validate = () => {
    if (phone.length != 10) {
      setErrphone(true);
    }
    if (address.length == 0) {
      setErraddress(true);
    }

    if (phone.length == 10 && address.length > 0) {
      setErrphone(false);

      setErraddress(false);
      savetoPayment();
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
  //Catch Location
  useEffect(() => {
    setLocation2(LoadL2()[0].name);

    let Load3 = LoadL3();
    if (Load3.length > 0) setLocation3(Load3[0].name);
  }, [location1]);

  useEffect(() => {
    let Load3 = LoadL3();
    if (Load3.length > 0) setLocation3(Load3[0].name);
  }, [location2]);

  const onChangeFname = (e) => {
    setFname(e.target.value);
  };
  const onChangeLname = (e) => {
    setLname(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeL1 = (value) => {
    setLocation1(value);
  };

  const LoadL2 = () => {
    let resultL2 = ArrLocation.filter((item) => {
      return item.name == location1;
    })[0].districts;
    // console.log("L2", resultL2);

    console.log(resultL2);
    return resultL2;
  };

  const LoadL3 = () => {
    let resultL3 = LoadL2().filter((item) => {
      return item.name == location2;
    })[0];
    let final = resultL3?.wards;
    if (final) {
      return final;
    } else;
    return [];
  };

  const onChangeL2 = (value) => {
    setLocation2(value);
  };

  const onChangeL3 = (value) => {
    setLocation3(value);
  };

  const onChangeCheckOut = (value) => {
    setSelectopt(value);
  };

  const CheckOut = () => {
    setIsCheckOut(true);
    setFname(user.firstname);
    setLname(user.lastname);
    setAddress(user.address);
    setPhone(user.phone);
  };

  const handleCheckAll = (e) => {
    if (e.target.checked == true) {
      //do whatever you want with isChecked value
    } else {
      setPicked([]);
    }
  };

  const savetoPayment = () => {
    const payment = {
      userid: user._id,
      purchase_items: data,
      total: total,
      status: "pending",
      shipaddress: `Tỉnh/thành phố:${location1}, Quận/huyện:${location2}, Phường/xã:${location3} Địa chỉ: ${address}`,
      contactphone: phone,
    };

    if (errAddress == false || errPhone == false) {
      console.log(payment);
      axios
        .post(Request_User.submitpayment, payment, {
          headers: {
            Authorization: `Basic ${user.accessToken}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            dispatch(clearItems([]));
            setIsCheckOut(false);
            showModal(true);
            setAlertcontent("Bạn đã đặt thành công xin hãy chờ liên hệ");
          }
        });
    }
  };

  return (
    <div className="maincontainer">
      <div className="container">
        <div className="row">
          <div className="col-8 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span>Giỏ hàng của bạn</span>
              <span className="badge badge-secondary badge-pill">
                {data.length}
              </span>
            </h4>
            <CheckboxGroup defaultChecked>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex flex-row   d-flex align-items-center border-start-0 border-end-0">
                  <AllCheckerCheckbox
                    type="checkbox"
                    id="checkAll"
                    onChange={(e) => handleCheckAll(e)}
                  />{" "}
                  {/*khi bấm nút này thì nhét toàn bộ dữ liệu giỏ hàng từ redux vào state picked để vào trang thanh toán}*/}
                  <label htmlFor="checkAll" className="label">
                    Chọn tất cả
                  </label>
                </li>
                {data != undefined
                  ? data.map((data, index) => {
                      return (
                        <li
                          className="list-group-item d-flex flex-row   d-flex align-items-center border-start-0 border-end-0"
                          key={index}
                        >
                          <div className="d-flex  col-9 justify-content-start align-items-center">
                            <Checkbox
                              type="checkbox"
                              id="productCheckBox"
                              value={index}
                              onChange={(e) => handleChange(e)}
                            />
                            <label htmlFor="productCheckBox" className="label">
                              <div className="d-flex justify-content-center">
                                <div className="flex-column align-items-center">
                                  <img
                                    src={data.img_url}
                                    alt=""
                                    className="image"
                                  />
                                  <h6 className="my-0">{data.title}</h6>
                                  {/* <small className="text-muted">
                                    Thêm miêu tả ở đây
                                  </small> */}
                                </div>
                              </div>
                            </label>
                          </div>

                          <div className="col-3 d-flex flex-row justify-content-center price">
                            <span className="d-flex align-items-center price">
                              {data.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                " " +
                                "VND"}
                            </span>

                            <FontAwesomeIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                dispatch(removeItem(index));
                              }}
                              icon={faTrashCan}
                              id="icon"
                              className="d-flex align-items-center"
                            />
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </CheckboxGroup>
          </div>
          <div className="col-md-4 order-md-4 mb-4 align-self-start">
            <div className=" card p-2">
              <div className="input-group d-flex flex-column">
                <div>
                  <div>
                    <h5>Thông tin đơn hàng</h5>
                    <div className=" d-flex flex-row col-12 ">
                      <span>
                        Tạm tính:{" "}
                        {total != undefined
                          ? total
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                            " " +
                            "VND"
                          : 0}
                      </span>
                      <span className="flex jus-center">
                        {data.totalamount}
                      </span>
                    </div>
                  </div>

                  <Grid item={true}>
                    {data.length > 0 ? (
                      <Grid item={true}>
                        {" "}
                        {!!user?.username ? (
                          <Button
                            onClick={CheckOut}
                            className="btn btn-secondary  col-12"
                          >
                            Xác nhận giỏ hàng
                          </Button>
                        ) : (
                          <Grid
                            className="flex jus-center"
                            style={{ width: "100%" }}
                          >
                            Bạn cần đặng nhập để thanh toán
                          </Grid>
                        )}
                      </Grid>
                    ) : (
                      <p>Chưa chọn sản phẩm nào</p>
                    )}
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isCheckOut == true ? (
          <Grid
            spacing={2}
            container
            style={{ flexDirection: "column" }}
            className="flex fcol checkout"
          >
            <h4 style={{ marginLeft: "10px" }}>Thông tin thanh toán</h4>
            <Grid md={12} display="flex" item={true}>
              <TextField
                disabled
                style={{ marginRight: "10px" }}
                label="Họ"
                onChange={onChangeFname}
                value={fname}
              ></TextField>
              <TextField
                disabled
                label="Tên"
                onChange={onChangeLname}
                value={lname}
              ></TextField>
            </Grid>
            <Grid md={12} item={true}>
              <TextField
                required
                helperText={
                  errPhone == true ? "Số điện thoại không hợp lệ" : ""
                }
                error={errPhone}
                style={{ marginRight: "10px" }}
                label="SĐT"
                onChange={onChangePhone}
                value={phone}
              ></TextField>
            </Grid>
            <Grid md={12} display="flex" item={true}>
              <Grid style={{ marginRight: "10px" }} item={true} md={4}>
                <h6>Tỉnh/thành phố</h6>
                <Select
                  onChange={onChangeL1}
                  defaultValue="Hồ Chí Minh"
                  placeholder="Tỉnh / thành phố"
                  style={{ width: "100%" }}
                  filterSort={(optionA, optionB) =>
                    optionA > optionB ? -1 : 1
                  }
                >
                  {ArrLocation.map((province) => {
                    return (
                      <Option key={province} value={province.name}>
                        {province.name}
                      </Option>
                    );
                  })}
                </Select>
              </Grid>

              <Grid style={{ marginRight: "10px" }} md={4} item={true}>
                <h6>Quận / huyện</h6>
                <Select
                  value={location2}
                  onChange={onChangeL2}
                  placeholder="Quận/huyện"
                  style={{ width: "100%" }}
                >
                  {LoadL2() != undefined
                    ? LoadL2().map((districts) => {
                        return (
                          <Option key={districts} value={districts.name}>
                            {districts.name}
                          </Option>
                        );
                      })
                    : null}
                </Select>
              </Grid>
              <Grid item={true} md={3}>
                <h6>Phường / xã</h6>
                <Select
                  value={location3}
                  onChange={onChangeL3}
                  placeholder="Phường/xã"
                  style={{ width: "100%" }}
                >
                  {!!LoadL3()
                    ? LoadL3()
                        .map((item) => {
                          return (
                            <Option key={item} value={item.name}>
                              {item.name}
                            </Option>
                          );
                        })
                        .sort()
                    : null}
                </Select>
              </Grid>
            </Grid>
            <Grid md={8} item={true}>
              <TextField
                required
                error={errAddress}
                helperText={
                  errAddress == true ? "Địa chỉ không được để trống" : ""
                }
                value={address}
                onChange={onChangeAddress}
                style={{ width: "100%" }}
                label="Dịa chỉ"
              ></TextField>
            </Grid>
            <Grid md={8} item={true}>
              <h4>Hình thức thanh toán</h4>
              <Select
                onChange={onChangeCheckOut}
                defaultValue={"COD"}
                placeholder="option"
                style={{ width: "100%" }}
              >
                <Option value="PAYPAL">Paypal</Option>
                <Option value="COD">COD</Option>
              </Select>
            </Grid>

            <Grid md={6} item={true}>
              {selectopt == "PAYPAL" ? (
                <PaypalButton
                  showModal={showModal}
                  alertcontent={(value) => setAlertcontent(value)}
                  ischeckout={() => setIsCheckOut(false)}
                  total={total}
                  cart={data}
                  user={user}
                  phone={phone}
                  address={`Tỉnh thành/phố: ${location1},Quận/huyện:${location2}, Phường/xã:${location3} Địa chỉ: ${address}`}
                ></PaypalButton>
              ) : (
                <button className="checkout-btn" onClick={() => validate()}>
                  CHECKOUT
                </button>
              )}
            </Grid>
          </Grid>
        ) : null}
        <Modal
          cancelButtonProps={{ style: { display: "none" } }}
          title="Transaction status"
          visible={isModalVisible}
          onOk={handleOk}
        >
          {alertcontent}
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
