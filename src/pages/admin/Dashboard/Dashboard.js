import React, { useEffect, useState, useRef } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb, Tag } from "antd";
import {
  UserOutlined,
  NotificationOutlined,
  DollarOutlined,
  FileWordOutlined,
  DatabaseOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import "./dashboard.css";
import "../admin.main.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Addproduct from "../Products/Addnew";
import ListVouchers from "../Products/List";
import ListPost from "../Articles/List";
import Detail from "../Articles/Detail";
import Detailpost from "../Articles/Detail";
import ListPayments from "../Bill/Listpending";
import Listpending from "../Bill/Listpending";
import Listsuccess from "../Bill/Listsucess";
import User from "../User/User";
import AddUser from "../User/AddUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import { io } from "socket.io-client";
import { host, Request_Admin } from "../../../API/api";
import axios, { Axios } from "axios";
import socketIOClient from "socket.io-client";

const { Header, Content, Sider } = Layout;

const items2 = [
  {
    icon: DatabaseOutlined,
    titleName: "Vouchers",
    child: [
      { subKey: "1", sublabel: "Danh sách" },
      { subKey: "2", sublabel: "Thêm mới Voucher" },
    ],
  },
  {
    icon: FileWordOutlined,
    titleName: "Bài Viết",
    child: [
      { subKey: "3", sublabel: "Danh sách" },
      { subKey: "4", sublabel: "Thêm mới" },
    ],
  },

  {
    icon: UserOutlined,
    titleName: "Người dùng",
    child: [
      { subKey: "5", sublabel: "Danh sách" },
      { subKey: "6", sublabel: "Thêm mới" },
    ],
  },
  {
    icon: DollarOutlined,
    titleName: "Hóa đơn",
    child: [
      { subKey: "7", sublabel: "Đơn đang xử lý" },
      { subKey: "8", sublabel: "Đã thanh toán" },
    ],
  },
  // {
  //   icon: NotificationOutlined,
  //   titleName: "Liên hệ",
  //   child: [
  //     { subKey: "9", sublabel: "Chi tiết" },
  //     { subKey: "10", sublabel: "Gửi phản hồi" },
  //   ],
  // },
].map((data, index) => {
  const key = data.titleName;
  return {
    key: `sub${key}`,
    icon: React.createElement(data.icon),
    label: `${key}`,
    children: data.child.map((data, j) => {
      return {
        key: data.subKey,
        label: `${data.sublabel}`,
      };
    }),
  };
});

const Dashboard = () => {
  const socket = useRef();
  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  // console.log(info_Admin);

  //State

  const [received, setReceived] = useState({});

  const [cod, setCod] = useState(0);
  const [bill, setBill] = useState(0);
  const [user, setUser] = useState(0);
  const [selected, setSelected] = useState(1);

  const onClickMenu = (e) => {
    setSelected(e.key);

    console.log(selected);
  };

  useEffect(() => {
    //mount
    axios.get(`${Request_Admin.getCountPayment}`).then((res) => {
      console.log(res);
      console.log(res);
      if (res) setReceived(res.data);
    });

    socket.current = socketIOClient.connect(`${host}`);

    //realtime
    socket.current.on("newpayment", (mes) => {
      console.log("newpayment", mes);
      setReceived(mes);
      console.log(mes);
    });
  }, []);

  useEffect(() => {
    setCod(received.pending);
    setBill(received.success);
  }, [received]);

  //State update

  const renderSwitch = (key) => {
    if (key == 1) return <ListVouchers></ListVouchers>;
    if (key == 2) return <Addproduct></Addproduct>;
    if (key == 3) return <ListPost></ListPost>;
    if (key == 4) return <Detailpost></Detailpost>;
    if (key == 5) return <User></User>;
    if (key == 6) return <AddUser></AddUser>;
    if (key == 7) return <Listpending></Listpending>;
    if (key == 8) return <Listsuccess></Listsuccess>;
  };

  return (
    <Layout
      style={{
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Redirect
        to={info_Admin["isAdmin"] == true ? "/admin/dashboard" : "/admin"}
      ></Redirect>
      <Header style={{ padding: "15px" }} className="header">
        <Grid container display="flex" alignItems="center">
          <Grid item={true} md={3}>
            {" "}
            <div className="logo">Admin page</div>{" "}
          </Grid>
          <Grid item={true} md={6}>
            {" "}
          </Grid>
          <Grid
            item={true}
            md={3}
            display="flex"
            justifyContent=" space-evenly"
          >
            <Grid
              onClick={() => setSelected(8)}
              item={true}
              display="Flex"
              className="header-item"
            >
              <label style={{ color: "white", cursor: "pointer" }}>
                INCOME
              </label>
              <Grid className="notification">
                <Grid>
                  <DollarOutlined
                    style={{
                      color: "white",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  ></DollarOutlined>
                </Grid>
                <span className="badge">{bill}</span>
              </Grid>
            </Grid>

            <Grid
              onClick={() => setSelected(7)}
              style={{ cursor: "pointer" }}
              item={true}
              display="flex"
              className="header-item"
            >
              <label style={{ color: "white", cursor: "pointer" }}>
                NEW ORDER
              </label>
              <Grid className="notification">
                <Grid>
                  <ContainerOutlined
                    style={{
                      color: "white",
                      fontSize: "25px",
                      cursor: "pointer",
                    }}
                  ></ContainerOutlined>
                </Grid>
                <span className="badge">{cod}</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <Menu
            onClick={onClickMenu}
            mode="inline"
            defaultSelectedKeys={["sub1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items2}
            theme="dark"
          />
        </Sider>
        <Layout style={{}}>
          <Content
            theme="dark"
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {renderSwitch(selected)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
