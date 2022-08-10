import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import Editor from ".././Editor/Post/editor";
import { Select } from "antd";
import axios from "axios";
import { Request_Admin } from "../../../API/api";
import { LeftOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { Option } = Select;
const { TextArea } = Input;
const Detailpost = (props) => {
  const { postdata } = props || {};
  const [content, setContent] = useState("");
  const [postid, setPostid] = useState("");
  const [tag, setTag] = useState("627fb6259d17090fa8f08a11");
  const [title, setTitle] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [image, setImage] = useState("");

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onChangeTag = (value) => {
    setTag(value);
  };

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const Loadlocation = () => {
    axios.get(Request_Admin.getcategory).then((res) => {
      if (res.status == 200) {
        let listlocations = res.data.filter((item) => {
          return item.key.includes("Lo") == true;
        });
        setCategorys(listlocations);
      }
    });
  };

  useEffect(() => {
    Loadlocation();
    if (!!postdata) {
      console.log("Loadafter table", postdata.content);
      setTag(postdata.categoryid._id);
      setTitle(postdata.title);
      setContent(postdata.content);
      setPostid(postdata._id);
      setImage(postdata.img_url);
    }
  }, []);

  //render
  return (
    <Grid
      container
      display="flex"
      flexDirection={"column"}
      className="Detail-post"
      rowSpacing={2}
    >
      {!!postdata ? (
        <Grid
          item={true}
          md={5}
          onClick={() => props.backtoList()}
          style={{ width: "150px", color: "blue", cursor: "pointer" }}
          display="flex"
          alignItems={"center"}
        >
          <LeftOutlined> </LeftOutlined>
          BACK TO LIST
        </Grid>
      ) : null}

      <Grid item={true} md={5}>
        <h5>Category</h5>
      </Grid>
      <Grid item={true} md={5}>
        <Select style={{ width: "100%" }} onChange={onChangeTag} value={tag}>
          {categorys.map((item) => {
            return (
              <Option key={item} value={item._id}>
                {item.title}
              </Option>
            );
          })}
        </Select>
      </Grid>
      <Grid item={true} md={5}>
        <h5>Display image</h5>
      </Grid>

      <Grid item={true} md={5}>
        {<img style={{ width: "100%", height: "400px" }} src={image}></img>}
      </Grid>
      <Grid item={true} md={5}>
        <input
          onChange={(e) => imageChange(e)}
          type="file"
          accept="image/*"
          id="contained-button-file"
        />
      </Grid>
      <Grid md={5} item={true}>
        <h5>Title</h5>
      </Grid>
      <Grid md={5} item={true}>
        {" "}
        <TextArea
          rows={4}
          placeholder="Title"
          value={title}
          onChange={handleChangeTitle}
        />
      </Grid>

      <Grid item={true}>
        <Editor
          content={content}
          postid={postid}
          img_url={image}
          categoryid={tag}
          title={title}
          clearTitle={() => setTitle("")}
        ></Editor>
      </Grid>
    </Grid>
  );
};

export default Detailpost;
