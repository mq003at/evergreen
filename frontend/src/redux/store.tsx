import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./reducers/BookReducer";
import { categoryReducer } from "./reducers/CategoryReducer";


export const store = configureStore({
  reducer: {
    categoryReducer,
    bookReducer,
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
