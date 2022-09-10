import { Space, Table, Tag } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Request_Admin } from "../../../API/api";
import { useSelector } from "react-redux";
import "./User.css";
import AddUser from "./AddUser";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import successAnimation from "./effectbtn/deletesuccess.json";
import Lottie from "react-lottie";
import Button from "@mui/material/Button";
import { Select } from "antd";
import Pagination from "@mui/material/Pagination";

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

function User(props) {
  const [selectitem, setSelectitem] = useState();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [isupdate, setIsupdate] = useState(false);

  const [selectUser, setSelectedUser] = useState({});

  const [deletedone, setDeletedone] = useState(false);

  const onClickUpdate = (userName) => {
    console.log("selected", userName);

    setSelectedUser(userName);
    setIsupdate(true);
    setOpen(true);
  };
  const [data, setData] = useState([]);

  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const handleChange = (event, value) => {
    setPage(value);
    reFreshData(value);
  };

  const handleClickOpen = (item) => {
    setOpen(true);
    setSelectitem(item);
    console.log(item);
    console.log(selectitem);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(Request_Admin.deleteUser, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
        data: { id: id },
      })

      .then((res) => {
        if (res.status == 200) {
          setDeletedone((o) => !0);
          setTimeout(() => {
            setDeletedone((o) => !o);
            setOpen(false);
            reFreshData(1);
          }, [2000]);
        }
      });
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Tên",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "phone",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      key: "phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="action"
            onClick={() => {
              onClickUpdate(record);
            }}
          >
            Sửa
          </button>
          <button
            className="action"
            onClick={() => {
              handleClickOpen(record._id);
            }}
          >
            Xóa
          </button>
        </Space>
      ),
    },
  ];

  const reFreshData = (page) => {
    setData([]);
    setLoading(true);
    axios
      .get(`${Request_Admin.getAllUser}?page=${page}`, {
        headers: { Authorization: `Basic ${info_Admin.accessToken}` },
      })
      .then((res) => {
        if (res.status == 200) {
          let newdata = res.data;
          console.log(newdata);
          if (newdata.totalPage) setTotal(newdata.totalPage);
          if (newdata.users) setData(newdata.users);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    reFreshData(1);
  }, []);

  if (!!isupdate) {
    return <AddUser existUserName={selectUser} />;
  }
  return (
    <div className="wrapper">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure to delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This item will delete on database if you click Yes button
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {!!deletedone ? (
            <Lottie options={defaultOptions} height={100} width={100}></Lottie>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleDelete(selectitem)}
            >
              Yes,i'm sure!
            </Button>
          )}
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Table
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={data}
      ></Table>
      <Pagination count={total} page={page} onChange={handleChange} />
    </div>
  );
}

export default User;
