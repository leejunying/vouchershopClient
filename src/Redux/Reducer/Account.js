import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "accountReducer",
  initialState: {
    clientToken: "",
    adminToken: "",
    clientDisplay: {
      name: "",
      avatar: "",
      birthday: "",
      delivery: {},
    },
    adminDisplay: {
      name: "",
      avatar: "",
      birthday: "",
    },
  },
  reducers: {
    adminLogin: (state, action) => {
      state.adminToken = action.payload;
    },
    clientLogin: (state, action) => {
      state.clientToken = action.payload;
    },
    changeAdminDisplay: (state, action) => {
      state.adminDisplay = { ...action.payload };
    },
    changeClientDisplay: (state, action) => {
      state.clientDisplay = { ...action.payload };
    },
  },
});

//Action
export const {
  adminLogin,
  clientLogin,
  changeAdminDisplay,
  changeClientDisplay,
} = accountSlice.actions;

export default accountSlice.reducer;
