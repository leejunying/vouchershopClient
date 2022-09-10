import React from "react";
import { Grid } from "@mui/material";
import { Space, Table, Tag } from "antd";
import {
  faTrashCan,
  faPenNib,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import axios from "axios";
import { Request_Admin, Request_User } from "../../../API/api";
import { Select } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import Detailpost from "./Detail";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import successAnimation from "../Products/effectbtn/deletesuccess.json";
import Lottie from "react-lottie";
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

const ListPost = () => {
  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const [isdetail, setDetail] = useState(false);
  const [page, setPage] = useState(1);
  const [isupdate, setIsupdate] = useState(false);

  const [selectitem, setSelectitem] = useState({});

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [deletedone, setDeletedone] = useState(false);

  const [data, setData] = useState([]);

  const reFreshData = (page) => {
    setData([]);
    setLoading(true);
    axios.get(`${Request_Admin.getPost}?page=${page}`).then((res) => {
      if (res.status == 200) {
        let newdata = res.data;
        console.log(newdata);
        if (newdata.totalPage) setTotal(newdata.totalPage);
        if (newdata.posts) setData(newdata.posts);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    reFreshData(1);
  }, []);

  useEffect(() => {
    if (isupdate == false) {
      reFreshData(1);
    }
  }, [isupdate]);

  const columns = [
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "AUTHOR",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "TAG",
      dataIndex: "categoryid",
      key: "categoryid",
      render: (_, record) => <span>{record.categoryid.title}</span>,
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createAt",
    },

    {
      title: "ACTION",
      key: "action",
      render: (_, item) => (
        <Space size="middle">
          <Tooltip placement="top" title="Update">
            <FontAwesomeIcon
              onClick={() => onClickUpdate(item)}
              style={{ cursor: "pointer" }}
              icon={faPenNib}
              id="icon"
              className="d-flex align-items-center"
            />
          </Tooltip>

          <Tooltip placement="top" title="Delete">
            <FontAwesomeIcon
              onClick={() => handleClickOpen(item)}
              style={{ cursor: "pointer" }}
              icon={faTrashCan}
              id="icon"
              className="d-flex align-items-center"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  const onClickUpdate = (item) => {
    console.log("selected", item);
    setSelectitem(item);
    setIsupdate(true);
  };

  const handleChange = (event, value) => {
    setPage(value);
    reFreshData(value);
  };

  const handleClickOpen = (item) => {
    setOpen(true);
    setSelectitem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    const id = selectitem._id;
    axios
      .delete(Request_Admin.deletePost, {
        headers: { authorization: `Basic ${info_Admin.accessToken}` },
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

  if (!!isupdate) {
    return (
      <Detailpost backtoList={() => setIsupdate(false)} postdata={selectitem} />
    );
  }

  return (
    <Grid>
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
            <Button variant="contained" color="success" onClick={handleDelete}>
              Yes,i sure
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
        dataSource={isupdate == true ? [] : data}
        columns={columns}
      ></Table>
      <Pagination count={total} page={page} onChange={handleChange} />
    </Grid>
  );
};

export default ListPost;
