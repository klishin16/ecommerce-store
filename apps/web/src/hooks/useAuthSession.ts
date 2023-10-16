'use client'
import { useAppDispatch, useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { TOKEN_KEY } from "@/constants";
import { AuthService } from "@/services";
import { authActions } from "@/redux/features/auth.slice";
import { IUser } from "@ecommerce-store/common";

export const useAuthSession = (): { token: string | null, user: IUser | null } => {
    const { user: stateUser, token } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch()

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push(`/auth/login?continue=${pathname}`);
    //     } else {
    //         router.push(`/store/devices`);
    //     }
    // }, [isAuthenticated]);
    useEffect(() => {
        console.log('useAuthSession')
        if (typeof window !== 'undefined') {
            if (!stateUser) {
                const localStorageToken = localStorage.getItem(TOKEN_KEY);
                if (localStorageToken) {
                    AuthService.profile(localStorageToken)
                        .then((profile) => {
                            dispatch(authActions.setToken(localStorageToken))
                            dispatch(authActions.setUser(profile))
                        })
                        .catch(() => {
                            console.log('Unauthorized')
                        })
                }
            }
        }
    }, [dispatch, stateUser]);


    return {
        user: stateUser,
        token: token
    };
}
