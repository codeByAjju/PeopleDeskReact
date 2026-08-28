import { combineReducers } from "redux";
import { authSlice } from ".";
import storage from "../storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const RootReducer = combineReducers({
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  RootReducer
);

const middlewares = [
  createStateSyncMiddleware({
    blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
  }),
];

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
    ...middlewares,
  ],
});

initStateWithPrevTab(store);

export default store;

export const Persistor = persistStore(store);