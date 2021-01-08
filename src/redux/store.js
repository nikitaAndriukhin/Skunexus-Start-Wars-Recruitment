import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';

export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}