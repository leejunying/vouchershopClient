import React, { useState } from "react";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import BlotFormatter from "quill-blot-formatter";

import successAnimation from "../../Products/effectbtn/successbtn.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: successAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Editor = (props) => {
  //for voucher detail post
  const { policy, detail, type } = props || "";
  const { voucher } = props || {};
  const [post, setPost] = useState("");
  const [success, setSuccess] = useState(false);
  //for post

  const MountPost = () => {
    setPost(voucher.detailcontent);
  };

  const Loadingpost = () => {
    if (type == "detail") setPost(detail);
    if (type == "policy") setPost(policy);
  };

  const displayPost = () => {
    if (!!post) quill?.clipboard.dangerouslyPasteHTML(post);
    else quill?.clipboard.dangerouslyPasteHTML("");
  };

  useEffect(() => {
    MountPost();
  }, []);

  useEffect(() => {
    if (success == true) {
      displayPost();
    }
  }, [success]);

  useEffect(() => {
    Loadingpost();
    displayPost();
  }, [type]);

  useEffect(() => {
    console.log(post);
    displayPost();
  }, [post]);

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
    if (type == "detail") props.setDetail(content);
    if (type == "policy") props.setPolicy(content);
  };

  const displayBtn = () => {
    return (
      <Grid container display={"flex"}>
        <Grid item={true}>
          {!!success ? (
            <Lottie options={defaultOptions} height={150} width={150} />
          ) : (
            <button onClick={onClickUpdate} className="button-13">
              SAVE
            </button>
          )}
        </Grid>
      </Grid>
    );
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
