import React from "react";
import "./UserProfile.css";
import { Button, Checkbox, Form, Input, Col, Row } from "antd";
import "antd/dist/antd.css";
import { spacing } from "@mui/system";
import { useEffect } from "react";
import axios from "axios";
import { Request_User } from "../../../API/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import FormChangepassword from "./formChangepassword";
import FormPayment from "./formPayment";
import FormInfo from "./formInfo";
function UserProfile(props) {
  const info_User = useSelector((state) => state["account"]["Client"]);
  /////
  const [select, setSelect] = useState(0);

  useEffect(() => {}, []);

  const renderContent = () => {
    if (select == 0) return <FormPayment></FormPayment>;
    if (select == 1) return <FormInfo></FormInfo>;
    if (select == 2) return <FormChangepassword></FormChangepassword>;
  };

  return (
    <Grid container display="flex" flexDirection="column" className="profile">
      <Grid display="flex" item={true}>
        <Grid
          md={3}
          display="flex"
          flexDirection="column"
          className="profile-menu"
          alignItems="center"
          container
          spacing={2}
          style={{
            padding: "10px",
          }}
        >
          {" "}
          <Grid item={true}>
            <h4>PROFILE</h4>
          </Grid>
          <Grid
            item={true}
            className={select == 0 ? "select-active" : "select"}
            onClick={() => setSelect(0)}
          >
            <label className="select-title">payment</label>
          </Grid>
          <Grid
            item={true}
            className={select == 1 ? "select-active" : "select"}
            onClick={() => setSelect(1)}
          >
            <label className="select-title">information</label>
          </Grid>
          <Grid
            item={true}
            className={select == 2 ? "select-active" : "select"}
            onClick={() => setSelect(2)}
          >
            <label className="select-title">change password</label>
          </Grid>
        </Grid>
        <Grid md={9} item={true} className="profile-content">
          <Grid item={true}>
            <Grid className="" container style={{ padding: "10px" }}>
              {renderContent()}
            </Grid>
          </Grid>{" "}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
