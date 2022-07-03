import React from "react";
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
import { removeItem } from "../../../Redux/Reducer/Cart";
import { Button } from "antd";
import { Grid, TextField } from "@mui/material";
import { Select, InputNumber } from "antd";
import Map from "../../../Components/Heremap/map";
function Cart() {
  const { Option } = Select;

  const [checkout, setCheckout] = useState({});

  const data = useSelector((state) => (state = state.cart.items));
  const total = data
    .map((data) => {
      data = data.price;

      return Number(data);
    })
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  const user = useSelector((state) => {
    return state.account.Client;
  });
  const [picked, setPicked] = useState([]);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);

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
  const handleCheckAll = (e) => {
    if (e.target.checked == true) {
      //do whatever you want with isChecked value
    } else {
      setPicked([]);
    }
  };

  const activeCheckoutbtn = () => {
    console.log(user);
    if (user != undefined) {
      return false;
    } else return true;
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
                  <div className="checkout">
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
                  <Button
                    disabled={activeCheckoutbtn()}
                    className="btn btn-secondary  col-12"
                  >
                    Xác nhận giỏ hàng
                  </Button>
                  {activeCheckoutbtn() == true ? (
                    <p>Bạn cần đặng nhập để thanh toán</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Grid
          md={8}
          spacing={4}
          container
          style={{ flexDirection: "column" }}
          className="flex fcol checkout"
        >
          <h3>Thông tin thanh toán</h3>
          <Grid md={12} className="flex" item={true}>
            <TextField label="Họ"></TextField>
            <TextField label="Tên"></TextField>
          </Grid>
          <Grid md={12} className="flex" item={true}>
            <TextField label="Tỉnh/thành phố"></TextField>
            <TextField label="Quận/huyện"></TextField>
            <TextField label="Phường/xã"></TextField>
          </Grid>
          <Grid md={8} item={true}>
            <TextField style={{ width: "100%" }} label="Dịa chỉ"></TextField>
          </Grid>
          <Grid md={8} item={true}>
            <h4>Hình thức thanh toán</h4>
            <Select
              defaultValue={"cod"}
              placeholder="option"
              style={{ width: "100%" }}
            >
              <Option value="paypal">Paypal</Option>
              <Option value="cod">COD</Option>
            </Select>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Cart;
