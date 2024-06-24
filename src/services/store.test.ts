import store, { rootReducer } from './store';

describe('тестирует корневой редьюсер', () => {
  test('тест возвращает начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(store.getState());
  });
});
