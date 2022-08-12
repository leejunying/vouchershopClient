import { Space, Table, Tag } from 'antd';
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Request_Admin } from "../../../API/api";
import { useSelector } from "react-redux";
import './User.css';
import AddUser from './AddUser';
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

  const [isupdate,setIsupdate] = useState(false)

  const [selectUser,setSelectedUser] = useState({})

  const [deletedone, setDeletedone] = useState(false);

 

  const onClickUpdate = (userName) => {
    console.log("selected",userName)

    setSelectedUser(userName)
    setIsupdate(true) 
    setOpen(true)  
  }
  const [data,setData]=useState([]);

  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const handleClickOpen = (item) => {
    setOpen(true);
    setSelectitem(item);
    console.log(item)
    console.log(selectitem)
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) =>{
    axios.delete(Request_Admin.deleteUser, {
      headers: { Authorization: `Basic ${info_Admin.accessToken}` },
      data: { id: id },
    }).then(    
        axios.get(Request_Admin.getAllUser, {headers: {
          'Authorization': `Basic ${info_Admin.accessToken}`
         }}).then(res=>{
      
          if (res.status == 200) {
            setDeletedone((o) => !0);
            setTimeout(() => {
              setDeletedone((o) => !o);
              setOpen(false);
              window.location.reload();
            }, [2000]);
          }
        }
        )
    )
  }
  
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
  
    },
    {
      title: 'Họ',
      dataIndex: 'firstname',
      key: 'firstname',
    },
    {
      title: 'Tên',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'phone',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: "Email",
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: "Số điện thoại",
      key: 'phone',
      dataIndex: 'phone',
  
    }
    ,
    {
      title: 'Action',
      render: (_, record) => (
        <Space size="middle">
          <button className='action' onClick={() => {onClickUpdate(record)}}>Sửa</button>
          <button className = "action" onClick={() => {handleClickOpen(record._id)}}>Xóa</button>       
        </Space>
      ),
    },                                                                                                                                                                                                   
  ];
  useEffect(()=> {
    axios.get(Request_Admin.getAllUser, {headers: {
      'Authorization': `Basic ${info_Admin.accessToken}`
     }}).then(res=>{
  
       if(res.status==200)
       {
        //  prop.updatedata(updateobj)
        //  setOnok(true)
  
        //  setTimeout(()=>{setOnok(false)},[2000])
          setData(res.data)    
        console.log(res);
       }
     })
  },[])
  

  if(!!isupdate) {
    return <AddUser existUserName ={selectUser}/> 
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
            <Button variant="contained" color="success" onClick={() => handleDelete(selectitem)}>
              Yes,i'm sure!
            </Button>
          )}
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Table columns={columns} dataSource={data}></Table>
    </div>
  );
}

export default User;

