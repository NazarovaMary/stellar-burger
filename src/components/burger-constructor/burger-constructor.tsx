import { FC, useCallback, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../slices/burger/slice';
import {
  closeOrder,
  getOrderByNumber,
  orderBurger
} from '../../slices/price/activity';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state) => state.burger.constructorItems
  );

  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.orderModalData);
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.burger.orders);

  const handlePlaceOrder = useCallback(
    (ingredientIds: string[]) => {
      dispatch(orderBurger(ingredientIds))
        .unwrap() // убираем блок catch, так как createAsyncThunk сам обрабатывает ошибки
        .then(() => {
          dispatch(resetConstructor());
          dispatch(getOrderByNumber(orders[0]?.number));
        });
    },
    [dispatch, orders]
  );

  const onOrderClick = async () => {
    if (user === null) {
      navigate('/login', { replace: true });
    } else if (constructorItems.bun && constructorItems.ingredients) {
      const ingredientIds = [
        ...constructorItems.ingredients.map((item: TIngredient) => item._id),
        constructorItems.bun._id,
        constructorItems.bun._id
      ];
      handlePlaceOrder(ingredientIds);
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
