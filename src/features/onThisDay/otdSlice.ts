import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { fetchOnThisDay } from './otdAPI';

interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export interface OnThisDayState {
  error: SerializedError | undefined;
  status: 'idle' | 'loading' | 'received' | 'failed';
  value: { pages: object[], text: string, year: number }[] | undefined;
}

export const initialState: OnThisDayState = {
  error: undefined,
  status: 'idle',
  value: undefined,
};

export const fetchOnThisDayNews = createAsyncThunk(
  'onThisDay/fetchOnThisDay',
  async () => {
    return await fetchOnThisDay();
  }
);

export const compareNewsByYear = (a: { year: number }, b: { year: number }) => a.year - b.year;

export const onThisDaySlice = createSlice({
  name: 'onThisDay',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnThisDayNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOnThisDayNews.fulfilled, (state, action) => {
        const sortedNews = [...action.payload.selected].sort(compareNewsByYear);

        state.status = 'received';
        state.value = sortedNews;
      })
      .addCase(fetchOnThisDayNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export const selectOnThisDay = (state: RootState) => state.otdNews;

export default onThisDaySlice.reducer;
