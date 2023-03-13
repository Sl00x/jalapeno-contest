import { configureStore } from "@reduxjs/toolkit";
import { contestApi } from "../api/contest.api";
import { rootApi } from "../api/root-api";

export const RootStore = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    [contestApi.reducerPath]: contestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(rootApi.middleware)
      .concat(contestApi.middleware),
});

export type StoreDispatch = typeof RootStore.dispatch;
export type RootState = ReturnType<typeof RootStore.getState>;
