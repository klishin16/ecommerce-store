import React, { useEffect, useState } from "react";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import Loader from "@/app/components/loader";
import { basketActions } from "@/redux/features/basket.slice";


const withBasket = <P extends NonNullable<unknown>>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithBasket = (props: P) => {
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

    return <WrappedComponent { ...props } purchases={ purchases }/>
  };

  return ComponentWithBasket;
};

export default withBasket;
