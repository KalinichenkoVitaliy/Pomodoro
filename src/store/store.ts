import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import persistStorage from 'redux-persist/lib/storage';

import usersReducer from './usersSlice';
import timerReducer from './timerSlice';
import statsReducer from './statsSlice';
import eventsReducer from './eventsSlice';

const rootReducer = combineReducers({
  usersState: usersReducer,
  timerState: timerReducer,
  statsState: statsReducer,
  eventsState: eventsReducer,
});

const persistConfig = {
  key: 'root',
  storage: persistStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;

export const persistor = persistStore(store);
