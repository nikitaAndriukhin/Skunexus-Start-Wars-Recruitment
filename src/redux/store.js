import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';
import logger from 'redux-logger'

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
  });
}