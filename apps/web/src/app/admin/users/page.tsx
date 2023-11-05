'use client'
import React from 'react';
import { Button, Card, Col, Row, Table, Tag } from "antd";
import { usePathname } from "next/navigation";
import { errorHandler, generateTableConfig, transformTablePaginationToPagination } from "@/functions";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import { RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import UserCreationDrawer from "@/app/admin/users/user-creation-drawer";
import { useAppDispatch, useRequest } from "@/hooks";
import { UsersService } from "@/services";
import { addNotification, notificationsActions } from "@/redux/features/notifications.slice";
import { EUserRoles, IUpdateUserDto, IUser } from "@ecommerce-store/common";
import withAuth from "@/app/components/HOC/withAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { useTable } from "@/hooks/useTable";


const UsersPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const UsersContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  height: 100%;
`

const AdminUsers: React.FC<{ token: string }> = ({token}) => {
  const dispatch = useAppDispatch();

  const {drawerProps, openDrawer} = useDrawer<IUpdateUserDto>({
    onClose: params => {
      if (params?.refreshItems) {
        refresh();
      }
    }
  });
  const { tableProps, loading, refresh } = useTable<IUser>((pagination) =>
    UsersService.fetchWithPagination(transformTablePaginationToPagination(pagination))
  )

  const removeUserHandler = (user: IUser) => {
    UsersService.remove(token, user.id)
      .then(() => {
        refresh()
      })
      .catch((e) => {
        dispatch(
          addNotification({
            title: 'User removing error',
            message: errorHandler(e),
            type: 'error'
          })
        );
      })
  }

  const columns = generateTableConfig([
    {
      title: 'id'
    },
    {
      title: 'email'
    },
    {
      title: 'password'
    },
    {
      title: 'role',
      render: (role: EUserRoles) => (
        <Tag color={ role === EUserRoles.USER ? 'green' : role === EUserRoles.EDITOR ? 'blue' : 'red' }>
          { role.toUpperCase() }
        </Tag>
      )
    },
    {
      title: 'operation',
      render: (_: never, user: IUser) => {
        return (
          <Row gutter={ 16 }>
            <Col>
              <Button onClick={ () => openDrawer(user) }>
                Edit
              </Button>
            </Col>
            <Col>
              <Button danger onClick={ () => removeUserHandler(user) }>
                Delete
              </Button>
            </Col>
          </Row>
        )
      },
    },
  ])


  return (
    <UsersPageContainer>
      <AppBreadcrumbs/>

      <UsersContainer>
        <Card size={ "small" } style={ {marginBottom: 8} }>
          <Row justify={ "end" }>
            <Button
              color={ "blue" }
              icon={ <RedoOutlined/> }
              loading={ loading }
              onClick={ () => refresh() }
            >Refresh</Button>
            <Button onClick={ () => openDrawer() } style={ {
              color: AppColors.GREEN,
              borderColor: AppColors.GREEN,
              marginLeft: '.5vw'
            } }>Create</Button>
          </Row>
        </Card>

        <Table
          columns={ columns }
          { ...tableProps }
        />

        <UserCreationDrawer token={ token } { ...drawerProps }/>
      </UsersContainer>
    </UsersPageContainer>
  );
};

export default withAuth(AdminUsers);
