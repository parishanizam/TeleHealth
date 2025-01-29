import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import parentReducer from './parentSlice';
import deviceReducer from './deviceSlice';

const rootReducer = combineReducers({
  parent: parentReducer,
  device: deviceReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['parent','device'], 
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,

  // IMPORTANT: Ignore certain redux-persist actions in serializableCheck
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
