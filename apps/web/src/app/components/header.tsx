'use client'
import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal } from "antd";
import styled from "styled-components";
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAuthSession, useTypedSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { APP_TITLE, ERoutes } from "@/constants";
import { authActions } from "@/redux/features/auth.slice";
import { EUserRoles, IPurchase } from "@ecommerce-store/common";
import withBasket from "@/app/components/HOC/withBasket";
import { taskActions } from "@/redux/features/task.slice";

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

interface IAppHeaderProps {
  purchases: IPurchase[] | null
}

const AppHeader: React.FC<IAppHeaderProps> = ({purchases}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {user} = useAuthSession();

  const { isModalOpen } = useTypedSelector(state => state.task)

  const showTaksModal = () => {
    dispatch(taskActions.showModal())
  };

  const handleTaskModalOk = () => {
    dispatch(taskActions.hideModal())
  };

  const logout = () => {
    dispatch(authActions.logout())
  }

  const loginButtonClickHandler = () => {
    // @ts-ignore
    window.ym(95089246, 'reachGoal', 'loginButton')
    router.push(ERoutes.LOGIN)
  }

  const registrationButtonClickHandler = () => {
    // @ts-ignore
    window.ym(95089246, 'reachGoal', 'registrationButton')
    router.push(ERoutes.REGISTRATION)
  }

  const basketButtonClickHandler = () => {
    // @ts-ignore
    window.ym(95089246, 'reachGoal', 'basketButton')
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
      { [EUserRoles.ADMIN, EUserRoles.EDITOR].includes(user.role) &&
        <Button type={ "link" } onClick={ () => router.push(ERoutes.ADMIN) } key="6">Admin</Button> }
      <Button type={ "link" } onClick={ () => logout() } key="7">Logout</Button>

    </>
    :
    <>
      <Button type={ "link" }
              icon={ <UserOutlined/> }
              onClick={ loginButtonClickHandler }
              key="5">Login</Button>
      <Button type={ "link" }
              icon={ <UserAddOutlined/> }
              onClick={ registrationButtonClickHandler }
              key="6">Registration</Button>
    </>

  return (
    <HeaderContainer>
      <HeaderLogoContainer>
        <Link href={ ERoutes.INDEX }>
          <Title level={ 3 } style={ {margin: 0} }>
            { APP_TITLE }
          </Title>
        </Link>
      </HeaderLogoContainer>
      <div style={ {display: 'flex'} }>
        <Button type='primary' onClick={ showTaksModal }>Задание</Button>
        { authLinks }
      </div>

      <Modal
        title="Задание"
        open={ isModalOpen }
        closeIcon={false}
        cancelButtonProps={{ hidden: true }}
        footer={[
          <Button key="submit" type="primary" onClick={ handleTaskModalOk }>
            Ок
          </Button>,
        ]}>
        <p>1. Авторизоваться на сайте</p>
        <p>2. Поискать различные товары на сайте</p>
        <p>3. Собрать корзину товаров из шапки, куртки и утепленных ботинок</p>
      </Modal>
    </HeaderContainer>
  );
};

export default withBasket(AppHeader);
