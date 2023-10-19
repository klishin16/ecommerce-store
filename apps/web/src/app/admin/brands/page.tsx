'use client'
import React from 'react';
import { Button, Card, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useAppDispatch, useRequest } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateTableConfig } from "@/functions";
import BrandCreationDrawer from "@/app/components/brands/brand-creation-drawer";
import { AppColors } from "@/constants";
import { BrandsService } from "@/services/brands.service";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import styled from "styled-components";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import withAuth from "@/app/components/HOC/withAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { EUserRoles, IBrand, IUpdateBrandDto } from "@ecommerce-store/common";


const BrandsContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

const AdminBrands: React.FC<{ token: string }> = ({ token }) => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const { drawerProps, openDrawer } = useDrawer<IUpdateBrandDto>({
        onClose: params => {
            if (params?.refreshItems) {
                refreshBrands();
            }
        }
    })


    const [brands, loading, refreshBrands] = useRequest(() =>
        BrandsService.fetchAll()
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Brands loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    )

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ pathname + '/' + id }>{ id }</Link>
        },
        {
            title: 'name'
        },
        {
            title: 'description'
        },
        {
            title: 'operation',
            render: (_: never, brand: IBrand) => {
                return (
                    <Button onClick={ () => openDrawer(brand) }>
                        Edit
                    </Button>
                )
            },
        },
    ])

    return (
        <>
            <AppBreadcrumbs/>

            <BrandsContainer>
                <Card size={ "small" } style={ { marginBottom: 8 } }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshBrands() }
                        >Refresh</Button>
                        <Button onClick={ () => openDrawer } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Table rowKey={ 'id' } loading={ loading } columns={ columns } dataSource={ brands ?? [] }/>

                <BrandCreationDrawer token={token} { ...drawerProps } />
            </BrandsContainer>
        </>
    );
};

export default withAuth(AdminBrands, [EUserRoles.EDITOR, EUserRoles.ADMIN]);
