import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootApi } from "../api/root-api";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: true,
});

export const RootStore = configureStore({
    reducer: {
        [rootApi.reducerPath]: rootApi.reducer
        //userReducer: user.reducer,
        //[userApi.reducerPath]: userApi.reducer
    },
    middleware: customizedMiddleware,
});

export type StoreDispatch = typeof RootStore.dispatch;
export type RootState = ReturnType<typeof RootStore.getState>;
