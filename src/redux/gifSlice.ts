import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Giphy } from '../types/giphy';
import { RootState } from './store';

// Define a type of the slice state
interface GifState {
  value: Giphy[];
  searchText: string;
}

const initialState: GifState = {
  value: [],
  searchText: ''
};

export const gifSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    updateList: (state, action: PayloadAction<Giphy[]>) => {
      state.value = [...state.value, ...action.payload];
    },
    refreshList: (state, action: PayloadAction<Giphy[]>) => {
      state.value = [];
      state.value = [...action.payload];
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    }
  }
});

export const { setSearchText, updateList, refreshList } = gifSlice.actions;

export const selectGif = (state: RootState) => state.gifs.value;

export default gifSlice.reducer;
