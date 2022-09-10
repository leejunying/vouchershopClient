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
import { Tooltip } from "antd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import successAnimation from "../Products/effectbtn/successbtn.json";
import { Input } from "antd";
import Lottie from "react-lottie";
import Pagination from "@mui/material/Pagination";

const { TextArea } = Input;
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

const Listpending = () => {
  const info_Admin = useSelector((state) => state["account"]["Admin"]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(1);

  const [onsave, setOnSave] = useState(false);

  const [ondelete, setOnDelete] = useState(false);

  const [deletedone, setDeletedone] = useState(false);

  const [savedone, setSavedone] = useState(false);

  const [selectitem, setSelectitem] = useState({});

  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const reFreshData = (page) => {
    setData([]);
    setLoading(true);
    axios
      .get(`${Request_Admin.getPayment}?page=${page}`, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
      })
      .then((res) => {
        if (res.status == 200) {
          let newdata = res.data;
          newdata.payments = newdata.payments.filter((item) => {
            return item.status == "pending";
          });
          if (newdata.totalPage) setTotal(newdata.totalPage);
          if (newdata.payments) setData(newdata.payments);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    reFreshData(1);
  }, []);

  useEffect(() => {
    reFreshData(1);
  }, [deletedone]);
  useEffect(() => {
    reFreshData(1);
  }, [savedone]);

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
          <Tag color={"volcano"} key={`record_${record.status}`}>
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
    {
      title: "ACTION",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          <Tooltip placement="top" title="SAVE">
            <FontAwesomeIcon
              onClick={() => handleClickOpen("save", item)}
              style={{ cursor: "pointer", color: "green" }}
              icon={faCircleCheck}
              id="icon"
              className="d-flex align-items-center"
            />
          </Tooltip>

          <Tooltip placement="top" title="DELETE">
            <FontAwesomeIcon
              onClick={() => handleClickOpen("delete", item)}
              style={{ cursor: "pointer", color: "red" }}
              icon={faCircleXmark}
              id="icon"
              className="d-flex align-items-center"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleChange = (event, value) => {
    setPage(value);
    reFreshData(value);
  };

  const handleClickOpen = (key, item) => {
    setOpen(true);
    setSelectitem(item);

    if (key == "save") setOnSave(true);
    if (key == "delete") setOnDelete(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    const id = selectitem._id;
    axios
      .delete(Request_Admin.deletePayment, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
        data: { id: id },
      })
      .then((res) => {
        if (res.status == 200) {
          setDeletedone((o) => !0);
          setTimeout(() => {
            setDeletedone((o) => !o);
            setOpen(false);
          }, [2000]);
        }
      });
  };
  const handleSave = () => {
    const update = {
      _id: selectitem._id,
      status: "success",
    };

    console.log(update);
    console.log(Request_Admin.putPayment);

    axios
      .put(Request_Admin.putPayment, update, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
      })
      .then((res) => {
        if (res.status == 200) {
          setSavedone((o) => !0);
          setTimeout(() => {
            setSavedone((o) => !o);
            setOpen(false);
          }, [2000]);
        }
      });
  };
  return (
    <Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" "}
          {!!onsave
            ? "Save this bill to database"
            : !!ondelete
            ? "Delete this bill"
            : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {!!onsave
              ? "This item will save to database if you click Yes button"
              : !!ondelete
              ? " This item will delete on database if you click Yes button"
              : ""}{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!!onsave ? (
            <Grid
              justifyContent={"space-evenly"}
              className="flex jus-center  "
              style={{ width: "100%" }}
            >
              {!!savedone ? (
                <Lottie
                  options={defaultOptions}
                  height={100}
                  width={100}
                ></Lottie>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  Yes,i sure
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleClose();
                  setOnSave(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
          ) : !!ondelete ? (
            <Grid
              style={{ width: "100%" }}
              justifyContent={"space-evenly"}
              className="flex jus-center  "
            >
              {!!deletedone ? (
                <Lottie
                  options={defaultOptions}
                  height={100}
                  width={100}
                ></Lottie>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleDelete}
                >
                  Yes,i sure
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  handleClose();
                  setOnDelete(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
          ) : null}
        </DialogActions>
      </Dialog>
      <Table
        loading={loading}
        pagination={false}
        dataSource={data}
        columns={columns}
      ></Table>
      <Pagination count={total} page={page} onChange={handleChange} />
    </Grid>
  );
};

export default Listpending;
