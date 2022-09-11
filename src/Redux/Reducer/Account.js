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

    updatenewpaymentClient: (state, action) => {
      state.Client.paymentid = action.payload;
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
    clientLogOut: (state) => {
      state.Client = {};
    },
  },
});

//Action
export const {
  adminLogin,
  clientLogin,
  clientLogOut,
  updateClient,
  updatepaymentClient,
  updatenewpaymentClient,
} = accountSlice.actions;

export default accountSlice.reducer;
