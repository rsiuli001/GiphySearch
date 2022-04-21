import { configureStore } from '@reduxjs/toolkit';
import GifReducer from './gifSlice'

export const store = configureStore({
  reducer: {
    gifs: GifReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
