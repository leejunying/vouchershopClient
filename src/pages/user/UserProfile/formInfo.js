import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Request_User } from "../../../API/api";
import { useSelector } from "react-redux";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateClient } from "../../../Redux/Reducer/Account";
import { Spin } from "antd";
const theme = createTheme();

export default function FormInfo() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state["account"]["Client"]);
  const [open, setOpen] = React.useState(false);
  const [avatar, setAvatar] = React.useState();
  const [result, setResult] = React.useState({});
  const [isChangeimg, setIsChangeimg] = React.useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [errorstring, setErrorstring] = React.useState({
    email: "",
    phone: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (info.avatar.length == 0) {
      setAvatar("https://www.w3schools.com/howto/img_avatar2.png");
    } else setAvatar(info.avatar);
  }, []);

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      {
        setIsChangeimg(true);
        setAvatar(URL.createObjectURL(e.target.files[0]));
      }

      // console.log(e.target.files[0]);
    }
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Vui lòng nhập vào email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"),
    firstname: yup
      .string()
      .required("Vui lòng nhập họ ")
      .min(2, "Họ có từ 2-20 kí tự!")
      .max(20, "Họ có từ 2-20 kí tự!"),
    lastname: yup
      .string()
      .required("Vui lòng nhập tên ")
      .min(2, "Tên có từ 2-50 kí tự!")
      .max(50, "Tên có từ 2-50 kí tự!"),
    address: yup.string().required("Vui lòng nhập địa chỉ  "),

    phone: yup
      .string()
      .required("Vui lòng nhập SDT")
      .max(11, "maxium phone number is 11")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Số điện thoại không hợp lệ!",
      ),
  });
  const onSubmit = async (data) => {
    setIsloading(true);

    if (data) {
      data.id = info._id;
      delete data.confirmPassword;
      if (!!isChangeimg) {
        let file = (await fetch(avatar).then((r) => r.blob())) || undefined;
        const body = new FormData();
        body.set("key", "821358b6cb84839ab5031d22a6594bdd");
        body.append("image", file);
        body.append("name", "avatar");
        // body.append('expi ration',`${cleartime}`)
        const res = await axios({
          method: "post",
          url: "https://api.imgbb.com/1/upload",
          data: body,
        });

        data.avatar = res.data.data.display_url;
      } else data.avatar = avatar;

      await axios
        .put(Request_User.putInfo, data, {
          headers: {
            Authorization: `Basic ${info.accessToken}`,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            setIsloading(false);
            setResult("update successfully");
            dispatch(
              updateClient({
                phone: data.phone,
                avatar: data.avatar,
                lastname: data.lastname,
                firstname: data.firstname,
                email: data.email,
                address: data.address,
              }),
            );
            setOpen(true);
          }
        })
        .catch((err) => {
          console.log(err);
          let phoneerr = err?.response.data.phone;
          let emailerr = err?.response.data.email;
          setErrorstring({ ...errorstring, phone: phoneerr, email: emailerr });
        });
    } else {
      console.log(errors);
    }
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (!!isloading)
    return (
      <Grid>
        <Spin></Spin>
      </Grid>
    );
  else
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box>
              <h5>AVATAR</h5>
              <Grid item={true}>
                <img
                  src={avatar}
                  style={{ width: "100%", height: "250px" }}
                ></img>
              </Grid>
              <Grid item={true}>
                <input
                  onChange={(e) => imageChange(e)}
                  type="file"
                  accept="image/*"
                  id="contained-button-file"
                />
              </Grid>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item={true} className="flex" xs={12}>
                  <Grid item={true} xs={4}>
                    {" "}
                    <TextField
                      required
                      fullWidth
                      id="firstname"
                      label="First name"
                      name="firstname"
                      defaultValue={info.firstname}
                      autoComplete="firstname"
                      {...register("firstname")}
                      FormHelperTextProps={{ style: { color: "red" } }}
                      helperText={errors.firstname?.message}
                    />
                  </Grid>
                  <Grid item={true} xs={8}>
                    <TextField
                      required
                      fullWidth
                      id="lastname"
                      label="Last name"
                      name="lastname"
                      autoComplete="lastname"
                      {...register("lastname")}
                      defaultValue={info.lastname}
                      FormHelperTextProps={{ style: { color: "red" } }}
                      helperText={errors.lastname?.message}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    id="email"
                    {...register("email")}
                    defaultValue={info.email}
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={
                      errorstring.email != ""
                        ? errorstring.email
                        : errors.email?.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="SDT"
                    type="string"
                    id="phone"
                    {...register("phone")}
                    defaultValue={info.phone}
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={
                      errorstring.phone != ""
                        ? errorstring.phone
                        : errors.phone?.message
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="address"
                    label="Address"
                    type="string"
                    id="phone"
                    {...register("address")}
                    defaultValue={info.address}
                    FormHelperTextProps={{ style: { color: "red" } }}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SAVE
              </Button>
            </Box>
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Information changed"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {result}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </ThemeProvider>
    );
}
