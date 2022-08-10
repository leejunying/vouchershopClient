import React, { useState } from "react";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import axios from "axios";
import "./style.css";
import { Grid } from "@mui/material";
import { Request_Admin } from "../../../../API/api";
import successAnimation from "../../Products/effectbtn/successbtn.json";
import Lottie from "react-lottie";
import { useSelector } from "react-redux";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Editor = (props) => {
  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  //for voucher detail post
  const [post, setPost] = useState("");
  const [success, setSuccess] = useState(false);
  const { content, title, categoryid, postid, img_url } = props || "";
  //for post

  useEffect(() => {
    if (!!content) {
      setPost(content);
    }
  }, []);

  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} },
  });

  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    body.set("key", "821358b6cb84839ab5031d22a6594bdd");
    body.append("image", file);
    body.append("name", file);
    // body.append('expi ration',`${cleartime}`)

    const res = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });

    insertToEditor(res.data.data.display_url);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      saveToServer(file);
    };
  };

  React.useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill]);

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  const onClickUpdate = async () => {
    let file = await fetch(img_url).then((r) => r.blob());
    console.log(file);
    const body = new FormData();
    body.set("key", "821358b6cb84839ab5031d22a6594bdd");
    body.append("image", file);
    body.append("name", file?.name);
    // body.append('expi ration',`${cleartime}`)
    const res = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });
    let putobject = {
      _id: postid,
      author: info_Admin.firstname + " " + info_Admin.lastname,
      img_url: "",
      categoryid: categoryid,
      title: title,
      content: quill.root.innerHTML,
    };
    putobject.img_url = res.data.data.display_url;
    console.log(putobject);
    await axios
      .put(Request_Admin.putPost, putobject, {
        headers: {
          Authorization: `Basic ${info_Admin.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, [2000]);
        }
      });
  };

  const onClickAdd = async () => {
    let file = await fetch(img_url).then((r) => r.blob());
    const body = new FormData();
    body.set("key", "821358b6cb84839ab5031d22a6594bdd");
    body.append("image", file);
    body.append("name", "demopost");
    // body.append('expi ration',`${cleartime}`)
    const res = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });

    let postobject = {
      author: info_Admin.firstname + " " + info_Admin.lastname,
      img_url: "",
      categoryid: categoryid,
      title: title,
      content: quill.root.innerHTML,
    };
    postobject.img_url = res.data.data.display_url;

    await axios
      .post(Request_Admin.postPost, postobject, {
        headers: {
          Authorization: `Basic ${info_Admin.accessToken}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            quill?.setContents([]);
            props.clearTitle();
          }, [2000]);
        }
      });
  };

  const displayBtn = () => {
    if (content.length == 0) {
      return !!success ? (
        <Lottie options={defaultOptions} height={150} width={150} />
      ) : (
        <button onClick={onClickAdd} className="create-btn">
          ADD POST
        </button>
      );
    } else {
      return (
        <Grid container display={"flex"}>
          <Grid item={true}>
            {!!success ? (
              <Lottie options={defaultOptions} height={150} width={150} />
            ) : (
              <button onClick={onClickUpdate} className="update-btn">
                UPDATE POST
              </button>
            )}
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Grid className="wrapper">
      <Grid className="content">
        <div ref={quillRef} />
      </Grid>
      <Grid>{displayBtn()}</Grid>
    </Grid>
  );
};

export default Editor;
