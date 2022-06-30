import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';
import counterReducer from './reducers/counterReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    category: categoryReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
