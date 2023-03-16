import { configureStore } from "@reduxjs/toolkit";
import { contestApi } from "../api/contest-api";
import { rootApi } from "../api/root-api";
import { authApi } from "../api/auth-api";
import { userApi } from "../api/user-api";
import paymentReducer from "../reducers/payment-reducer";

export const RootStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(rootApi.middleware)
      .concat(contestApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware),
});

export type StoreDispatch = typeof RootStore.dispatch;
export type RootState = ReturnType<typeof RootStore.getState>;
