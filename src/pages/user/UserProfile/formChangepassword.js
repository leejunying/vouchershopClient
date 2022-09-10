import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Request_User } from "../../../API/api";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const theme = createTheme();

export default function FormChangepassword() {
  const info = useSelector((state) => state["account"]["Client"]);
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState("");
  const [errorstring, setErrorstring] = React.useState({
    oldPassword: "",
  });

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu có từ 6-20 kí tự!")
      .max(20, "Mật khẩu có từ 6-20 kí tự!"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu có từ 6-20 kí tự!")
      .max(20, "Mật khẩu có từ 6-20 kí tự!"),
    newConfirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")

      .oneOf([yup.ref("newPassword"), null], "Mật khẩu không khớp"),
  });
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    if (data) {
      console.log(data);
      delete data.newConfirmPassword;

      data.id = info._id;
      axios
        .put(Request_User.putPassword, data, {
          headers: {
            Authorization: `Basic ${info.accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            setResult("Update password successfully");
            setOpen(true);
            reset({ oldPassword: "", newPassword: "", newConfirmPassword: "" }); //in useForm
          }
          if (res.status == 401) {
            setErrorstring({ oldPassword: res.data });
            setResult("Update password error");
          }
        })
        .catch((err) => {});
    } else {
      console.log(errors);
    }
  };
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  {...register("oldPassword")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={
                    errorstring.oldPassword != ""
                      ? errorstring.oldPassword
                      : errors.oldPassword?.message
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={errors.newPassword?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newConfirmPassword"
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  id="newConfirmPassword"
                  {...register("newConfirmPassword")}
                  FormHelperTextProps={{ style: { color: "red" } }}
                  helperText={errors.newConfirmPassword?.message}
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
            {"Password changed"}
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
