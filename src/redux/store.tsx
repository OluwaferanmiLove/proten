import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authSlice from './auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authApi} from './auth/authApi';
import {shipmentApi} from './shipment/shipmentApi';

const reducers = combineReducers({
  auth: authSlice,
  [authApi.reducerPath]: authApi.reducer,
  [shipmentApi.reducerPath]: shipmentApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  // blacklist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, shipmentApi.middleware);

    return middlewares;
  },
});

const persistor = persistStore(store);

export {store, persistor};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
