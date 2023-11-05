'use client'
import { useAppDispatch, useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { basketActions } from "@/redux/features/basket.slice";

export const useBasket = () => {
    const { token, user } = useTypedSelector(state => state.auth);
    const { id: basket_id, purchases } = useTypedSelector(state => state.basket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token && user) {
            if (!basket_id) {
                console.log('loadBasket')
                dispatch(basketActions.loadUserBasket({ token, user })).then((v) => {
                    console.log('loadUserBasket result', v)
                });
            }
        } else {
            console.log('Local basket not implemented yet')
        }
        // if (typeof window !== 'undefined') {
        //     if (!stateUser) {
        //         const localStorageToken = localStorage.getItem(TOKEN_KEY);
        //         if (localStorageToken) {
        //             AuthService.profile(localStorageToken)
        //                 .then((profile) => {
        //                     dispatch(authActions.setUser(profile))
        //                 })
        //                 .catch(() => {
        //                     console.log('Unauthorized')
        //                 })
        //         }
        //     }
        // }
    }, [user]);


    return {
        id: basket_id,
        purchases: purchases ?? []
    };
}
