import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Request_Admin } from "../../../API/api";
import axios from "axios";
import { message, Image, Input } from "antd";
import { Select, InputNumber } from "antd";
import "./Addnew.css";
import { Commonfc } from "../../../Ultis/Commonfunction";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import { Category } from "@mui/icons-material";
import {LeftOutlined} from "@ant-design/icons"
import successAnimation from "./successbtn.json"
import Lottie from 'react-lottie';
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: successAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
let Monthy = [];

let Color = [];

let Room = [];

const Addproduct = (prop) => {

  const voucher = prop.item


  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const { Option } = Select;
  const [category, setCategory] = useState();
 
  ///// common state
  const [image, setImage] = useState();

  const [locations, setLocations] = useState([]); //location choose

  const [categorys, setCategorys] = useState([]); //filter tabs

  const [title, setTitle] = useState("");

  const [status,setStatus]=useState("")
  //////
  //warning state

  const [sttTilte, setSttTile] = useState(0);

  //solution state
  const [price, setPrice] = useState(0);

  const [monthoptions, setMonthoptions] = useState([]);

  const [coloropt, setColoropt] = useState(0);

  const [roomopt, setRoomopt] = useState(0);


  const [onOk,setOnok]=useState(false)

  //if prop not null is will fill to update
  useEffect(() => {
    if (voucher != undefined){
      setCategory(voucher.key)
      setTitle(voucher.title)
      setStatus(voucher.status)

      let newcategorys = voucher.categorys.map((item,indx)=> {
        if(indx>0) return item._id
      })
      
      newcategorys.shift()

      setLocations(newcategorys)
      setImage(voucher.img_url)
 
      if(voucher.key=="CV")
      {
        setPrice(voucher.price_options.price)
       }
      if(voucher.key=="DVHK")
      {
        setMonthoptions(voucher.price_options.package.length)
        Monthy=voucher.price_options.package
       }
      if(voucher.key=="DVND")
      {
        // Monthy=voucher.price_options.duration 
        // setMonthoptions(Monthy.length)

        setMonthoptions(voucher.price_options.duration)

        Color=voucher.price_options.color
        setColoropt(Color.length)
        Room=voucher.price_options.room
        setRoomopt(Room.length)
      
       }
       if(voucher.key=="DVLK")
       {
         Monthy=voucher.price_options.lineofcredit  
         setMonthoptions(Monthy.length)
         
       }
       if(voucher.key=="DVG")
       {
           Monthy=voucher.price_options.duration  
         setMonthoptions(Monthy.length)
       }
     
      

    } 
    else{
              setCategory("CV")

    }
 
    axios.get(Request_Admin.getcategory).then((res) => {
      if (res.status == 200) {
        setCategorys(res.data);

        console.log(res.data)
       }
    });
  }, []);

 

  useEffect(() => {
    Color = createArrobj(coloropt, Color);
  }, [coloropt]);

  useEffect(() => {
    Room = createArrobj(roomopt, Room);
  }, [roomopt]);

  //function
  //Common onChange

  //auto create array obj by number


 

  const createArrobj = (statenumber, array) => {
    if ( statenumber<array.length) {
       
        array.splice(0,statenumber)
  
    }
    if (  statenumber > array.length ) {
      for(let i=0;i<statenumber-array.length;i++)
      array.push({title:"1",value:"0"})
    }

    if (statenumber == 0) {
      array=[]
    }

    
    return array;
  };

  //for monthy voucher
  const onChangePackage = (indx, type, e) => {
    if (type == "title") monthoptions[indx].title = e.target.value;

    if (type == "value") monthoptions[indx].value = e.target.value;
  };

  const onChangeColor = (indx, type, e) => {
    if (type == "title") Color[indx].title = e.target.value;

    if (type == "value") Color[indx].value = e.target.value;
  };

  const onChangeRoom = (indx, type, e) => {
    if (type == "title") Room[indx].title = e.target.value;

    if (type == "value") Room[indx].value = e.target.value;
  };
 


 

 
 
  const onUpdate=()=>{

    let tags=[]
    if(locations.length>0)
    {
      tags=[findCategoryID(),...locations]

    }
    else  
     tags=[findCategoryID()]


    const updateobj={

      id:voucher._id,
      title:title,
      key:category,
      categorys:tags,
      img_url:image,
      price_options:createPriceOptions(),
      status:status,
  
    }

     axios.put(Request_Admin.putUpdatevoucher,updateobj, {headers: {
             'Authorization': `Basic ${info_Admin.accessToken}`
            }}).then(res=>{

              if(res.status==200)
              {
                prop.updatedata(updateobj)
                setOnok(true)

                setTimeout(()=>{setOnok(false)},[2000])
              }
            })


  }

  const findCategoryID=()=>{
     const categoryid = categorys.filter((item) => {
       return item.key == category;
    })[0]._id;

    return categoryid
  }

  const createPriceOptions=()=>{

      let priceoptionssend = {
      price: 0,
      package: [],
      room: [],
      color: [],
      duration: [],
    }
     if (category == "CV") priceoptionssend.price = price;
    if (category == "DVHK") {
      priceoptionssend.package = Monthy;
    }
    if (category == "DVND") {
      priceoptionssend.room = Room;
      priceoptionssend.duration = Monthy;
      priceoptionssend.color = Color;
    }
    if (category == "DVLK") {
      priceoptionssend.lineofcredit = Monthy;
      priceoptionssend.room = Room;
    }
    if (category == "DVG") {
      priceoptionssend.duration = Monthy;
    }

    return priceoptionssend

  }

  const onClickAdd = () => {
    //

    //Excute categorys

    const categoryssend = [];
 
    

        
 

     categoryssend.push(findCategoryID);

    locations.map((location) => {
      categoryssend.push(location);
    });

    //Excute priceoptions


    // Excute Image

    let body = new FormData();
    body.set("key", "821358b6cb84839ab5031d22a6594bdd");
    body.append("image", image);
    body.append("name", title);
    // body.append('expi ration',`${cleartime}`)

    axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    }).then((result) => {
      let image_url = "";
      if (result.data.status == 200) {
        image_url = result.data.data.display_url;
        const submititem = {
          key: `${category}`,
          title: title,
          img_url: image_url,
          categorys: categoryssend,
          price_options:  createPriceOptions(),
          status: status,
        };

        axios
          .post(Request_Admin.postNewvoucher, submititem, {
            headers: {
              'Authorization': `Basic ${info_Admin.accessToken}` 
            },
          })
          .then((res) => {
            if (res.status == 200) {
              resetfield();
            }
          });
      }
    });

 
 

     
  };

  const resetfield = () => {
    setRoomopt(0);
    setTitle("");
    setColoropt(0);
    setLocations([]);
    setMonthoptions([]);
    setImage(undefined);
    setPrice(0)
   

 
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeStatus=(e)=>{
    setStatus(e.target.value)
  }

  const onChangePrice = (value) => {
    setPrice(value);
  };

  const onChangeMonthoptions = (value) => {
    

     

   const  newarr= createArrobj(value,monthoptions)

 

     setMonthoptions(newarr);
  };

  const onChangeColoroptions = (value) => {
     setColoropt(value);
  };
  const onChangeRoomoptions = (value) => {
     setRoomopt(value);
  };

  const Displayoptions = () => {

 
    if (category == "CV") {
      return (
        <Grid style={{ width: "100%" }}>
          <Grid>
            <h5>Price</h5>
            <InputNumber
              style={{ width: "100%" }}
              onChange={onChangePrice}
              defaultValue={voucher!=undefined?voucher.price_options.price:0}
              addonAfter="VND"
            />
          </Grid>
         </Grid>
      );
    }

    if (category == "DVHK") {
      return (
        <Grid style={{ width: "100%" }}>
          <h5>Monthly options</h5>

          <Select
            onChange={onChangeMonthoptions}
            style={{ width: "100%" }}
            placeholder="How many options"
            value={monthoptions}
          >


            
            {Array.from(Array(5).keys()).map((num) => {
              return <Option key={num} value={num}></Option>;
            })}
          </Select>

          <Grid>

            {
              voucher!=undefined ?

            

               Array.from(Array(monthoptions).keys()).map((item,indx)=>{
                console.log(monthoptions)
                let pricepackage=voucher.price_options.package  
      return (
                    <Grid
                      key={item}
                      style={{ width: "100%", marginTop: "15px" }}
                      className=" flex sp-bot"
                    >
                      <Grid
                        container
                        style={{ width: "100%" }}
                        className="flex"
                      >
                        <Grid
                          className="flex al-center jus-start"
                          item={true}
                          md={5}
                        >
                          <TextField
                            label="Monthy"
                            defaultValue={pricepackage[indx]?.title==undefined?1:pricepackage[indx].title}
                            onChange={(e) => onChangePackage(indx, "title", e)}
                          ></TextField>
                        </Grid>
                        <Grid
                          className="flex al-center jus-center"
                          item={true}
                          md={6}
                        >
                          <TextField
                            label="value"
                            defaultValue={pricepackage[indx]?.value==undefined?1:pricepackage[indx].value}
                            onChange={(e) => onChangePackage(indx, "value", e)}
                            placeholder="Value"
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
              }):
              Array.from(Array(monthoptions).keys()).map((num, indx) => {
                  return (
                    <Grid
                      key={num}
                      style={{ width: "100%", marginTop: "15px" }}
                      className=" flex sp-bot"
                    >
                      <Grid
                        container
                        style={{ width: "100%" }}
                        className="flex"
                      >
                        <Grid
                          className="flex al-center jus-start"
                          item={true}
                          md={5}
                        >
                          <TextField
                            label="Monthy"
                            defaultValue={1}
                            onChange={(e) => onChangePackage(indx, "title", e)}
                          ></TextField>
                        </Grid>
                        <Grid
                          className="flex al-center jus-center"
                          item={true}
                          md={6}
                        >
                          <TextField
                            label="value"
                            defaultValue={0}
                            onChange={(e) => onChangePackage(indx, "value", e)}
                            placeholder="Value"
                          ></TextField>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })
              
            }

           
          </Grid>
        </Grid>
      );
    }
    if (category == "DVND") {
      return (
        <Grid
          container
          display={"flex"}
        
          rowSpacing={1}
          flexDirection={"column"}
          style={{ width: "100%" }}
        >
          <Grid item={true} className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              defaultValue={monthoptions.length}
            >
              {Array.from(Array(5).keys()).map((num) => {
                return <Option key={num} value={num}></Option>;
              })}
            </Select>

            <Grid>
              {

                monthoptions!=undefined ? 

                     
                
                Array.from(Array(monthoptions.length).keys()).map((num, indx) => {

                     return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={monthoptions[indx].title }
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={ monthoptions[indx].value}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                
                
                
                
                
                : 

                
                Array.from(Array(monthoptions).keys()).map((num, indx) => {

                  

                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                
                
                
                
          

              }
            
            </Grid>
          </Grid>

          <Grid item={true} className="color">
            <h5>Color options</h5>
            <Select
              onChange={onChangeColoroptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={coloropt}
            >
              {Array.from(Array(5).keys()).map((num) => {
                return <Option key={num} value={num}></Option>;
              })}
            </Select>

            <Grid>

              {
                voucher!=undefined?

                Array.from(Array(coloropt).keys()).map((num, indx) => {
                  let color = voucher.price_options.color
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="color"
                              defaultValue={color[indx]?.title==undefined?"White":color[indx].title}
                              onChange={(e) => onChangeColor(indx, "title", e)}
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={color[indx]?.value==undefined?0:color[indx].value}
                              onChange={(e) => onChangeColor(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
                :

                Array.from(Array(coloropt).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="color"
                              defaultValue={"White"}
                              onChange={(e) => onChangeColor(indx, "title", e)}
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={0}
                              onChange={(e) => onChangeColor(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
              }

              
            </Grid>
          </Grid>
          <Grid item={true} className="room">
            <h5>Room options</h5>
            <Select
              onChange={onChangeRoomoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={roomopt}
            >
              {Array.from(Array(5).keys()).map((num) => {
                return <Option key={num} value={num}></Option>;
              })}
            </Select>

            <Grid>
              { 
              
                voucher!=undefined?
               
                Array.from(Array(roomopt).keys()).map((num, indx) => {
                                       let room = voucher.price_options.room

                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="Room"
                              defaultValue={room[indx]?.title==undefined?1:room[indx].title}
                              onChange={(e) => onChangeRoom(indx, "title", e)}
                              placeholder="Room"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={room[indx]?.value==undefined?0:room[indx].value}
                              onChange={(e) => onChangeRoom(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
              : 
              
              
                Array.from(Array(roomopt).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid className="flex jus-start" item={true} md={5}>
                            <TextField
                              label="Room"
                              defaultValue={1}
                              onChange={(e) => onChangeRoom(indx, "title", e)}
                              placeholder="Room"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="percent %"
                              defaultValue={0}
                              onChange={(e) => onChangeRoom(indx, "value", e)}
                              placeholder="Value"
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
              }
          </Grid>
        </Grid>
      </Grid>)
    }

    if (category == "DVLK") {
      return (
        <Grid
          style={{ width: "100%" }}
          container
          rowSpacing={1}
          display="flex"
          flexDirection={"column"}
        >
          <Grid item={true} className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={monthoptions}
            >
              {Array.from(Array(5).keys()).map((num) => {
                return <Option key={num} value={num}></Option>;
              })}
            </Select>

            <Grid>
              {

                voucher!=undefined?
                 voucher.price_options.lineofcredit.map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={num.title}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={num.value}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })

                :
                Array.from(Array(monthoptions).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Duration"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })
              }
               
                
            </Grid>
          </Grid>
         
        </Grid>
      );
    }

    if (category == "DVG") {
      return (
        <Grid style={{ width: "100%" }}>
          <Grid className="duration">
            <h5>Duration options</h5>
            <Select
              onChange={onChangeMonthoptions}
              style={{ width: "100%" }}
              placeholder="How many options"
              value={monthoptions}
            >
              {Array.from(Array(5).keys()).map((num) => {
                return <Option key={num} value={num}></Option>;
              })}
            </Select>

            <Grid>
              {
                voucher!=undefined?
                voucher.price_options.duration.map((num, indx) => {
                    return (
                      <Grid
                        key={num.title}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Duration/month"
                              defaultValue={num.title}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={num.value}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }):Array.from(Array(monthoptions).keys()).map((num, indx) => {
                    return (
                      <Grid
                        key={num}
                        style={{ width: "100%", marginTop: "15px" }}
                        className=" flex sp-bot"
                      >
                        <Grid
                          container
                          style={{ width: "100%" }}
                          className="flex"
                        >
                          <Grid
                            className="flex al-center jus-start"
                            item={true}
                            md={5}
                          >
                            <TextField
                              label="Monthy"
                              defaultValue={1}
                              onChange={(e) =>
                                onChangePackage(indx, "title", e)
                              }
                              placeholder="Duration"
                            ></TextField>
                          </Grid>
                          <Grid className="flex jus-center" item={true} md={6}>
                            <TextField
                              label="price VND"
                              defaultValue={0}
                              onChange={(e) =>
                                onChangePackage(indx, "value", e)
                              }
                            ></TextField>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })

              }
            </Grid>
          </Grid>
        </Grid>
      );
    }
  };

  const onChangeCategory = (value) => {
 
    setCategory(value);
    console.log(value)
    
   

  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);

      // console.log(e.target.files[0]);
    }
  };

  //render
 
  return (
    <Grid className="Box-container">
      {categorys != undefined ? (
        <Grid className=" Add-voucher">
          <Grid container>
            <Grid item={true} xs={6}>
              <Grid
                container
                direction="column"
                columns={{ xs: 4, md: 6, sm: 2 }}
                rowSpacing={2}
              >

               {
                voucher!=undefined?
                <Grid onClick={()=>prop.backtoList()} style={{width:"150px",color:"blue",cursor:"pointer"}} justifyContent="center" display="flex"   alignItems={"center"}>
                  <LeftOutlined> </LeftOutlined>
                   BACK TO LIST
                </Grid> : null

               }

                <Grid item={true}>
                  <h5>Category</h5>
                  <Grid item={true} xs={5}>
                    <Select

                       value={category}
                       placeholder="Inserted are removed"
                      onChange={onChangeCategory}
                      style={{ width: "100%" }}
                    > 
                    {

                      voucher!=undefined ?
                      
                    categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == false && locations.includes(item._id)==true )

                           return (
                            <Select.Option key={item.key} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })
                      
                      :  
                         categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == false 
                        
                        )
                           return (
                            <Select.Option key={item.key} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })
                    }


                     
                    </Select>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  <h5>Title</h5>
                  <Grid item={true} xs={5}>
                    {" "}
                    <Input value={title} onChange={onChangeTitle}></Input>
                  </Grid>
                </Grid>
                       <Grid item={true}>
                  <h5>Status</h5>
                  <Grid item={true} xs={5}>
                    {" "}
                    <Input value={status} onChange={onChangeStatus}></Input>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  <h5>TAGS</h5>
                  <Grid item={true} xs={5}>
                    {" "}
                    <Select
                      mode="multiple"
                      placeholder="Inserted are removed"
                      value={locations}
                      onChange={setLocations}
                      style={{
                        width: "100%",
                      }}
                    > 
                      
                      {
                        voucher!=undefined?
                         categorys.map((item, indx) => {
                        if (locations.includes(item) )
                          return (
                            <Select.Option key={item._id} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })

                        :

                        categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == true)
                          return (
                            <Select.Option key={item._id} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })

                      }

                      {categorys.map((item, indx) => {
                        if (item.key.includes("Lo") == true)
                          return (
                            <Select.Option key={item._id} value={item._id}>
                              {item.title}
                            </Select.Option>
                          );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid item={true}>
                  <h5>Demo image</h5>
                  <Grid item={true} xs={5}>
                    {

                      voucher!=undefined?

                       <img
                      src={
                        voucher.img_url
                      }
                      style={{ width: "100%", height: "400px" }}
                    ></img> : <img
                      src={
                        image != undefined
                          ? URL.createObjectURL(image)
                          : "error"
                      }
                      style={{ width: "100%", height: "400px" }}
                    ></img>

                    }
                   
                  </Grid>

                  <Grid item={true}>
                    {" "}
                    <input
                      onChange={(e) => imageChange(e)}
                      type="file"
                      accept="image/*"
                      id="contained-button-file"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item={true} xs={6}>
              <Grid
                container
                direction="column"
                columns={{ xs: 4, md: 6, sm: 2 }}
                rowSpacing={2}
                justifyContent="center"
              >
                <Grid className="Price-options" item={true}>
                  {
                    category!=undefined? Displayoptions():null
                  }
                
                </Grid>

                <Grid item={true} display="flex"  >
                      
 
                      <Grid> {

                    voucher!=undefined?  <Grid   >
                    {onOk==false ?  <button  onClick={onUpdate}  className="update-btn">
                      UPDATE
                  </button> :  <Lottie   options={defaultOptions} height={150}     width={150}/>} 
                      
                      
                       </Grid>  :     <button onClick={onClickAdd} className="create-btn">
                    CREATE VOUCHER
                  </button>



                  }</Grid>
                 

             


                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Addproduct;
