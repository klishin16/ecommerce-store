import { createSlice } from "@reduxjs/toolkit";

interface ITaskState {
  isModalOpen: boolean;
};

const initialState: ITaskState = {
  isModalOpen: false
};

const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isModalOpen = true;
    },
    hideModal: (state) => {
      state.isModalOpen = false;
    }
  },
});

export const taskReducer = task.reducer;

export const taskActions = {
  ...task.actions
}
