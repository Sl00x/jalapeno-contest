import { configureStore } from "@reduxjs/toolkit";
import { rootApi } from "../api/root-api";
import paymentReducer from "../reducers/payment-reducer";

export const RootStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    payment: paymentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      rootApi.middleware
    ),
});

export type StoreDispatch = typeof RootStore.dispatch;
export type RootState = ReturnType<typeof RootStore.getState>;
