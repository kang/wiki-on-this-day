import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import otdNewsReducer from '../features/onThisDay/otdSlice';

export const store = configureStore({
  reducer: {
    otdNews: otdNewsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
