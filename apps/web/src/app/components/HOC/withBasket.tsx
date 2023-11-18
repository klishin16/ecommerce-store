import React, { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import Loader from "@/app/components/loader";
import { basketActions } from "@/redux/features/basket.slice";
import { IPurchase } from "@ecommerce-store/common";


//@ts-ignore
const withBasket = (WrappedComponent: React.ComponentType<{ purchases: IPurchase[] | null }>) => {
  const ComponentWithBasket = () => {
    const dispatch = useAppDispatch();
    const {token, user, isAuthenticated} = useTypedSelector(state => state.auth);
    const {id, isLoading, purchases} = useTypedSelector(state => state.basket);
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
      /** Получение корзины в процессе */
      if (processing) {
        return;
      }

      if (id) {
        return setProcessing(false);
      }
      if (!!token && isAuthenticated && !!user) {
        dispatch(basketActions.loadUserBasket({token, user}))
          .then(() => setProcessing(false))
      }
    }, [isAuthenticated]);

    if (processing || isLoading) {
      return <Loader/>
    }

    return <WrappedComponent purchases={ purchases }/>
  };

  return ComponentWithBasket;
};

export default withBasket;
