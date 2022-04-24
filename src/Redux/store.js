import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Reducer/Account";
import cartReducer from "./Reducer/Cart";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedAccount = persistReducer(persistConfig, accountReducer);
const persistCart = persistReducer(persistConfig, cartReducer);
const store = configureStore({
  reducer: { account: persistedAccount, cart: persistCart },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
