import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Autocomplete } from "@mui/material";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Request_User } from "../../../API/api";
import axios from "axios";
import "./AddUser.css";
import { InputLabel } from "@mui/material";
import { Request_Admin } from "../../../API/api";
import { useSelector } from "react-redux";
const theme = createTheme();

const AddUser = (props) => {
  const [existUserName, setUserName] = React.useState(props || {});

  const info_Admin = useSelector((state) => state["account"]["Admin"]);

  const [errorstring, setErrorstring] = React.useState({
    username: "",
    email: "",
    phone: "",
  });

  const[role,setRole] = React.useState(undefined);

  

  const options = [
    { name: "Người dùng", value: false },
    { name: "Quản trị viên", value: true }
  ]

  const userName = existUserName;

  
 
  console.log("username:", userName);
  const schema = yup.object().shape({
    username: yup
      .string()
      .max(20, "Tên đăng nhập có từ 6-20 kí tự!")
      .min(6, "Tên đăng nhập có từ 6-20 kí tự!"),

    password: yup
      .string()
      .min(8, "Mật khẩu có từ 6-20 kí tự!")
      .max(20, "Mật khẩu có từ 6-20 kí tự!"),

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

    phone: yup
      .string()
      .required("Vui lòng nhập SDT")
      .max(11, "maxium phone number is 11")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Số điện thoại không hợp lệ!"
      ),
  });
  const onSubmit = (data) => {
    console.log(data)
    if (userName.existUserName === undefined) {
      if (data) {
        axios
          .post(Request_User.register, data, {
            headers: { Authorization: `Basic ${info_Admin.accessToken}` },
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Thành công!!!");
            }
          })
          .catch((err) => {
            console.log(err);

            let title = err?.response.data.title;
            let mes = err?.response.data.message;

            if (title === "username")
              setErrorstring({ ...errorstring, username: mes });
            if (title === "phone")
              setErrorstring({ ...errorstring, phone: mes });
            if (title === "email")
              setErrorstring({
                ...errorstring,
                email: mes,
              });
          });
      } else {
        console.log(errors);
      }
    }
    if (userName.existUserName !== undefined) {
      const data2 = {
        _id: userName.existUserName._id,
        username: userName.existUserName.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        isAdmin: role,
      };
      axios
        .put(Request_Admin.putUpdateUser, data2, {
          headers: { Authorization: `Basic ${info_Admin.accessToken}` },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Thành công!");
          }
        })
        .catch((err) => {
          console.log(err);

          let title = err?.response.data.title;
          let mes = err?.response.data.message;

          if (title === "username")
            setErrorstring({ ...errorstring, username: mes });
          if (title === "phone") setErrorstring({ ...errorstring, phone: mes });
          if (title === "email")
            setErrorstring({
              ...errorstring,
              email: mes,
            });
        });
    }
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {userName.existUserName === undefined ? (
                <Grid item xs={12}>
                  <InputLabel className="InputLabel" htmlFor="username">
                    Tên đang nhập:
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    {...register("username")}
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={
                      errorstring.username !== ""
                        ? errorstring.username
                        : errors.username?.message
                    }
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <InputLabel className="InputLabel" htmlFor="username">
                    Tên đang nhập:
                  </InputLabel>
                  <TextField
                    required="false"
                    fullWidth
                    name="username"
                    autoComplete="username"
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={
                      errorstring.username !== ""
                        ? errorstring.username
                        : errors.username?.message
                    }
                    value={userName.existUserName.username}
                    disabled
                  />
                </Grid>
              )}
              <Grid item={true} className="flex" xs={12}>
                <Grid item={true} xs={4} mr={1}>
                  <InputLabel className="InputLabel" htmlFor="firstname">
                    Họ
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="firstname"
                    autoComplete="firstname"
                    {...register("firstname")}
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={errors.firstname?.message}
                    defaultValue={
                      userName.existUserName !== undefined
                        ? userName.existUserName.firstname
                        : ""
                    }
                  />
                </Grid>
                <Grid item={true} xs={8}>
                  <InputLabel className="InputLabel" htmlFor="lastname">
                    Tên
                  </InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    name="lastname"
                    autoComplete="lastname"
                    {...register("lastname")}
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={errors.lastname?.message}
                    defaultValue={
                      userName.existUserName !== undefined
                        ? userName.existUserName.lastname
                        : ""
                    }
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="InputLabel" htmlFor="password">
                  Mật khẩu
                </InputLabel>
                <TextField
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  {...(userName.existUserName === undefined
                    ? { ...register("password") }
                    : {})}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="InputLabel" htmlFor="email">
                  Email
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  name="email"
                  type="email"
                  id="email"
                  {...register("email")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={
                    errorstring.email !== ""
                      ? errorstring.email
                      : errors.email?.message
                  }
                  defaultValue={
                    userName.existUserName !== undefined
                      ? userName.existUserName.email
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel className="InputLabel" htmlFor="email">
                  Số điện thoại
                </InputLabel>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  type="string"
                  id="phone"
                  {...register("phone")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={
                    errorstring.phone !== ""
                      ? errorstring.phone
                      : errors.phone?.message
                  }
                  defaultValue={
                    userName.existUserName !== undefined
                      ? userName.existUserName.phone
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="isAdmin"
                  options={options}
                  getOptionLabel={(options) => options.name}
                  renderInput={(params) => (
                    <TextField 
                    {...params} 
                    label="Vai trò" 
                    />
                  )}
                  onChange = {(event : any,value) => {setRole(value.value);} }
                />
              </Grid>
            </Grid>

            <Grid item xs={12}></Grid>
            {userName.existUserName === undefined ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Thêm tài khoản!
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cập nhật!
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default AddUser;
