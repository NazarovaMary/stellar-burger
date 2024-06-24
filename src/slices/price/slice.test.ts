import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import orderReducer from './slice';
import { getOrderByNumber } from './activity';

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

describe('тестирует getOrderByNumber', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('обрабатывае успешный запрос', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(new Promise(() => {}));
    store.dispatch(getOrderByNumber(1) as any);

    const state = store.getState();
    expect(state.order.loading).toBe(true);
  });

  test('обрабатывает состояние fulfilled для getOrderByNumber', async () => {
    const mockData = { orders: [{ id: '1', items: [] }] };
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockData);
    await store.dispatch(getOrderByNumber(1) as any);

    const state = store.getState();
    expect(state.order.orderData).toEqual(mockData.orders[0]);
    expect(state.order.loading).toBe(false);
  });

  test('обрабатывает ошибку', async () => {
    const error = 'Network error';
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(error);
    await store.dispatch(getOrderByNumber(1) as any);
    const state = store.getState();
    expect(state.order.error).toEqual(
      expect.objectContaining({ message: error })
    );
    expect(state.order.loading).toBe(false);
  });
});
