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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as LInk, Redirect } from "react-router-dom";
import MuiPhoneNumber from "material-ui-phone-number";
import { Request_User } from "../../../API/api";
import axios from "axios";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Voucher hunter.inc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [islogin, setIslogin] = React.useState(false);
  const [errorstring, setErrorstring] = React.useState({
    username: "",
    email: "",
    phone: "",
  });

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập")
      .max(20, "Tên đăng nhập có từ 6-20 kí tự!")
      .min(6, "Tên đăng nhập có từ 6-20 kí tự!"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu có từ 6-20 kí tự!")
      .max(20, "Mật khẩu có từ 6-20 kí tự!"),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
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
        "Số điện thoại không hợp lệ!",
      ),
  });
  const onSubmit = (data) => {
    if (data) {
      delete data.confirmPassword;

      axios
        .post(Request_User.register, data)
        .then((res) => {
          if (res.status == 200) {
            setIslogin(true);
          }
        })
        .catch((err) => {
          console.log(err);

          let title = err?.response.data.title;
          let mes = err?.response.data.message;

          if (title == "username")
            setErrorstring({ ...errorstring, username: mes });
          if (title == "phone") setErrorstring({ ...errorstring, phone: mes });
          if (title == "email")
            setErrorstring({
              ...errorstring,
              email: mes,
            });
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

  return (
    <ThemeProvider theme={theme}>
      <Redirect to={islogin == true ? "/login" : "/register"}></Redirect>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Tên đăng nhập"
                  name="username"
                  autoComplete="username"
                  {...register("username")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={
                    errorstring.username != ""
                      ? errorstring.username
                      : errors.username?.message
                  }
                />
              </Grid>
              <Grid item={true} className="flex" xs={12}>
                <Grid item={true} xs={4}>
                  {" "}
                  <TextField
                    required
                    fullWidth
                    id="firstname"
                    label="First name"
                    name="firstname"
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
                    FormHelperTextProps={{ style: { color: "red" } }}
                    helperText={errors.lastname?.message}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  {...register("password")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={errors.confirmPassword?.message}
                />
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
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={
                    errorstring.phone != ""
                      ? errorstring.phone
                      : errors.phone?.message
                  }
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
              Đăng ký
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <LInk to="/login">Đã có tài khoản? Đăng nhập!</LInk>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
