import React from "react";
import { Grid } from "@mui/material";
import { Space, Table, Tag } from 'antd';
import { faTrashCan,faPenNib } from "@fortawesome/free-solid-svg-icons";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import axios from "axios";
import { Request_Admin } from "../../../API/api";
import { Select } from "antd";
 import { Alert, Spin } from 'antd';
import { useState } from "react";
import Addproduct from"./Addnew"
const { Option } = Select;


const ListVouchers = () => {

const [updateok,setUpdateok] = useState(false)

const [isupdate,setIsupdate] = useState(false)

const [selectitem,setSelectitem] = useState({})

const [data,setData]=useState([])

useEffect(()=>{
  axios.get(`${Request_Admin.getAllvoucher}`).then(res=>{
    if(res.status==200){   
      setData(res.data)
    }
  })
},[])

useEffect(() => {
  console.log("data updated")
}, [data])

const columns = [
  {
    title: 'TITLE',
    dataIndex: 'title',
    key: "title"
     
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: "status"
   },
  {

    title:'CATEGORY',
    dataIndex:'key',
    key: "key"
  },
  {
    title:'TAG',
    dataIndex:'categorys',
    key: "tag",
    render: (_,record) => (
      <span>
        {record.categorys.map((tag, index) => {
          return (
            <Tag key={`record_${record.id}_key_tag_${index}`}>
              {tag.title}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: 'IMAGE',
    key: "image",
    dataIndex: 'img_url',
    render: (_, record) => (
      <Space size="middle">
       <img style={{width:"80px", height:"80px"}} src={record.img_url}></img>
     </Space>
    )
  },
  {
    title:'ACTION',
    key:'action',
    render: (_, item) => (
      <Space size="middle">
        <FontAwesomeIcon
          onClick={()=> onClickUpdate(item)}
          style={{ cursor: "pointer" }}
          icon={faPenNib}
          id="icon"
          className="d-flex align-items-center"
        />
        <FontAwesomeIcon
          style={{ cursor: "pointer" }}
          icon={faTrashCan}
          id="icon"
          className="d-flex align-items-center"
        />
      </Space>
    ),
  },


]
  const onClickUpdate = (item) => {
    console.log("selected",item)

    setSelectitem(item)
    setIsupdate(true)   
  }

  if(!!isupdate) {
    return <Addproduct backtoList={()=>setIsupdate(false)} item={selectitem}/> 
  }
  return <Table dataSource={data} columns={columns}></Table>

};

export default ListVouchers;
