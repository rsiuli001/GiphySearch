import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { updateList } from '../gifSlice';

const giphyApi = async (searchText: string, dispatch: Dispatch) => {
  try {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq&q=${searchText}&limit=${20}`
    );
    dispatch(updateList(response.data.data));
  } catch (err) {
    console.log('debug: err: ', err);
  }
};

export { giphyApi };
