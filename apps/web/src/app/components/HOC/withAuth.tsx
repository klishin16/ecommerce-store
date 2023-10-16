import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ERoutes, TOKEN_KEY } from "@/constants";
import { AuthService } from "@/services";
import { authActions } from "@/redux/features/auth.slice";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { Spin } from "antd";
import styled from "styled-components";

const AuthLoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P & { token: string }>) => {
    const AuthenticatedComponent = (props: P) => {
        const dispatch = useAppDispatch();
        const router = useRouter();
        const pathname = usePathname();
        const [token, setToken] = React.useState<string | null>(null);
        const stateToken = useTypedSelector(state => state.auth.token);

        useEffect(() => {
            const getToken = async () => {
                if (stateToken) {
                    return stateToken;
                }

                console.log('No token in store, trying get from localStorage');

                if (typeof window !== 'undefined') {
                    const localStorageToken = localStorage.getItem(TOKEN_KEY);
                    if (localStorageToken) {
                        return AuthService.profile(localStorageToken)
                            .then((profile) => {
                                dispatch(authActions.setToken(localStorageToken))
                                dispatch(authActions.setUser(profile))
                                return localStorageToken;
                            })
                            .catch(() => {
                                router.push(ERoutes.LOGIN + `?continue=${pathname}`);
                                return null;
                            })
                    }

                }

                router.push(ERoutes.LOGIN);
                return null;
            }

            getToken().then(token => setToken(token))
        }, [dispatch]);

        if (!token) {
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
