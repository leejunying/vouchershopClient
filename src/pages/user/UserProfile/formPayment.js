import React from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import { Request_User } from "../../../API/api";
import Grid from "@mui/material/Grid";
import { Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";

const FormPayment = () => {
  const info = useSelector((state) => state["account"]["Client"]);
  const payment = info.paymentid;

  const [pageS, setPageS] = useState(1);
  const [pageP, setPageP] = useState(1);
  const [totalP, setTotalP] = useState(1);
  const [totalS, setTotalS] = useState(1);
  const [dataS, setDataS] = useState([]);
  const [dataP, setDataP] = useState([]);
  const [loadingS, setLoadingS] = useState(true);
  const [loadingP, setLoadingP] = useState(true);

  const pendingData = (data, page) => {
    const list = data.filter((item) => {
      return item.status == "pending";
    });

    const renderlist = displayData(list, page);

    return {
      totalList: list,
      renderList: renderlist,
    };
  };

  const sucessData = (data, page) => {
    const list = data.filter((item) => {
      return item.status == "success";
    });

    const renderlist = displayData(list, page);

    return {
      totalList: list,
      renderList: renderlist,
    };
  };

  const displayData = (data, page) => {
    const indexOfLastPost = page * 10;

    const indexOfFirstPost = indexOfLastPost - 10;

    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    return currentPosts;
  };

  useEffect(() => {
    if (payment) {
      const data1 = pendingData(payment, pageP);
      const data2 = sucessData(payment, pageS);

      if (data1) {
        const totalP = Math.ceil(data1.totalList.length / 10);
        setTotalP(totalP);
        setDataP(data1.renderList);
        setLoadingP(false);
      }
      if (data2) {
        const totalS = Math.ceil(data2.totalList.length / 10);

        setDataS(data2.renderList);
        setTotalS(totalS);
        setLoadingS(false);
      }
    }
  }, []);

  const columns = [
    {
      title: "ITEM",
      dataIndex: "purchase_items",
      key: "userid",
      render: (_, record) =>
        record.purchase_items.map((item) => {
          return (
            <Grid display="flex" flexDirection="column">
              <Grid>Sản phẩm {item.title}:</Grid>
              <Grid>
                Đơn giá{" "}
                {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " VND"}
              </Grid>
            </Grid>
          );
        }),
    },

    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>
          <Tag color={"blue"} key={`record_${record.total}`}>
            {record.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " VND"}
          </Tag>
        </span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <span>
          <Tag color={"volcano"} key={`record_${record.status}`}>
            {record.status}
          </Tag>
        </span>
      ),
    },
  ];

  const handleChangeP = (event, value) => {
    setPageP(value);
    const data1 = pendingData(payment, value);
    setDataP(data1.renderList);
  };

  const handleChangeS = (event, value) => {
    setPageS(value);
    const data2 = sucessData(payment, value);
    setDataS(data2.renderList);
  };

  return (
    <Grid item={true} style={{ width: "100%" }}>
      <Grid item={true} style={{ width: "100%" }}>
        Đơn hàng đang xử lý
        <Table
          loading={loadingP}
          pagination={false}
          dataSource={dataP}
          columns={columns}
        ></Table>
        <Pagination count={totalP} page={pageP} onChange={handleChangeP} />
      </Grid>
      <Grid item={true} style={{ width: "100%", marginTop: "20px" }}>
        Đơn hàng đã thanh toán
        <Table
          loading={loadingS}
          pagination={false}
          dataSource={dataS}
          columns={columns}
        ></Table>
        <Pagination count={totalS} page={pageS} onChange={handleChangeS} />
      </Grid>
    </Grid>
  );
};
export default FormPayment;
