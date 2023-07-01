import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {}
);

export const appSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },

  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = appSlice.actions;

export const selectCount = (state) => state.counter.value;

export default appSlice.reducer;
