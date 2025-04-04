import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, StoreDispatch } from "../store/root-store";

export const useStoreDispatch = () => useDispatch<StoreDispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
