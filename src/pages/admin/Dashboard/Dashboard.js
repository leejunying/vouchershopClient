import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  NotificationOutlined,
  DollarOutlined,
  FileWordOutlined,
  DatabaseOutlined,
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
      { subKey: "7", sublabel: "Biểu đồ" },
      { subKey: "8", sublabel: "Danh sách" },
    ],
  },
  {
    icon: NotificationOutlined,
    titleName: "Liên hệ",
    child: [
      { subKey: "9", sublabel: "Chi tiết" },
      { subKey: "10", sublabel: "Gửi phản hồi" },
    ],
  },
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
  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  // console.log(info_Admin);

  //State
  const [selected, setSelected] = useState(1);

  const onClickMenu = (e) => {
    setSelected(e.key);

    console.log(selected);
  };

  //State update

  const renderSwitch = (key) => {
    if (key == 1) return <ListVouchers></ListVouchers>;
    if (key == 2) return <Addproduct></Addproduct>;
    if (key == 3) return <ListPost></ListPost>;
    if (key == 4) return <Detailpost></Detailpost>;
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
      <Header className="header">
        <div className="logo">Admin page</div>
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
