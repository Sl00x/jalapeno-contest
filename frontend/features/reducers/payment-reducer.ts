import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PaymentState = {
  amount: string;
};

const initialState: PaymentState | undefined = {
  amount: "",
};

const paymentSlice = createSlice({
  name: "PaymentSlice ",
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<{ amount: string }>) {
      state.amount = action.payload.amount;
    },
  },
});

export const { setAmount } = paymentSlice.actions;

export default paymentSlice.reducer;
