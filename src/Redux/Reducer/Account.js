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
      state.Client = action.payload;
    },

    updatepaymentClient: (state, action) => {
      let oldlist = state.Client.paymentid;

      console.log(action.payload);

      oldlist.push(action.payload);

      state.Client.paymentid = oldlist;
    },

    updateClient: (state, action) => {
      const { phone, email, address, firstname, lastname, avatar } =
        action.payload;
      console.log(action.payload);

      state.Client.phone = phone;
      state.Client.email = email;
      state.Client.firstname = firstname;
      state.Client.lastname = lastname;
      state.Client.address = address;
      state.Client.avatar = avatar;
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
  updateClient,
  updatepaymentClient,
} = accountSlice.actions;

export default accountSlice.reducer;
