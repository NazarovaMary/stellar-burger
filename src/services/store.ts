import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerReducer from '../slices/burger/slice';
import ingredientsReducer from '../slices/ingredient/slice';
import orderReducer from '../slices/price/slice';
import userReducer from '../slices/client/slice';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
