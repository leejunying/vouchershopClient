import React from "react";
import { Grid } from "@mui/material";
import { Space, Table, Tag } from "antd";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import axios from "axios";
import { Request_Admin, Request_User } from "../../../API/api";
import { Select } from "antd";
import { Alert, Spin } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import successAnimation from "../Products/effectbtn/successbtn.json";
import Chart from "react-apexcharts";
import Pagination from "@mui/material/Pagination";
import "./table.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const { Option } = Select;

const Listsuccess = () => {
  const info_Admin = useSelector((state) => state["account"]["Admin"]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(1);

  const [data, setData] = useState([]);
  const reFreshData = (page) => {
    setData([]);
    setLoading(true);

    console.log(Request_Admin.getPayment);
    axios
      .get(`${Request_Admin.getPayment}?page=${page}`, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
      })
      .then((res) => {
        if (res.status == 200) {
          let newdata = res.data;
          newdata.payments = newdata.payments.filter((item) => {
            return item.status == "success";
          });
          if (newdata.totalPage) setTotal(newdata.totalPage);
          if (newdata.payments) setData(newdata.payments);
          setLoading(false);
        }
      });
  };

  const incomeBymonth = (inputmonth) => {
    let arrayimcome = [];
    const curDate = new Date();
    const curyear = curDate.getFullYear();
    arrayimcome = data.map((item) => {
      let date = new Date(item.createdAt);
      let month = date.getMonth() + 1;
      if (date.getFullYear() == curyear && month == inputmonth)
        return Number(item.total);
      else return 0;
    });

    return arrayimcome;
  };

  const sumIncome = (arrayincome) => {
    let result = arrayincome.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0,
    );
    return result;
  };
  const handleChange = (event, value) => {
    setPage(value);
    reFreshData(value);
  };

  const totalbyMonth = () => {
    const arrIncomeByMonth = [];
    for (let i = 1; i <= 12; i++) {
      arrIncomeByMonth.push(sumIncome(incomeBymonth(i)));
    }
    return arrIncomeByMonth;
  };

  let chartdata = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
      },
    },
    series: [
      {
        name: "income",
        data: totalbyMonth(),
      },
    ],
  };
  useEffect(() => {
    reFreshData(1);
    totalbyMonth();
  }, []);

  const inComeData = () => {
    let result = [];
    return (result = totalbyMonth().map((item, indx) => {
      return {
        income: item,
        month: indx + 1,
      };
    }));
  };

  const columns = [
    {
      title: "USERNAME",
      dataIndex: "userid",
      key: "userid",
      render: (_, record) => (
        <span>
          <Tag color={"geekblue"} key={`record_${record.userid.username}`}>
            {record.userid.username}
          </Tag>
        </span>
      ),
    },

    {
      title: "ADDRESS",
      dataIndex: "shipaddress",
      key: " shipaddress",
      render: (_, record) => (
        <span style={{ fontSize: "14px" }}>{record.shipaddress}</span>
      ),
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
          <Tag color={"green"} key={`record_${record.status}`}>
            {record.status}
          </Tag>
        </span>
      ),
    },
    {
      title: "CONTACT",
      dataIndex: "contactphone",
      key: "contactphone",
      render: (_, record) => (
        <span style={{ fontSize: "18px", color: "#108ee9" }}>
          {record.contactphone}
        </span>
      ),
    },
  ];

  return (
    <Grid>
      {!!data ? (
        <Grid display={"flex"} style={{ width: "100%" }} container>
          <Grid md={7} item={true}>
            {" "}
            <Chart
              options={chartdata.options}
              series={chartdata.series}
              type="bar"
              width="500"
            />{" "}
          </Grid>
          <Grid md={5} item={true}>
            <table id="customers">
              <tr>
                <td>INCOME</td>
                <td>MONTH</td>
              </tr>
              {inComeData().map((item, indx) => {
                return (
                  <tr key={item}>
                    <td>
                      {item.income
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND"}
                    </td>
                    <td>{item.month}</td>
                  </tr>
                );
              })}
            </table>
          </Grid>
        </Grid>
      ) : null}
      <Grid style={{ marginTop: "20px" }}>
        <Table loading={loading} dataSource={data} columns={columns}></Table>
        <Pagination count={total} page={page} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default Listsuccess;
