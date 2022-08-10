import React, { useState } from "react";
import { Grid } from "@mui/material";
import { Select } from "antd";
import "./voucherdetail.css";
import Editor from "../Editor/Voucherdetail/editor";
import { LeftOutlined } from "@ant-design/icons";

const { Option } = Select;

const VoucherDetail = (props) => {
  //state

  const { voucherId } = props || "";
  const [typeselect, setTypeselect] = useState("detail");

  const onChangeSelect = (value) => {
    setTypeselect(value);
  };
  return (
    <Grid className="voucher-detail">
      <Grid
        container
        display={"flex"}
        flexDirection="column"
        style={{ marginBottom: "20px" }}
        className="option"
      >
        {!!voucherId ? (
          <Grid
            item={true}
            onClick={() => props.backtoList()}
            style={{ width: "150px", color: "blue", cursor: "pointer" }}
            display="flex"
            alignItems={"center"}
          >
            <LeftOutlined> </LeftOutlined>
            BACK TO LIST
          </Grid>
        ) : null}
        <Grid item={true} style={{ marginBottom: "20px" }}>
          Select post type
        </Grid>
        <Grid item={true} md={4} style={{ marginBottom: "20px" }}>
          <Select
            style={{ width: "100%" }}
            onChange={onChangeSelect}
            defaultValue={typeselect}
          >
            <Option value={"detail"}>Thông tin chi tiết</Option>
            <Option value={"policy"}>Chính sách</Option>
          </Select>
        </Grid>
      </Grid>
      <Grid className="textcontent">
        <Editor voucherId={voucherId} type={typeselect} />
      </Grid>
    </Grid>
  );
};

export default VoucherDetail;
