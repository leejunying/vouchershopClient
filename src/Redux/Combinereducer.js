import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "./Reducer/Account";
import cartReducer from "./Reducer/Cart";

export default combineReducers({ accountReducer, cartReducer });
