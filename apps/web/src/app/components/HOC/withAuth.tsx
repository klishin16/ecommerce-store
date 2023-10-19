import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ERoutes, TOKEN_KEY } from "@/constants";
import { AuthService } from "@/services";
import { authActions } from "@/redux/features/auth.slice";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { Spin } from "antd";
import styled from "styled-components";
import { EUserRoles, IUser } from "@ecommerce-store/common";
import { notificationsActions } from "@/redux/features/notifications.slice";

const AuthLoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & { token: string }>, allow_roles?: EUserRoles[]) => {
    const AuthenticatedComponent = (props: P) => {
        const dispatch = useAppDispatch();
        const router = useRouter();
        const pathname = usePathname();
        const token = useTypedSelector(state => state.auth.token);
        const user  = useTypedSelector(state => state.auth.user);

        const [roleAccess, setRoleAccess] = useState<boolean>(false);


        const redirectToLogin = () => {
            return router.push(ERoutes.LOGIN + `?continue=${pathname}`);
        }

        const checkUserRoleAccess = (user: IUser) => {
            if (!allow_roles || (allow_roles.includes(user.role))) {
                setRoleAccess(true);
            } else {
                console.log('No role access')
                dispatch(notificationsActions.addNotification({
                    title: 'Access error',
                    message: 'You have no access to this page',
                    type: 'error'
                }))
                redirectToLogin();
            }
        }

        useEffect(() => {
            console.log('token', token)
            if (token) {
                // Токен есть в стейте
                if (user) {
                    checkUserRoleAccess(user);
                } else {
                    AuthService.profile(token)
                        .then((profile) => {
                            dispatch(authActions.setUser(profile));

                        })
                        .catch(() => {
                            redirectToLogin();
                        })
                }
            } else {
                console.log('No token in store, trying get from localStorage');

                const localStorageToken = localStorage.getItem(TOKEN_KEY);
                if (localStorageToken) {
                    AuthService.profile(localStorageToken)
                        .then((profile) => {
                            dispatch(authActions.setToken(localStorageToken))
                            dispatch(authActions.setUser(profile))
                            checkUserRoleAccess(profile);
                        })
                        .catch(() => {
                            redirectToLogin();
                        })
                } else {
                    redirectToLogin()
                }
            }
        }, [dispatch]);

        if (!token || !roleAccess) {
            return (
                <AuthLoaderContainer className='auth-loader-container'>
                    <Spin/>
                </AuthLoaderContainer>
            )
        }

        return <WrappedComponent { ...props } token={token} />
    };

    return AuthenticatedComponent;
};

export default withAuth;
