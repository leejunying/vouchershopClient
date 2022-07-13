import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "accountReducer",
  initialState: {
    Admin: {},

    Client: {},
  },
  reducers: {
    adminLogin: (state, action) => {
      state.Admin = action.payload;
    },
    clientLogin: (state, action) => {
      console.log(action.payload);

      state.Client = action.payload;
    },

    clientLogOut: (state, action) => {
      state.Client = {};
    },

    changeAdminDisplay: (state, action) => {
      state.Admin = { ...action.payload };
    },
    changeClientDisplay: (state, action) => {
      state.Client = { ...action.payload };
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
