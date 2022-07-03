import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Request_Admin } from "../../../API/api";
import axios from "axios";
import { message, Image, Input } from "antd";
import { Select, InputNumber } from "antd";
import "./Addnew.css";
import { Commonfc } from "../../../Ultis/Commonfunction";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

let Monthy = [];

let Color = [];

let Room = [];

const Addproduct = (prop) => {
  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const { Option } = Select;
  const [category, setCategory] = useState("CV");
  const [data, setData] = useState(null); //for update

  ///// common state
  const [image, setImage] = useState();

  const [locations, setLocations] = useState([]); //location choose

  const [categorys, setCategorys] = useState(null); //filter tabs

  const [title, setTitle] = useState("");
  //////
  //warning state

  const [sttTilte, setSttTile] = useState(0);

  //solution state
  const [price, setPrice] = useState(0);

  const [monthoptions, setMonthoptions] = useState(0);

  const [coloropt, setColoropt] = useState(0);

  const [roomopt, setRoomopt] = useState(0);

  //if prop not null is will fill to update
  useEffect(() => {
    if (prop.data != undefined) setData(data);

    axios.get(Request_Admin.getcategory).then((res) => {
      if (res.status == 200) {
        setCategorys(res.data);
      }
    });
  }, []);

  useEffect(() => {
    Monthy = createArrobj(monthoptions, Monthy);
  }, [monthoptions]);

  useEffect(() => {
    Color = createArrobj(coloropt, Color);
  }, [coloropt]);

  useEffect(() => {
    Room = createArrobj(roomopt, Room);
  }, [roomopt]);

  //function
  //Common onChange

  //auto create array obj by number

  const createArrobj = (statenumber, array) => {
    if (array.length < statenumber) {
      for (let i = array.length; i < statenumber; i++) {
        array.push({ title: "1", value: "0" });
      }
    }
    if (array.length > statenumber) {
      array.splice(0, statenumber);
    }

    if (array.length == 0) {
      for (let i = 0; i < statenumber; i++) {
        array.push({ title: "1", value: "0" });
      }
    }

    return array;
  };

  //for monthy voucher
  const onChangePackage = (indx, type, e) => {
    if (type == "title") Monthy[indx].title = e.target.value;

    if (type == "value") Monthy[indx].value = e.target.value;
  };

  const onChangeColor = (indx, type, e) => {
    if (type == "title") Color[indx].title = e.target.value;

    if (type == "value") Color[indx].value = e.target.value;
  };

  const onChangeRoom = (indx, type, e) => {
    if (type == "title") Room[indx].title = e.target.value;

    if (type == "value") Room[indx].value = e.target.value;
  };

  const onClickAdd = () => {
    //

    //Excute categorys

    const categoryssend = [];

    let priceoptionssend = {
      price: 0,
      package: [],
      room: [],
      color: [],
      duration: [],
    };

    const categoryid = categorys.filter((item) => {
      return item.key == category;
    })._id;

    categoryssend.push(categoryid);

    locations.map((location) => {
      categoryssend.push(location);
    });

    //Excute priceoptions

    if (category == "CV") priceoptionssend.price = price;
    if (category == "DVHK") {
      priceoptionssend.package = Monthy;
    }
    if (category == "DVND") {
      priceoptionssend.room = Room;
      priceoptionssend.duration = Monthy;
      priceoptionssend.color = Color;
    }
    if (category == "DVLK") {
      priceoptionssend.lineofcredit = Monthy;
      priceoptionssend.room = Room;
    }
    if (category == "DVG") {
      priceoptionssend.duration = Monthy;
    }

    // Excute Image

    let body = new FormData();
    body.set("key", "821358b6cb84839ab5031d22a6594bdd");
    body.append("image", image);
    // body.append("name", title);
    // body.append('expi ration',`${cleartime}`)

    axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    }).then((result) => {
      let image_url = "";
      if (result.data.status == 200) {
        image_url = result.data.data.display_url;
        const submititem = {
          key: `${category}`,
          title: title,
          img_url: image_url,
          categorys: categoryssend,
          price_options: priceoptionssend,
          status: "new",
        };

        axios
          .post(Request_Admin.postvoucher, submititem, {
            headers: {
              token: `Basic ${info_Admin.accessToken}`,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              resetfield();
            }
          });
      }
    });
  };

  const resetfield = () => {
    setRoomopt(0);
    setTitle("");
    setColoropt(0);
    setLocations([]);
    setMonthoptions(0);
    setImage(undefined);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const onChangeMonthoptions = (value) => {
    setMonthoptions(value);
  };

  const onChangeColoroptions = (value) => {
    setColoropt(value);
  };
  const onChangeRoomoptions = (value) => {
    setRoomopt(value);
  };

  const Displayoptions = () => {
    if (category == "CV") {
      return (
        <Grid style={{ width: "100%" }}>
          <Grid>
            <h5>Price</h5>
            <InputNumber
              style={{ width: "100%" }}
              onChange={onChangePrice}
              defaultValue={0}
              addonAfter="VND"
            />
          </Grid>
          <Grid></Grid>
        </Grid>
      );
    }

    if (category == "DVHK") {
      return (
        <Grid style={{ width: "100%" }}>
          <h5>Monthly options</h5>

          <Select
            onChange={onChangeMonthoptions}
            style={{ width: "100%" }}
            placeholder="How many options"
            value={monthoptions}
          >
            {Array.from(Array(12).keys()).map((num) => {
              return <Option key={num} value={num + 1}></Option>;
            })}
          </Select>

          <Grid>
            {monthoptions > 0
              ? Array.from(Array(monthoptions).keys()).map((num, indx) => {
                  return (
                    <Grid
                      key={num}
                      style={{ width: "100%", marginTop: "15px" }}
                      className=" flex sp-bot"
                    >
                      <Grid
                        container
                        style={{ width: "100%" }}
                        className="flex"
                      >
                        <Grid
                          className="flex al-center jus-start"
                          item={true}
                          md={5}
                        >
                          <TextField
                            label="Monthy"
                            defaultValue={1}
                            onChange={(e) => onChangePackage(indx, "title", e)}
                          ></TextField>
                        </Grid>
                        <Grid
                          className="flex al-center jus-center"
                          item={true}
                          md={6}
                        >
                          <TextField
                            label="value"
                            defaultValue={0}
                            onChange={(e) => onChangePackage(indx, "value", e)}
                            placeholder="Value"
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
      );
    }
    if (category == "DVND") {
      return (
        <Grid
          container
          display={"flex"}
          rowSpacing={1}
          flexDirection={"column"}
          style={{ width: "100%" }}
        >
          <Grid item={true} className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={monthoptions}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {monthoptions > 0
                ? Array.from(Array(monthoptions).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>

          <Grid item={true} className="color">
            <h5>Color options</h5>
            <Select
              onChange={onChangeColoroptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={coloropt}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {coloropt > 0
                ? Array.from(Array(coloropt).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="color"
                              defaultValue={"White"}
                              onChange={(e) => onChangeColor(indx, "title", e)}
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={0}
                              onChange={(e) => onChangeColor(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
          <Grid item={true} className="room">
            <h5>Room options</h5>
            <Select
              onChange={onChangeRoomoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={roomopt}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {roomopt > 0
                ? Array.from(Array(roomopt).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="Room"
                              defaultValue={1}
                              onChange={(e) => onChangeRoom(indx, "title", e)}
                              placeholder="Room"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={0}
                              onChange={(e) => onChangeRoom(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (category == "DVLK") {
      return (
        <Grid
          style={{ width: "100%" }}
          container
          rowSpacing={1}
          display="flex"
          flexDirection={"column"}
        >
          <Grid item={true} className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={monthoptions}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {monthoptions > 0
                ? Array.from(Array(monthoptions).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
          <Grid item={true} className="room">
            <h5>Room options</h5>
            <Select
              onChange={onChangeRoomoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={roomopt}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {roomopt > 0
                ? Array.from(Array(roomopt).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="Room"
                              defaultValue={1}
                              onChange={(e) => onChangeRoom(indx, "title", e)}
                              placeholder="Room"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) => onChangeRoom(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      );
    }

    if (category == "DVG") {
      return (
        <Grid style={{ width: "100%" }}>
          <Grid className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={monthoptions}
            >
              {Array.from(Array(12).keys()).map((num) => {
                return <Option key={num} value={num + 1}></Option>;
              })}
            </Select>

            <Grid>
              {monthoptions > 0
                ? Array.from(Array(monthoptions).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                : null}
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const onChangeCategory = (value) => {
    resetfield();
    setCategory(value);
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);

      console.log(e.target.files[0]);
    }
  };

  //render

  return (
    <Grid className="Box-container">
      {categorys != undefined ? (
        <Grid className=" Add-voucher">
          <Grid container>
            <Grid item={true} xs={6}>
              <Grid
                container
                direction="column"
                columns={{ xs: 4, md: 6, sm: 2 }}
                rowSpacing={2}
              >
                <Grid item={true}>
                  <h5>Category</h5>
                  <Grid item={true} xs={5}>
                    <Select
                      defaultValue="Combo Voucher"
                      placeholder="Inserted are removed"
                      onChange={onChangeCategory}
                      style={{ width: "100%" }}
                    >
                      {categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == false)
                          return (
                            <Select.Option key={item.key} value={item.key}>
                              {item.title}
                            </Select.Option>
                          );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  <h5>Title</h5>
                  <Grid item={true} xs={5}>
                    {" "}
                    <Input value={title} onChange={onChangeTitle}></Input>
                  </Grid>
                </Grid>

                <Grid item={true}>
                  <h5>Locations</h5>
                  <Grid item={true} xs={5}>
                    {" "}
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={locations}
                      onChange={setLocations}
                      style={{
                        width: "100%",
                      }}
                    >
                      {categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == true)
                          return (
                            <Select.Option key={item.key} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  <h5>Demo image</h5>
                  <Grid item={true} xs={5}>
                    <img
                      src={
                        image != undefined
                          ? URL.createObjectURL(image)
                          : "error"
                      }
                      style={{ width: "100%", height: "400px" }}
                    ></img>
                  </Grid>

                  <Grid item={true}>
                    {" "}
                    <input
                      onChange={(e) => imageChange(e)}
                      type="file"
                      accept="image/*"
                      id="contained-button-file"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item={true} xs={6}>
              <Grid
                container
                direction="column"
                columns={{ xs: 4, md: 6, sm: 2 }}
                rowSpacing={2}
                justifyContent="center"
              >
                <Grid className="Price-options" item={true}>
                  {Displayoptions()}
                </Grid>

                <Grid item={true} display="flex" justifyContent={"center"}>
                  <button onClick={onClickAdd} className="create-btn">
                    CREATE VOUCHER
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Addproduct;
