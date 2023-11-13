'use client'
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth.slice"
import notificationsSlice from "@/redux/features/notifications.slice";
import { devicesReducer } from "@/redux/features/devices.slice";
import { basketReducer } from "@/redux/features/basket.slice";
import { settingsReducer } from "@/redux/features/settings.slice";
import { taskReducer } from "@/redux/features/task.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsSlice,
    devices: devicesReducer,
    basket: basketReducer,
    settings: settingsReducer,
    task: taskReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
