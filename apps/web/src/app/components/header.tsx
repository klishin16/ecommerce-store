'use client'
import React from 'react';
import { Badge, Button } from "antd";
import styled from "styled-components";
import { LoginOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAuthSession, useTypedSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { APP_TITLE, ERoutes } from "@/constants";
import { authActions } from "@/redux/features/auth.slice";
import { useBasket } from "@/hooks/useBasket";
import { EUserRoles } from "@ecommerce-store/common";

const HeaderContainer = styled.div`
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 64px;
    background-clip: border-box;
    background-origin: padding-box;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0 3px 2px 0;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const HeaderLogoContainer = styled.div`
    margin-left: 30px;
    display: flex;
    align-items: center;
`

const AppHeader = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {user} = useAuthSession();
    const {id} = useBasket();
    const {purchases} = useTypedSelector(state => state.basket);

    const logout = () => {
        dispatch(authActions.logout())
    }

    const loginButtonClickHandler = () => {
        // @ts-ignore
        window.ym(95089246,'reachGoal','loginButton')
        router.push(ERoutes.LOGIN)
    }

    const registrationButtonClickHandler = () => {
        // @ts-ignore
        window.ym(95089246,'reachGoal','registrationButton')
        router.push(ERoutes.REGISTRATION)
    }

    const basketButtonClickHandler = () => {
        // @ts-ignore
        window.ym(95089246,'reachGoal','basketButton')
        router.push(ERoutes.BASKET)
    }

    const authLinks = user ?
        <>
            <Button
                type={ "link" }
                onClick={ () => router.push(ERoutes.PROFILE) }
                key="5"
            >
                { user.email }
            </Button>

            <Badge count={ purchases?.length ?? 0 }>
                <Button type={ "link" } onClick={ basketButtonClickHandler } key="6">Basket</Button>
            </Badge>
            { user.role === EUserRoles.ADMIN &&
                <Button type={ "link" } onClick={ () => router.push(ERoutes.ADMIN) } key="6">Admin</Button> }
            <Button type={ "link" } onClick={ () => logout() } key="7">Logout</Button>

        </>
        :
        <>
            <Button type={ "link" } icon={ <LoginOutlined/> } onClick={ loginButtonClickHandler }
                    key="5">Login</Button>
            <Button type={ "link" } onClick={ registrationButtonClickHandler }
                    key="6">Registration</Button>
        </>

    return (
        <HeaderContainer>
            <HeaderLogoContainer>
                <Link href={ ERoutes.DEVICES }>
                    <Title level={ 3 } style={ {margin: 0 }}>
                        { APP_TITLE }
                    </Title>
                </Link>
            </HeaderLogoContainer>
            <div style={ {display: 'flex'} }>
                { authLinks }
            </div>
        </HeaderContainer>
    );
};

export default AppHeader;
