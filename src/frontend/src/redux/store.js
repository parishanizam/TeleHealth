import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import parentReducer from "./parentSlice";
import deviceReducer from "./deviceSlice";
import clinicianReducer from "./clinicianSlice";
import assessmentReducer from "./assessmentSlice";
import testSelectionReducer from "./testSelectionSlice";

const rootReducer = combineReducers({
  parent: parentReducer,
  device: deviceReducer,
  clinician: clinicianReducer,
  assessmentHistory: assessmentReducer,
  testSelection: testSelectionReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["parent", "device", "clinician","assessmentHistory","testSelection"],
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
