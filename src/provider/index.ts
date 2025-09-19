import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "@/store/index";
import { authApi } from "@/store/auth-api";
import { jobApi } from "@/store/job-api";

import {machineListApi} from "@/store/machine-list/baseApi"

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userApi } from "@/store/user-api";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = { key: "root", storage, whitelist: ["global"] };

const rootReducer = combineReducers({
  global: globalReducer,
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
  [machineListApi.reducerPath]: machineListApi.reducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefault) =>
      getDefault({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(userApi.middleware)
        .concat(authApi.middleware)
        .concat(jobApi.middleware)
        .concat(machineListApi.middleware)
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
