'use client'
import React from 'react';
import { Button, Card, Row, Table, Tag } from "antd";
import { usePathname } from "next/navigation";
import { errorHandler, generateTableConfig } from "@/functions";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import { RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import UserCreationDrawer from "@/app/components/users/user-creation-drawer";
import { useAppDispatch, useRequest } from "@/hooks";
import { UsersService } from "@/services";
import { notificationsActions } from "@/redux/features/notifications.slice";
import { EUserRoles, IUpdateUserDto, IUser } from "@ecommerce-store/common";
import Link from "next/link";
import withAuth from "@/app/components/HOC/withAuth";
import { useDrawer } from "@/hooks/useDrawer";


const UsersContainer = styled.div`
    padding: 14px;
    background-color: rgb(255, 255, 255);
`

const AdminUsers: React.FC<{ token: string }> = ({token}) => {
    const dispatch = useAppDispatch();
    const current_path = usePathname();
    const [users, loading, refreshUsers] = useRequest(() =>
        UsersService.fetchAll(token)
            .catch((e) => {
                dispatch(notificationsActions.addNotification({
                    title: 'Users loading error',
                    message: errorHandler(e),
                    type: 'error'
                }))
            })
    )

    const { drawerProps, openDrawer } = useDrawer<IUpdateUserDto>({
        onClose: params => {
            if (params?.refreshItems) {
                refreshUsers();
            }
        }
    });

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ current_path + '/' + id }>{ id }</Link>
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
                    <Button onClick={ () => openDrawer(user) }>
                        Edit
                    </Button>
                )
            },
        },
    ])


    return (
        <>
            <AppBreadcrumbs/>

            <UsersContainer>
                <Card size={ "small" } style={ {marginBottom: 8} }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshUsers() }
                        >Refresh</Button>
                        <Button onClick={ () => openDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Table loading={ loading } columns={ columns } dataSource={ users ?? [] }/>

                <UserCreationDrawer token={ token } { ...drawerProps }/>
            </UsersContainer>
        </>
    );
};

export default withAuth(AdminUsers);
