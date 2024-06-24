import burgerReducer, {
    addIngredient,
    addBun,
    initialState,
    deleteIngredient
  } from './slice';
  
  describe('редьюсер для бургера', () => {
    describe('проверка работы функций для добавления или удаления ингредиента бургера', () => {
      test('тест обрабатывает начальное состояние', () => {
        expect(burgerReducer(undefined, { type: 'unknown' })).toEqual(
          initialState
        );
      });
  
      test('добавляет ингредиент для конструктора', () => {
        const ingredient = {
          _id: 'ing-1',
          type: 'sauce',
          name: 'Ketchup',
          price: 5,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        };
        const nextState = burgerReducer(initialState, addIngredient(ingredient));
        expect(nextState.constructorItems.ingredients).toHaveLength(1);
        expect(nextState.constructorItems.ingredients[0]._id).toBe('ing-1');
      });
  
      test('добавляет булку для бургера в конструктор', () => {
        const bun = {
          _id: 'bun-1',
          type: 'bun',
          name: 'Brioche',
          price: 10,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        };
        const nextState = burgerReducer(initialState, addBun(bun));
        expect(nextState.constructorItems.bun).toEqual(bun);
      });
  
      test('удаляет ингредиент бургера из конструктора', () => {
        const ingredient = {
          _id: 'ing-1',
          type: 'sauce',
          name: 'Ketchup',
          price: 5,
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          image: '',
          image_large: '',
          image_mobile: ''
        };
        let nextState = burgerReducer(initialState, addIngredient(ingredient));
  
        nextState = burgerReducer(nextState, deleteIngredient(0));
        expect(nextState.constructorItems.ingredients).toHaveLength(0);
      });
    });
  });
  