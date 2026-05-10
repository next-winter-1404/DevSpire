import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  insertDate: null,
  exitDate: null,
  travelersCount: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action) => {
      state.exitDate = action.payload.exitDate;
      state.insertDate = action.payload.insertDate;
      state.travelersCount = action.payload.travelersCount;
    },
    updateBookingData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBookingData, updateBookingData } = bookingSlice.actions;

export default bookingSlice.reducer;
