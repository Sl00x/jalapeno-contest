import { configureStore } from "@reduxjs/toolkit";
import { contestApi } from "../api/contest-api";
import { rootApi } from "../api/root-api";
import { authApi } from "../api/auth-api";

export const RootStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(rootApi.middleware)
      .concat(contestApi.middleware)
      .concat(authApi.middleware),
});

export type StoreDispatch = typeof RootStore.dispatch;
export type RootState = ReturnType<typeof RootStore.getState>;
