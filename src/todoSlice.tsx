import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
