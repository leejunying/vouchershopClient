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

const columns = [
 
  {
    title: 'TITLE',
    dataIndex: 'title',
    key: 'title',
    
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    key: 'status',
  },
  {

    title:'CATEGORY',
    dataIndex:'key',
    },
    {
      title:'TAG',
      dataIndex:'categorys',
      key:'categorys',
      
      render: (_,record) => (
      <span>
        {record.categorys.map((tag) => {
     
          return (
            <Tag  key={tag}>
              {tag.title}
            </Tag>
          );
        })}
      </span>)},

    

    
  {
    title: 'IMAGE',
    dataIndex: 'img_url',
    render: (_, record) => (
      <Space size="middle">
       <img style={{width:"80px", height:"80px"}} src={record.img_url}></img>
     </Space>
    ),
   },
 
  {

    title:'ACTION',
    key:'action',
    render: (_, record) => (
      <Space size="middle">
      <FontAwesomeIcon
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

const ListVouchers = () => {

  //init antd
  const { Option } = Select;
  const [data,setData]=useState()
  useEffect(()=>{

    axios.get(`${Request_Admin.getallvoucher}`).then(res=>{


      if(res.status==200)
      {   

 
         setData(res.data)
      }

    })


  },[])

  return <Grid className="List-vouchers">
      <Grid className="Navbar">
       

      </Grid>
      { 
    
        data==undefined?<Spin></Spin>: 
            <Table dataSource={data}     columns={columns}  ></Table>

        
      
      }
      </Grid>
};

export default ListVouchers;
