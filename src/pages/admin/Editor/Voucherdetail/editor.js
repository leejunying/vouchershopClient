import React, { useState } from "react";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";
import "quill/dist/quill.snow.css";
import axios from "axios";
import "./styles.css";
import { Grid } from "@mui/material";
import "../../Products/Addnew.css";
import { Request_Admin, Request_User } from "../../../../API/api";
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
  const { voucherId, type } = props || null;
  const [detailpost, setDetailpost] = useState([]);
  const [postid, setPostid] = useState("");
  const [post, setPost] = useState("");
  const [success, setSuccess] = useState(false);
  //for post
  const Loadingpost = () => {
    if (voucherId != null) {
      axios
        .get(Request_Admin.getDetailpostByVoucherid(voucherId))
        .then((res) => {
          if (res.status == 200) setDetailpost(res.data);
          filterPostandsetPost(res.data, type);
        });
    }
  };

  const filterPostandsetPost = (array, key) => {
    let found = array.filter((item) => {
      return item.type == key;
    })[0];
    let id = found?._id;
    let post = found?.content;
    if (id) setPostid(found._id);

    if (post) setPost(post);
  };

  const displayPost = () => {
    if (post.length == 0) quill?.clipboard.dangerouslyPasteHTML("");
    else quill?.clipboard.dangerouslyPasteHTML(post);
  };

  useEffect(() => {
    Loadingpost();
  }, []);

  useEffect(() => {
    if (success == true) {
      filterPostandsetPost(detailpost, type);
      displayPost();
    }
  }, [success]);

  useEffect(() => {
    displayPost();
  }, [post]);

  useEffect(() => {
    filterPostandsetPost(detailpost, type);
    displayPost();
  }, [type]);

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
    }
  }, [quill]);

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register("modules/blotFormatter", BlotFormatter);
  }

  const onClickUpdate = () => {
    let content = quill.root.innerHTML;
    let objput = {
      id: postid,
      type: type,
      content: content,
    };
    axios
      .put(Request_Admin.putDetailpost, objput, {
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

  const onClickAdd = () => {
    let content = quill.root.innerHTML;

    let objpost = {
      voucherid: voucherId,
      type: type,
      content: content,
    };

    axios
      .put(Request_Admin.postDetailpost, objpost, {
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

  const displayBtn = () => {
    const findpost =
      detailpost.filter((item) => {
        return item.type == type;
      }) || null;
    if (findpost.length == 0) {
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
